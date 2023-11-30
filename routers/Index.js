import express from "express";
import pendingAPI from "./bill/online/Pending.Confirmation.js";
import waitingAPI from "./bill/online/Awaiting.Delivery.js";
import cancelledAPI from "./bill/online/Cancelled.js";
import deliveredAPI from "./bill/online/Delivered.js";
import transitAPI from "./bill/online/In.transit.js";
import authenAPI from "./user/Authentication.Router.js";
import cartAPI from "./cart/Cart.Router.js";
import { checkToken } from "../jwt/Token.js";
import userAPI from "./user/User.Router.js";
import designsAPI from "./product/Designs.Router.js";
import metarialAPI from "./product/Metarial.Router.js";
import sizeAPI from "./product/Size.Router.js";
import colorAPI from "./product/Color.Router.js";
import productAPI from "./product/Product.Router.js";
import inStoreAPI from "./sales/In.Store.Router.js";
import salesOnlineAPI from "./sales/Sales.Online.Router.js";
import vnpayAPI from "./vnpay/Vnpay.Router.js";
import discountAPI from "./discount/Discount.js";

const router = express.Router();

router.use("/api/bill/pending", checkToken, pendingAPI);
router.use("/api/bill/awaiting", waitingAPI);
router.use("/api/bill/cancelled", cancelledAPI);
router.use("/api/bill/delicered", deliveredAPI);
router.use("/api/bill/transit", transitAPI);
router.use("/api/cart", checkToken, cartAPI);
router.use("/api/authencation", authenAPI);
router.use("/api/user", userAPI);
router.use(
  "/api/product",
  designsAPI,
  metarialAPI,
  sizeAPI,
  colorAPI,
  productAPI
);
router.use("/api/sales", checkToken, inStoreAPI, salesOnlineAPI, vnpayAPI);
router.use("/api/discount", discountAPI);

export default router;
