import express from "express";
import {
  createColor,
  deleteColor,
  getColor,
  updateColor,
} from "../../controllers/product/Color.Controller.js";
import { check_id_body } from "../../validator/Base.js";
import { check_color } from "../../validator/Product.Check.js";

const router = express.Router();

router.get("/color/list", async (request, response, next) => {
  const list = await getColor();
  next(list);
});

router.post("/color/create", check_color, async (request, response, next) => {
  const { name, code } = request.body;
  const created = await createColor(name, code);
  next(created);
});

router.put("/color/update", check_color, async (request, response, next) => {
  const { id, name, code } = request.body;
  const update = await updateColor(id, name, code);
  next(update);
});

router.put("/color/deleted", check_id_body, async (request, response, next) => {
  const { id } = request.body;
  const deleted = await deleteColor(id);
  next(deleted);
});

export default router;
