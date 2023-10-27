import user from "../../models/User.js";
import { v1 } from "uuid";
import mail from "../../mail/Mail.Conflig.js";
import RandomPassword from "../ranDom/ranDom.js";
import bcrypt from 'bcrypt';
import cart from "../../models/Cart.js";
import { error, success } from "../../respone/Respone.Util.js";
import { mail_create_user } from "../../mail/options/Mail.Option.js";
import { genToken, refreshToken} from "../../jwt/Token.js";


export async function createUser(name, email, phone, address, role) {
    const password = RandomPassword();
    const passwordEncode = await bcrypt.hash(password, 10);
    const new_user = await user.create({
        id: v1(),
        name: name,
        email: email,
        phone: phone,
        password: passwordEncode,
        address: address,
        role: role,
        is_deleted: false
    });

    await cart.create(
        {
            id: v1(),
            user_id: `${new_user.id}`
        }
    )

    const sendMail = mail_create_user(email, new_user, password);

    await mail.sendMail(sendMail);
    return success(new_user);
};

export async function changePassword(id, password_old, password_new) {
    const users = await user.findOne({ id: id });
    const check = await bcrypt.compareSync(password_old, users.password);
    if (check) {
        const passwordEncode = await bcrypt.hash(password_new, 10);
        await user.updateOne({ id: id }, { $set: { password: passwordEncode } });

        const mailOptions = {
            from: 'honngduong25@gmail.com',
            to: users.email,
            subject: 'Chào mừng',
            text: 'Bạn đã đổi mật khẩu!',
            html: `<b>Xin chào ${users.name}</b><br>
               <b>Bạn vừa đổi mật khẩu thành công</b><br>
               <b>Mật khẩu mới: ${password_new}</b><br>`,
        };

        await mail.sendMail(mailOptions);
        return success("done");
    } else {
        return error("password not found");
    }
};

export async function updateUser(id_user, name, address, role) {
    await user.findOneAndUpdate({ id: id_user }, { $set: { name: name, address: address, role: role } });
    return { statusCode: OK, data: "update done" };
};

export async function deleted(id_user) {
    await user.findOneAndUpdate({ id: id_user }, { $set: { is_deleted: true } })
    return { statusCode: OK, data: "deleted done" };
};

export async function infor(id) {
    const users = await user.findOne({ id: id });
    if (!users) {
        return error("user not found", "user not found");
    } else {
        return success(users);
    }
};

export async function login(email, password) {
    const users = await user.findOne({ email: email });
    if (!users) {
        return error("wrong email", "wrong email");
    } else {
        try {
            const checkPass = bcrypt.compareSync(password, users.password);
            if (!checkPass) {
                return error("wrong password", "wrong password");
            } else {
                const name = users.name;
                const id = users.id;
                const role = users.role
                const payload = { email, name, id, role };
                const accessToken = genToken(payload);
                const refresh = refreshToken(email, name, id);
                const data = {
                    accessToken, refresh
                }
                return success(data);
            }
        } catch (e) {
            console.log(e)
            return error("login faild" + e, "login faild")
        }
    }
};