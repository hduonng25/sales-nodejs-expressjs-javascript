import {checkToLong, dataNull} from "./ValidateUltil.js";

export function discountCheck(request, response, next) {
    const {maxValue, percent, name, start_Date, end_Date} = request.body;
    const check_max_value = dataNull(maxValue, "max value");
    if (check_max_value) return next(check_max_value);

    const check_percent = dataNull(percent, "percent");
    if (check_percent) return next(check_percent);

    const check_name = dataNull(name, "name");
    if (check_name) return next(check_name);

    const check_percent_malformed = checkToLong(percent, "percent", 100, 0);
    if (check_percent_malformed) return next(check_percent_malformed);

    return next();
};