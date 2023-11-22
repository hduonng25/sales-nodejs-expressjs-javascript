import product from "../../models/Product.js";
import bills from "../../models/Bills.js";
import { v1 } from "uuid";
import { error, success } from "../../respone/Respone.Util.js";
import discount from "../../models/Discount.js";
import user from "../../models/User.js";

const create_date = new Date();
const create_by = "hduong";

export async function createBill(id) {
    const idBig = await bills.findOne({}, { id: 1 }, { sort: { id: -1 } });
    const idBill = parseInt(idBig.id) + 1;
    const users = await user.findOne({ id: id });
    await bills.create({
        id: idBill,
        type_bill: 1,
        is_deleted: false,
        status_bill: 6,
        code: "HD" + idBill,
        create_by: users.name,
    });
    return success("create done");
}

export async function addProductToBill(
    bill_id,
    product_id,
    color_id,
    size_id,
    quantity
) {
    const products = await product.findOne({ id: product_id });
    const product_details = products.product_details.find(
        (details) =>
            details.size.id === size_id && details.color.id === color_id
    );
    if (product_details) {
        const bill = await bills.findOne({ id: bill_id });
        const money_bill_details = products.price * quantity;

        const checkProductOfBill = bill.bill_details.find(
            (details) => details.product_details_id === product_details.id
        );
        if (checkProductOfBill) {
            checkProductOfBill.quantity += quantity;
            checkProductOfBill.money_bill_details += money_bill_details;
        } else {
            bill.bill_details.push({
                id: v1(),
                created_date: create_date,
                created_by: create_by,
                is_deleted: false,
                price: products.price,
                quantity: quantity,
                money_bill_details: money_bill_details,
                product_details_id: product_details.id,
            });
        }

        const quantity_return = product_details.quantity - quantity;

        product_details.quantity = quantity_return;

        await products.save();
        await bill.save();
        return success("add done");
    }
    return error("product NaN");
}

export async function editQuantityBillDetails(
    bill_id,
    bill_details_id,
    quantity
) {
    const bill = await bills.findOne({ "bill_details.id": bill_details_id });
    const result = await bills.aggregate([
        {
            $match: {
                id: bill_id,
                "bill_details.id": bill_details_id,
            },
        },
        { $unwind: "$bill_details" },
        { $match: { "bill_details.id": bill_details_id } },
        {
            $set: {
                "bill_details.quantity": quantity,
                "bill_details.money_bill_details": {
                    $multiply: ["$bill_details.price", quantity],
                },
            },
        },
    ]);

    await product.updateOne(
        { "product_details.id": result[0].bill_details.product_details_id },
        {
            $inc: {
                "product_details.$.quantity":
                    bill.bill_details[0].quantity - quantity,
            },
        }
    );

    await bills.updateOne({ id: bill_id }, result[0]);

    return success(result);
}

export async function deletedBillDetails(bill_details_id) {
    await bills.updateOne(
        { "bill_details.id": bill_details_id },
        { $set: { "bill_details.$.is_deleted": false } }
    );
    return success("delete done");
}

export async function payment_in_store(id) {
    await bills.updateOne({ id: id }, { $set: { status_bill: 7 } });
    return success("payment done");
}

export async function pancellation(id) {
    await bills.updateOne({ id: id }, { $set: { status_bill: 8 } });
    return success("pancellation done");
}

export async function addDiscount(discount_id, order_id) {
    const discounts = await discount.findOne({ id: discount_id });
    const bill = await bills.findOne({ id: order_id });
    let reduced_money = (bill.bill_money * discounts.percent) / 100;
    let money = 0;
    let money_update = 0;
    if (reduced_money > discounts.maxValue) {
        money = discounts.maxValue;
        money_update = bill.bill_money - money;
        await bills.findOneAndUpdate(
            { id: order_id },
            {
                $set: {
                    reduced_money: money,
                    bill_money: money_update,
                    discount_id: discounts.id,
                },
            }
        );
    } else {
        money = reduced_money;
        money_update = bill.bill_money - money;
        await bills.updateOne(
            { id: order_id },
            {
                $set: {
                    reduced_money: money,
                    bill_money: money_update,
                    discount_id: discounts.id,
                },
            }
        );
    }
    return success("done");
}
