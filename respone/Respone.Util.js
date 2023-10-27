import {BAD_REQUEST, CREATED, OK, SYSTEM_ERROR} from "../constant/HttpResponeCode.js";

export function success(data) {
    return {statusCode: OK, data: data};
};

export function badRequet() {
    return {statusCode: BAD_REQUEST, data: `bad requet`};
};

export function error(data, description) {
    return {statusCode: SYSTEM_ERROR, data: data, description: description};
}

export function created() {
    return {statusCode: CREATED, data: `bad requet`};
}