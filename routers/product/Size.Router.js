import express from "express";
import {createSize, deleteSize, getSize, updateSize} from "../../controllers/product/Size.Controller.js";
import {check_name} from "../../validator/Product.Check.js";

const router = express.Router();

router.get("/size/list", async (request, response, next) => {
    const list = await getSize();
    next(list);
});

router.post("/size/create", check_name, async (request, response, next) => {
    const {name} = request.body;
    const create = await createSize(name);
    next(create);
});

router.put("/size/update", check_name, async (request, response, next) => {
    const {id, name} = request.body;
    const update = await updateSize(id, name);
    next(update);
});

router.put("/size/deleted", async (request, response, next) => {
    const {id} = request.body;
    const deleted = await deleteSize(id);
    next(deleted);
});

export default router;