import {dataNull} from "./ValidateUltil.js";

export function check_id_body(request, response, next) {
    const {id} = request.body;
    const checkId = dataNull(id, "id");
    if (checkId) return next(checkId);
    return next();
};

export function check_id_query(request, response, next) {
    const {id} = request.query;
    const checkId = dataNull(id, "id");
    if (checkId) return next(checkId);
    return next();
};

export function check_search(request, response, next) {
    const {search} = request.query;
    const check = dataNull(search, "search");
    if (check) return next(check);
    return next();
};