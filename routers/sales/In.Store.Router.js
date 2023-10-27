import express, {request, response} from "express";
import {
    addDiscount,
    addProductToBill, createBill,
    deletedBillDetails,
    editQuantityBillDetails, pancellation, payment_in_store
} from "../../controllers/sales/In.Store.Controller.js";
import {check_add_product, check_edit_quantity} from "../../validator/Bill.Check.js";
import {check_id_body} from "../../validator/Base.js";

const router = express.Router();

router.post("/in-store/create", async (request, response, next) => {
    const {id} = request.payload;
    const create = await createBill(id);
    next(create);
});
router.post("/in-store/add-product-to-bill", check_add_product, async (request, response, next) => {
    const {bill_id, product_id, color_id, size_id, quantity} = request.body;
    const product = await addProductToBill(bill_id, product_id, color_id, size_id, quantity);
    next(product);
});

router.put("/in-store/edit-quantity", check_edit_quantity, async (request, response, next) => {
    const {bill_id, bill_details_id, quantity} = request.body;
    const update = await editQuantityBillDetails(bill_id, bill_details_id, quantity);
    next(update);
});

router.post("/in-store/add-discount", async (request, response, next) => {
    const {discount_id, order_id} = request.body;
    const add = await addDiscount(discount_id, order_id);
    next(add);
});

router.put("/in-store/deleted", check_id_body, async (request, response, next) => {
    const {bill_details_id} = request.body;
    const deleted = await deletedBillDetails(bill_details_id);
    next(deleted);
});

router.put("/in-store/payment", check_id_body, async (request, response, next) => {
    const {id} = request.body;
    const payment = await payment_in_store(id);
    next(payment);
});

router.put("/in-store/pancellation", check_id_body, async (request, response, next) => {
    const {id} = request.body;
    const pannel = await pancellation(id);
    next(pannel);
});

export default router;