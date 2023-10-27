import express from "express";
import {
    createDiscount,
    deleted,
    find,
    findDate,
    getAll,
    getUpdate,
    saveUpdate
} from "../../controllers/discount/Discount.Controller.js";
import {format, parseISO} from "date-fns";
import {check_id_body, check_id_query, check_search} from "../../validator/Base.js";
import {discountCheck} from "../../validator/Discount.Check.js";

const router = express.Router();

router.get("/list", async (request, response, next) => {
    const list = await getAll();
    next(list);
});

router.post("/create", discountCheck, async (request, response, next) => {
    const {maxValue, percent, name, start_Date, end_Date} = request.body;
    const startDate = format(parseISO(start_Date), 'yyyy-MM-dd')
    const endDate = format(parseISO(end_Date), 'yyyy-MM-dd')
    const resuilt = await createDiscount(maxValue, percent, startDate, endDate, name);
    next(resuilt);
});

router.get("/get-update", check_id_query, async (request, response, next) => {
    const {id} = request.query;
    const discount = await getUpdate(id);
    next(discount);
});

router.put("/save-update", discountCheck, async (request, response, next) => {
    const {id, maxValue, percent, name, start_Date, end_Date} = request.body;
    const startDate = format(parseISO(start_Date), 'yyyy-MM-dd')
    const endDate = format(parseISO(end_Date), 'yyyy-MM-dd')
    const resuilt = await saveUpdate(id, maxValue, percent, startDate, endDate, name);
    next(resuilt);
});

router.put("/deleted", check_id_body, async (request, response, next) => {
    const {id} = request.body;
    await deleted(id);
    const list = getAll();
    next(list);
});

router.get("/find", check_search, async (request, response, next) => {
    const {search} = request.query;
    const listSearch = await find(search);
    next(listSearch);
});

router.get("/find-date", check_search, async (request, response, next) => {
    let {search} = request.query;
    const searchDate = format(parseISO(search), "yyyy-MM-dd");
    const listSearch = await findDate(searchDate);
    next(listSearch);
});

export default router;