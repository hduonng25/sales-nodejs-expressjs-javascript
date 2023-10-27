import {dataNull} from "./ValidateUltil.js";

export function cartCheck(request, response, next) {
    const {id_cart, id_color, id_size, id_product, quantity} = request.body;
    const check_id = dataNull(id_cart, "id");
    if (check_id) return next(check_id);

    const check_color = dataNull(id_color, "color");
    if (check_color) return next(check_color);

    const check_size = dataNull(id_size, "size");
    if (check_size) return next(check_size);

    const check_product = dataNull(id_product, "product");
    if (check_product) return next(check_product);

    const check_quantity = dataNull(quantity, "quantity");
    if (check_quantity) return next(check_quantity);

    return next();
};

export function checkUpdate(request, response, next) {
    const {id_cart, id_cart_details, quantity} = request.body;
    const check_id = dataNull(id_cart, "id");
    if (check_id) return next(check_id);

    const check_details = dataNull(id_cart_details, "cart details");
    if (check_details) return next(check_details);

    const check_quantity = dataNull(quantity, "quantity");
    if (check_quantity) return next(check_quantity);

    return next();
};