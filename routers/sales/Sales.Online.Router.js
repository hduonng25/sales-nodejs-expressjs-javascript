import express from "express";
import {addDiscountToBill, check_out} from "../../controllers/sales/Sales.Online.Controller.js";

const router = express.Router();

router.post("/online/check-out", async (request, response, next) => {
    const {cart_details_id, total} = request.body;
    const checkOut = await check_out(cart_details_id, total);
    next(checkOut);
});

router.post("/online/add-discount", async (request, response, next) => {
    const {discount_id, order_id} = request.body;
    const add = await addDiscountToBill(discount_id, order_id);
    next(add);
});



export default router;