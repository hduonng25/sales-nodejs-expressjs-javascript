import express, {request, response} from "express";
import {format, parseISO} from 'date-fns';
import {find, findDate, getBill, getDetails} from "../../../controllers/bill/Offline.Controller.js";
import {check_id_query, check_search} from "../../../validator/Base.js";

const router = express.Router();

router.get("/paid/list", async (request, response, next) => {
    const list = await getBill(6);
    next(list);
});

router.get("/paid/find", check_search, async (request, response, next) => {
    const {search} = request.query;
    const listSeach = await find(6, search);
    next(listSeach);
});

router.get("/paid/find-date", check_search, async (request, response, next) => {
    const date = request.query.search;
    const search = format(parseISO(date), 'yyyy-MM-dd');
    const listSearch = await findDate(6, search);
    next(listSearch);
});

router.get("/paid/details", check_id_query, async (request, response, next) => {
    const {id} = request.query;
    const details = await getDetails(id, 6);
    next(details);
});

export default router;