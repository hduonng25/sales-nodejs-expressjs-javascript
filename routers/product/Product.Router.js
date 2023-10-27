import express, {request, response} from "express";
import {
    createProduct,
    deletedProduct, getDetails,
    getProducts, saveImage,
    updateProduct, updateProductDetails
} from "../../controllers/product/Product.Controller.js";

const router = express.Router();

router.get("/list", async (request, response, next) => {
    const list = await getProducts();
    next(list);
});

router.post("/create", async (request, response, next) => {
    const {price, name, note, quantity, color_id, size_id, metarial_id, designs_id, image} = request.body
    const create = await createProduct(price, name, note, quantity, color_id, size_id, metarial_id, designs_id, image);
    next(create);
});

router.put("/update", async (request, response, next) => {
    const {id, price, name, note} = request.body;
    const update = await updateProduct(id, price, name, note);
    next(update);
});

router.put("/deleted", async (request, response, next) => {
    const {id} = request.body;
    const deleted = await deletedProduct(id);
    next(deleted);
});

router.get("/details", async (request, response, next) => {
    const {product_id} = request.query;
    const details = await getDetails(product_id);
    next(details);
});

router.put("/details/update", async (request, response, next) => {
    const {product_id, product_details_id, quantity, status, is_deleted} = request.body;
    const details = await updateProductDetails(product_id, product_details_id, quantity, status, is_deleted);
    next(details);
});

router.put("/saveImage", async (request, response, next) => {
    const {product_id, product_details_id, image} = request.body;
    const details = await saveImage(product_id, product_details_id, image);
    next(details);
});

export default router;