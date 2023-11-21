import express from "express";
import {
  changePassword,
  login,
} from "../../controllers/user/User.Controller.js";
import { checkToken } from "../../jwt/Token.js";

const router = express.Router();

router.post("/login", async (request, response, next) => {
  const { email, password } = request.body;
  const signIn = await login(email, password);
  next(signIn);
});

router.put("/changePass", checkToken, async (request, response, next) => {
  const { password_old, password_new } = request.body;
  const { id } = request.payload;
  const change = await changePassword(id, password_old, password_new);
  next(change);
});

export default router;
