import bills from "../../models/Bills.js";
import {success} from "../../respone/Respone.Util.js";

export async function getBill(status) {
    const list = await bills.find({status_bill: status, type_bill: 1, is_deleted: false});
    return success(list);
};

export async function find(status, search) {
    let listSearch;
    if (!isNaN(search)) {
        listSearch = await bills.find({
            status_bill: status,
            type_bill: 1,
            is_deleted: false,
            bill_money: search
        });
    } else {
        listSearch = await bills.find(
            {
                status_bill: status,
                type_bill: 1,
                is_deleted: false,
                $or: [
                    {code: {$regex: search, $options: 'i'}},
                    {note: {$regex: search, $options: 'i'}},
                    {phone_receiver: {$regex: search}}
                ]
            }
        );
    }

    return success(listSearch);
};

export async function findDate(status, search) {
    const listSearch = await bills.find(
        {
            status_bill: status,
            type_bill: 1,
            is_deleted: false,
            $or: [
                {created_date: {$eq: search}}
            ]
        }
    );
    return success(listSearch);
};

export async function getDetails(id, status) {
    const filter = [
        {$match: {id: id, type_bill: 1}},
        {$unwind: "$bill_details"},
    ];
    const details = await bills.aggregate(filter).exec();
    const billDetails = details.map(detail => detail.bill_details);
    return success(billDetails);
};

