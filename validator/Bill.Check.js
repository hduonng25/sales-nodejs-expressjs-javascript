import {dataNull} from "./ValidateUltil.js";

//in store
export function check_add_product(request, response, next) {
    const {bill_id, product_id, color_id, size_id, quantity} = request.body;
    const check_bill = dataNull(bill_id, "bill");
    if (check_bill) return next(check_bill);

    const check_product = dataNull(product_id, "product");
    if (check_product) return next(check_product);

    const check_color = dataNull(color_id, "color");
    if (check_color) return next(check_color);

    const check_size = dataNull(size_id, "size");
    if (check_size) return next(check_size);

    const check_quantity = dataNull(quantity, "quantity");
    if (check_quantity) return next(check_quantity);

    return next();
};

export function check_edit_quantity(request, response, next) {
    const {bill_id, bill_details_id, quantity} = request.body;
    const check_bill = dataNull(bill_id, "bill");
    if (check_bill) return next(check_bill);

    const check_details = dataNull(bill_details_id, "bill details");
    if (check_details) return next(check_details);

    const check_quantity = dataNull(quantity, "quantity");
    if (check_quantity) return next(check_quantity);

    return next();
};

