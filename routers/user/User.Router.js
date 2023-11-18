import express from "express";
import {
  changePassword,
  createUser,
  deleted,
  infor,
  login,
  updateUser,
} from "../../controllers/user/User.Controller.js";
import { checkCreate, checkDuplicate } from "../../validator/User.Check.js";

const router = express.Router();

router.post(
  "/create",
  checkCreate,
  checkDuplicate,
  async (request, response, next) => {
    const { name, email, phone, address, role } = request.body;
    const create = await createUser(name, email, phone, address, role);
    next(create);
  }
);

router.put("/update", async (request, response, next) => {
  const { id_user, name, address, role } = request.body;
  const update = await updateUser(id_user, name, address, role);
  next(update);
});

router.put("/deleted", async (request, response, next) => {
  const { id_user } = request.body;
  const del = await deleted(id_user);
  next(del);
});

router.get("/infor", async (request, response, next) => {
  let { id } = request.payload;
  const infors = await infor(id);
  next(infors);
});

export default router;
