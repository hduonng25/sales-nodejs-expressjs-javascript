import express from "express";
import {
    createDesigns,
    deletedDesigns,
    getDesigns,
    updateDesigns
} from "../../controllers/product/Designs.Controller.js";
import {check_id_body} from "../../validator/Base.js";
import {check_name} from "../../validator/Product.Check.js";

const router = express.Router();

router.get("/designs/list", async (request, response, next) => {
    const list = await getDesigns();
    next(list);
});

router.post("/designs/create", check_name, async (request, response, next) => {
    const {name} = request.body;
    const create = await createDesigns(name);
    next(create);
});

router.put("/designs/update", check_name, async (request, response, next) => {
    const {id, name} = request.body;
    const update = await updateDesigns(id, name);
    next(update);
});

router.put("/designs/deleted", check_id_body, async (request, response, next) => {
    const {id} = request.body;
    const deleted = await deletedDesigns(id);
    next(deleted);
});

export default router;