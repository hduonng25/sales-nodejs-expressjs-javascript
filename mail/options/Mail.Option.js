import ejs from 'ejs';
import product from "../../models/Product.js";

export function mail_create_user(email, user, password) {
    const mail = {
        from: 'honngduong25@gmail.com',
        to: email,
        subject: 'Chào mừng',
        text: 'Chào mừng bạn đã đăng ký tài khoản!',
        html: `<b>Xin chào ${user.name}</b><br> 
               <b>Bạn vừa tạo tài khoản thành công</b><br>
               <b>Tài khoản: ${user.email}</b><br>
               <b>Mật khẩu: ${password}</b><br>`,
    };
    return mail;
}

export async function mail_update_bill(bill, action) {
    const bill_details = bill.bill_details;
    const details_bill = await Promise.all(bill_details.map(async (details) => {
        const product_details_id = details.product_details_id;
        const products = await product.findOne({"product_details.id": product_details_id});
        const product_details = products.product_details.find((details) => details.id === product_details_id);
        return {
            size: product_details.size.name,
            color: product_details.color.name,
            quantity_product: details.quantity,
            total: details.money_bill_details,
            product_name: products.name
        }
    }));

    const mail = {
        from: 'honngduong25@gmail.com',
        to: bill.email_receiver,
        subject: "Thông báo trạng thái đơn hàng"
    };

    const content = {
        subject: mail.subject,
        id: bill.id,
        nguoiNhan: bill.receiver,
        ngayDat: bill.create_date,
        soDienThoai: bill.phone_receiver,
        email: bill.email_receiver,
        trangThai: action,
        tongGiaTriDonhang: bill.bill_money,
        giamGia: bill.reduced_money,
        phiVanChuyen: bill.ship_money,
        details: details_bill,
        fomat: formatCurrency
    };

    const mail_view = await ejs.renderFile('mail/view/Mail.ejs', content);

    mail.html = mail_view;

    return mail;
};

function formatCurrency(number) {
    return number.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});
}

