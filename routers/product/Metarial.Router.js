import express from "express";
import {
    createMetarial,
    deleteMetarial,
    getMetarial,
    updateMetarial
} from "../../controllers/product/Metarial.Controller.js";
import {check_name} from "../../validator/Product.Check.js";

const router = express.Router();

router.get("/metarial/list", async (request, response, next) => {
    const list = await getMetarial();
    next(list);
});

router.post("/metarial/create", check_name, async (request, response, next) => {
    const {name} = request.body;
    const create = await createMetarial(name);
    next(create);
});

router.put("/metarial/update", check_name, async (request, response, next) => {
    const {id, name} = request.body;
    const upate = await updateMetarial(id, name);
    next(upate);
});

router.put("/metarial/deleted", async (request, response, next) => {
    const {id} = request.body;
    const deleted = await deleteMetarial(id);
    next(deleted);
});

export default router;