import express from "express";
import {addDiscountToBill, check_out, saveOrderShipCOD} from "../../controllers/sales/Sales.Online.Controller.js";

const router = express.Router();

router.post("/online/check-out", async (request, response, next) => {
    const {cart_details_id, total} = request.body;
    const {id} = request.payload;
    const checkOut = await check_out(id, cart_details_id, total);
    next(checkOut);
});

router.post("/online/add-discount", async (request, response, next) => {
    const {discount_id, order_id} = request.body;
    const add = await addDiscountToBill(discount_id, order_id);
    next(add);
});

router.post("/online/save-order-cod", async (request, response, next) => {
    const {amountOder, orderID, moneyShip, note, receiver, phone_receiver, address, email_receiver} = request.body;
    const save = await saveOrderShipCOD(amountOder, orderID, moneyShip, note, receiver, phone_receiver, address, email_receiver);
    next(save);
});


export default router;