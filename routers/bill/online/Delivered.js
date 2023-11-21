import express, { request, response } from "express";
import { format, parseISO } from "date-fns";
import {
  find,
  findDateBill,
  getBill,
  getDetails,
} from "../../../controllers/bill/Online.Controller.js";
import { check_id_query, check_search } from "../../../validator/Base.js";

const router = express.Router();

router.get("/list", async (request, response, next) => {
  const list = await getBill(4);
  next(list);
});

router.get("/find", check_search, async (request, response, next) => {
  const search = request.query.search;
  const listSearch = await find(4, search);
  next(listSearch);
});

router.get("/find-date", check_search, async (request, response, next) => {
  const date = request.query.search;
  const search = format(parseISO(date), "yyyy-MM-dd");
  const listSearch = await findDateBill(4, search);
  next(listSearch);
});

router.get("/details", check_id_query, async (request, response, next) => {
  const { id } = request.query;
  const details = await getDetails(id, 4);
  next(details);
});

export default router;
