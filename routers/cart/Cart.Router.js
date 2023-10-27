import express from "express";
import {
    addToCart,
    deletedCartDetails,
    getListCartDetails,
    updateQuantity
} from "../../controllers/cart/Cart.Controller.js";
import {cartCheck, checkUpdate} from "../../validator/Cart.Check.js";
import {check_id_body, check_id_query} from "../../validator/Base.js";

const router = express.Router();

router.get("/list-cart-details", check_id_query, async (request, response, next) => {
    const {id} = request.query
    const list = await getListCartDetails(id);
    next(list);
});

router.post("/add-to-cart", cartCheck, async (request, response, next) => {
    const {id_cart, id_color, id_size, id_product, quantity} = request.body;
    const addToCarts = await addToCart(id_cart, id_color, id_size, id_product, quantity);
    next(addToCarts);
});

router.put("/update-quantity", checkUpdate, async (request, response, next) => {
    const {id_cart, id_cart_details, quantity} = request.body
    const update = await updateQuantity(id_cart, id_cart_details, quantity);
    next(update);
});

router.put("/deleted", check_id_body, async (request, response, next) => {
    const id_cart_details = request.body.id;
    const deleted = await deletedCartDetails(id_cart_details);
    next(deleted);
});

export default router;
