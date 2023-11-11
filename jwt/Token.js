import jsonwebtoken from 'jsonwebtoken';
import {privateKEY, publicKEY} from "./ConfligKey.js";
import {error} from "../respone/Respone.Util.js";

export function checkToken(request, response, next) {
    const {token} = request.headers;
    if (!token) {
        return error("not_found_token", "not found token");
    }
    let verifyOptions = {
        algorithm: "RS256"
    }

    try {
        let payload = jsonwebtoken.verify(token, publicKEY, verifyOptions);
        request.payload = payload;
        const {email, name, id, role, type} = payload;
        if (type !== "access_token") {
            return next(error("wrong_token", "wrong token"));
        } else {
            return next();
        }
    } catch (e) {
        return next(error("token_đã_hết_hạn", "token đã hết hạn"));
    }
}

export function genToken(payload) {
    const signOption = {
        expiresIn: "2h",
        algorithm: "RS256"
    };

    payload = {...payload, type: "access_token"};
    let accessToken = jsonwebtoken.sign(payload, privateKEY, signOption);
    return accessToken;
};

export function refreshToken(email, name, id) {
    const signOption = {
        expiresIn: "24h",
        algorithm: "RS256"
    };

    let payload = {email, type: "access_token", name, id};
    let refreshToken = jsonwebtoken.sign(payload, privateKEY, signOption);
    return refreshToken;
}