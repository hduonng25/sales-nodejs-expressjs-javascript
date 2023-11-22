import express from "express";
import conflig from "../../conflig/Vnpay.Conflig.js";
import moment from "moment";
import querystring from "qs";
import crypto from "crypto";
import { saveOrderPayment } from "../../controllers/sales/Sales.Online.Controller.js";

const router = express.Router();

router.post("/online/payment", async (req, res, next) => {
    const {
        amountOder,
        orderID,
        moneyShip,
        note,
        receiver,
        phone_receiver,
        address,
        email_receiver,
    } = req.body;
    let date = new Date();
    let createDate = moment(date).format("YYYYMMDDHHmmss");

    let tmnCode = conflig.vnp_TmnCode;
    let secretKey = conflig.vnp_HashSecret;
    let vnpUrl = conflig.vnp_Url;
    let returnUrl = conflig.vnp_ReturnUrl;
    let amount = amountOder * 100;
    let TxnRef = getRandomNumber(8);
    console.log(amount);

    let locale = "vn";
    if (locale === null || locale === "") {
        locale = "vn";
    }
    let currCode = "VND";
    let vnp_Params = {};
    vnp_Params["vnp_Version"] = "2.1.0";
    vnp_Params["vnp_Command"] = "pay";
    vnp_Params["vnp_TmnCode"] = tmnCode;
    vnp_Params["vnp_Locale"] = locale;
    vnp_Params["vnp_CurrCode"] = currCode;
    vnp_Params["vnp_TxnRef"] = TxnRef;
    vnp_Params["vnp_OrderInfo"] = orderID;
    vnp_Params["vnp_OrderType"] = "order-type";
    vnp_Params["vnp_Amount"] = amount;
    vnp_Params["vnp_ReturnUrl"] = returnUrl;
    vnp_Params["vnp_IpAddr"] = "127.0.0.1";
    vnp_Params["vnp_CreateDate"] = createDate;

    vnp_Params = sortObject(vnp_Params);

    let signData = querystring.stringify(vnp_Params, { encode: false });
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
    vnp_Params["vnp_SecureHash"] = signed;
    vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });

    await saveOrderPayment(
        amountOder,
        orderID,
        moneyShip,
        note,
        receiver,
        phone_receiver,
        address,
        email_receiver
    );
    res.redirect(vnpUrl);
});

router.get("/vnpay_return", function (req, res, next) {
    let vnp_Params = req.query;

    let secureHash = vnp_Params["vnp_SecureHash"];

    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];

    vnp_Params = sortObject(vnp_Params);

    let tmnCode = confligVnpay.vnp_TmnCode;
    let secretKey = confligVnpay.vnp_HashSecret;

    let signData = querystring.stringify(vnp_Params, { encode: false });
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");

    if (secureHash === signed) {
        res.render("success", { code: vnp_Params["vnp_ResponseCode"] });
    } else {
        res.render("success", { code: "97" });
    }
});

function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(
            /%20/g,
            "+"
        );
    }
    return sorted;
}

function getRandomNumber(len) {
    const chars = "0123456789";
    let result = "";
    for (let i = 0; i < len; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

export default router;
