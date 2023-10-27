import {dataNull} from "./ValidateUltil.js";

//Size, metarial, designs
export function check_name(request, response, next) {
    const {name} = request.body;

    const check_name = dataNull(name, "name");
    if (check_name) return next(check_name);

    return next();
};

//Color
export function check_color(request, response, next) {
    const {name, code} = request.body;

    const check_name = dataNull(name, "name");
    if (check_name) return next(check_name);

    const check_code = dataNull(code, "code");
    if (check_code) return next(check_code);

    return next();
};

