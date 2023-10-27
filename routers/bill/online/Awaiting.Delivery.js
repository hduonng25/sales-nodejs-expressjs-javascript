import express, {request, response} from "express";
import {find, findDateBill, getBill, getDetails, updateStatus} from "../../../controllers/bill/Online.Controller.js";
import {format, parseISO} from "date-fns";
import {check_id_body, check_id_query, check_search} from "../../../validator/Base.js";

const router = express.Router();

router.get("/list", async (request, response, next) => {
    const list = await getBill(2);
    next(list);
});

router.put("/confirm", check_id_body, async (request, response, next) => {
    const {id} = request.body;
    await updateStatus(id, 3, "Chuyển trạng thái sang đang giao hàng");
    const list = await getBill(2);
    next(list);
});

router.put("/confirm-all", async (request, response, next) => {
    const list = (await getBill(2)).data
    for (const bill of list) {
        const id = bill.id;
        await updateStatus(id, 3, "Chuyển trạng thái sang đang giao hàng");
    }

    const listReturn = await getBill(2);
    next(listReturn)
});

router.put("/confirm-selected", check_id_body, async (request, response, next) => {
    const idSelected = request.body.id;
    for (const id of idSelected) {
        await updateStatus(id, 3, "Chuyển trạng thái sang đang giao hàng");
    }
    const list = await getBill(2);
    next(list);
});

router.get("/find", check_search, async (request, response, next) => {
    const search = request.query.search;
    const listSearch = await find(2, search);
    next(listSearch);
});

router.get("/find-date", check_search, async (request, response, next) => {
    const date = request.query.search;
    const search = format(parseISO(date), 'yyyy-MM-dd');
    const listSearch = await findDateBill(2, search);
    next(listSearch);
});

router.get("/details", check_id_query, async (request, response, next) => {
    const {id} = request.query;
    const details = await getDetails(id, 2);
    next(details);
});

export default router;