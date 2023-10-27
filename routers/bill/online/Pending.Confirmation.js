import express, {request, response} from "express";
import {find, findDateBill, getBill, getDetails, updateStatus} from "../../../controllers/bill/Online.Controller.js";
import {format, parseISO} from "date-fns";
import {check_id_query, check_id_body, check_search} from "../../../validator/Base.js";

const router = express.Router();

router.get("/list", async (req, res, next) => {
    const list = await getBill(1);
    next(list);
});

router.put("/confirm", check_id_body, async (req, res, next) => {
    const {id} = req.body;
    await updateStatus(id, 2, "Chuyển trạng thái sang chờ giao hàng");
    const list = await getBill(1);
    next(list);
});

router.put("/cancel", check_id_body, async (req, res, next) => {
    const {id} = req.body;
    await updateStatus(id, 5, "Chuyển trạng thu đơn hàng sang đã hủy");
    const list = await getBill(1);
    next(list);
});

router.put("/confirm-all", async (req, res, next) => {
    const list = (await getBill(1)).data;

    for (const bill of list) {
        const id = bill.id;
        await updateStatus(id, 2, "Chuyển trạng thái sang chờ giao hàng");
    }

    const listReturn = await getBill(1);
    next(listReturn);
});

router.put("/cancel-all", async (req, res, next) => {
    const list = (await getBill(1)).data
    for (const bill of list) {
        const id = bill.id;
        await updateStatus(id, 5, "Chuyển trạng thái sang chờ đã huy");
    }
    ;const listReturn = await getBill(1);
    next(listReturn);
});

router.put("/confirm-selected", check_id_body, async (req, res, next) => {
    const idSelected = req.body.id;
    for (const id of idSelected) {
        await updateStatus(id, 2, "Chuyển trạng thái sang chờ giao hàng");
    }
    const listReturn = await getBill(1);
    next(listReturn);
});

router.put("/cannel-selected", check_id_body, async (req, res, next) => {
    const idSelected = req.body.id;
    for (const id of idSelected) {
        await updateStatus(id, 5, "Chuyển trạng thái sang đã hủy");
    }
    const listReturn = await getBill(1);
    next(listReturn);
});

router.get("/find", check_search, async (req, res, next) => {
    const search = req.query.search;
    const listFind = await find(1, search);
    next(listFind);
});

router.get("/find/date", check_search, async (req, res, next) => {
    const date = req.query.search;
    const search = format(parseISO(date), "yyyy-MM-dd");
    const listFind = await findDateBill(1, search);
    next(listFind);
});

router.get("/details", check_id_query, async (request, response, next) => {
    const {id} = request.query;
    const details = await getDetails(id, 1);
    next(details);
});

export default router;