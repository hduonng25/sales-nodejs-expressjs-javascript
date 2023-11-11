import {v1} from "uuid";
import bills from "../../models/Bills.js";
import mail from "../../mail/Mail.Conflig.js";
import {success} from "../../respone/Respone.Util.js";
import {mail_update_bill} from "../../mail/options/Mail.Option.js";
import user from "../../models/User.js";

const created_date = new Date();

export async function getBill(status) {
    const listBill = await bills.find({status_bill: status, type_bill: 0});
    return success(listBill)
};

export async function updateStatus(id, id_user, status, action) {
    const users = await user.findOne({id: id_user});
    const timeLine = {
        id: v1(),
        created_by: users.name,
        status_bill: status,
        type: 0,
        created_date: created_date
    };

    const update = await bills.findOneAndUpdate(
        {id: id},
        {
            $set: {
                status_bill: status,
                time_line: timeLine
            }
        },
        {new: true}
    );

    const sendMail = await mail_update_bill(update, action);
    await mail.sendMail(sendMail);
    return success("update successfuly");
};

export async function find(status, search) {
    let listFind;
    if (!isNaN(search)) {
        listFind = await bills.find(
            {
                status_bill: status,
                type_bill: 0,
                is_deleted: false,
                bill_money: search
            }
        );
    } else {
        listFind = await bills.find(
            {
                status_bill: status,
                type_bill: 0,
                is_deleted: false,
                $or: [
                    {code: {$regex: search, $options: 'i'}},
                    {note: {$regex: search, $options: 'i'}},
                    {phone_receiver: {$regex: search}}
                ]
            }
        );
    }
    return success(listFind);
};

export async function findDateBill(status, search) {
    const listFind = await bills.find(
        {
            status_bill: status,
            type_bill: 0,
            is_deleted: false,
            $or: [
                {created_date: {$eq: search}}
            ]
        }
    );
    return success(listFind)
};

export async function getDetails(id, status) {
    const filter = [
        {$match: {id: id, type_bill: 0}},
        {$unwind: "$time_line"},
        {$match: {"time_line.status_bill": status}},
        {$sort: {"time_line.created_date": -1}},
        {$limit: 1}
    ];

    const details = await bills.aggregate(filter).exec();
    const timeLine = details[0].time_line;
    const bill_details = details.map(detail => detail.bill_details)
    return success({timeLine, bill_details});
};


