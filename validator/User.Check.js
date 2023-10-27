import {dataNull, duplicate} from "./ValidateUltil.js";
import user from "../models/User.js";
import bcrypt from 'bcrypt';

export function checkCreate(request, response, next) {
    const {name, email, phone, address, role} = request.body;
    let nameCheck = dataNull(name, "name");
    if (nameCheck) return next(nameCheck);

    let emailCheck = dataNull(email, "email");
    if (emailCheck) return next(emailCheck);

    let phoneCheck = dataNull(phone, "phone");
    if (phoneCheck) return next(phoneCheck);

    let addressCheck = dataNull(address, "address");
    if (addressCheck) return next(addressCheck);

    let roleCheck = dataNull(role, "role");
    if (roleCheck) return next(roleCheck);

    return next();
};

export async function checkDuplicate(request, response, next) {
    const {email, phone} = request.body;
    let userCheck;
    userCheck = await user.findOne({"email": email});
    let checkEmail = duplicate(userCheck, "email");
    if (checkEmail) return next(checkEmail);

    userCheck = await user.findOne({"phone": phone});
    let checkPhone = duplicate(userCheck, "phone");
    if (checkPhone) return next(checkPhone);

    return next();
};


