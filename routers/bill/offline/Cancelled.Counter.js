import express, {request, response} from "express";
import {find, findDate, getBill, getDetails} from "../../../controllers/bill/Offline.Controller.js";
import {format, parseISO} from "date-fns";
import {check_id_query, check_search} from "../../../validator/Base.js";

const router = express.Router();

router.get("/cancel-counter/list", async (request, response, next) => {
    const list = await getBill(8);
    next(list);
});

router.get("/cancel-counter/find", check_search, async (request, response, next) => {
    const search = request.query.search;
    const listSearch = await find(8, search);
    next(listSearch);
});

router.get("/cancel-counter/find-date", check_search, async (request, response, next) => {
    const date = request.query.search;
    const search = format(parseISO(date), 'yyyy-MM-dd');
    const listSearch = await findDate(8, search);
    next(listSearch);
});

router.get("/cancel-counter/details", check_id_query, async (request, response, next) => {
    const {id} = request.query;
    const details = await getDetails(id, 8);
    next(details);
});

export default router;