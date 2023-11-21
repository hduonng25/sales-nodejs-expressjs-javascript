import express, { request, response } from "express";
import fomat, { format, parseISO } from "date-fns";
import {
  find,
  findDateBill,
  getBill,
  getDetails,
  updateStatus,
} from "../../../controllers/bill/Online.Controller.js";
import {
  check_id_body,
  check_id_query,
  check_search,
} from "../../../validator/Base.js";

const router = express.Router();

router.get("/list", async (request, response, next) => {
  const list = await getBill(3);
  next(list);
});

router.put("/confirm", check_id_body, async (request, response, next) => {
  const { id } = request.body;
  await updateStatus(id, 4, "Chuyển trạng thái sang đã giao hàng");
  const list = await getBill(3);
  next(list);
});

router.put("/confirm-all", async (request, response, next) => {
  const list = (await getBill(3)).data;
  for (const bill of list) {
    const id = bill.id;
    await updateStatus(id, 4, "Chuyển trạng thái sang đã giao hàng");
  }

  const listReturn = await getBill(3);
  next(listReturn);
});

router.put(
  "/confirm-selected",
  check_id_body,
  async (request, response, next) => {
    const idSelected = request.body.id;
    for (const id of idSelected) {
      await updateStatus(id, 4, "Chuyển trạng thái sang đã giao hàng");
    }
    const list = await getBill(3);
    next(list);
  }
);

router.get("/find", check_search, async (request, response, next) => {
  const search = request.query.search;
  const listSearch = await find(3, search);
  next(listSearch);
});

router.get("/find-date", check_search, async (request, response, next) => {
  const date = request.query.search;
  const search = format(parseISO(date), "yyyy-MM-dd");
  const listSearch = await findDateBill(3, search);
  next(listSearch);
});

router.get("/details", check_id_query, async (request, response, next) => {
  const { id } = request.query;
  const details = await getDetails(id, 3);
  next(details);
});

export default router;
