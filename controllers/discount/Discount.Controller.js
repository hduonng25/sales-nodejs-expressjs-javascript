import {v1} from "uuid";
import discount from "../../models/Discount.js";
import {success} from "../../respone/Respone.Util.js";

export async function getAll() {
    const listDiscount = await discount.find({isDeleted: false}).sort({createdDate: -1});
    listDiscount.forEach((item) => {
        const now = new Date().getTime();
        const startDate = item.startDate.getTime();
        const endDate = item.endDate.getTime();
        let status, id, updateStatus;
        if (endDate > now && item.status !== 1) {
            status = 1;
            id = item.id;
            updateStatus = updateStatusDiscount(id, status);
        }
        if (startDate > now && item.status !== 2) {
            status = 2;
            id = item.id;
            updateStatus = updateStatusDiscount(id, status)
        }
        if (startDate < now && endDate > now && status !== 0) {
            status = 0;
            id = item.id;
            updateStatus = updateStatusDiscount(id, status);
        }
    });
    return success(listDiscount);
};

export async function createDiscount(maxValue, percent, startDate, endDate, name) {
    const now = new Date();
    const new_discount = new discount({
        id: v1(),
        isDeleted: false,
        maxValue,
        percent,
        status: 0,
        startDate,
        endDate,
        name,
        createdDate: now
    });
    await new_discount.save();
    return success(new_discount);
};

export async function getUpdate(id) {
    const discount_update = await discount.findOne({id: id});
    return success(discount_update);
};

export async function saveUpdate(id, maxValue, percent, startDate, endDate, name) {
    const save = await discount.updateOne({id: id}, {
        $set: {
            maxValue: maxValue,
            percent: percent,
            startDate: startDate,
            endDate: endDate,
            name: name
        }
    });
    return success("update successfuly");
};

export async function updateStatusDiscount(id, status) {
    const updateStatus = await discount.updateOne({id: id}, {$set: {status: status}});
    return success("update successfuly");
};

export async function find(search) {
    let discountSearch;
    if (!isNaN(search)) {
        discountSearch = await discount.find({
            isDeleted: false, $or: [
                {maxValue: {$eq: parseFloat(search)}},
                {percent: {$eq: parseFloat(search)}}
            ]
        });
    } else {
        discountSearch = await discount.find({
            isDeleted: false, name: {$regex: search}
        });
    }

    return success(discountSearch);
};

export async function findDate(searchDate) {
    const discountSearch = await discount.find({
        isDeleted: false,
        $or: [
            {startDate: {$eq: searchDate}},
            {endDate: {$eq: searchDate}}
        ]
    });

    return success(discountSearch);
};

export async function deleted(id) {
    const deleteDiscount = await discount.updateOne({id: id}, {$set: {isDeleted: true}});
    return success("delete successfuly");
}