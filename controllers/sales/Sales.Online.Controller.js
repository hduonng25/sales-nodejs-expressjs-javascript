import cart from "../../models/Cart.js";
import {v1} from "uuid";
import bills from "../../models/Bills.js";
import {success} from "../../respone/Respone.Util.js";
import discount from "../../models/discount.js";
import user from "../../models/User.js";

const create_date = new Date();

export async function check_out(id, cart_details_id, total) {
    const users = await user.findOne({id: id});
    let bill_details = [];
    let money = 0;

    for (const id_cart_details of cart_details_id) {
        const carts = await cart.findOne({"cart_details.id": id_cart_details});
        const cart_details = carts.cart_details.find((details) => details.id === id_cart_details);

        if (cart_details) {
            money += cart_details.cart_details_money;

            bill_details.push({
                id: v1(),
                created_date: create_date,
                created_by: create_by,
                is_deleted: false,
                price: cart_details.price,
                quantity: cart_details.quantity,
                money_bill_details: cart_details.cart_details_money,
                product_details_id: cart_details.product_details_id,
            });
        }
    }

    const idBig = await bills.findOne({}, {id: 1}, {sort: {id: -1}});
    const idBill = parseInt(idBig.id) + 1;
    const bill = await bills.create({
        id: idBill,
        code: 'HD' + idBill,
        is_deleted: false,
        type_bill: 0,
        ship_money: 0,
        reduced_money: 0,
        bill_money: money,
        bill_details: bill_details,
    });

    await bill.save();
    const data = {
        bill, users
    }
    return success(data);
};

export async function addDiscountToBill(discount_id, order_id) {
    const discounts = await discount.findOne({id: discount_id});
    const bill = await bills.findOne({id: order_id});
    let reduced_money = (bill.bill_money * discounts.percent) / 100;
    let money = 0;
    let money_update = 0;
    if (reduced_money > discounts.maxValue) {
        money = discounts.maxValue;
        money_update = bill.bill_money - money;
        await bills.findOneAndUpdate({id: order_id}, {
            $set: {
                reduced_money: money,
                bill_money: money_update,
                discount_id: discounts.id
            }
        });
    } else {
        money = reduced_money;
        money_update = bill.bill_money - money;
        await bills.updateOne({id: order_id}, {
            $set: {
                reduced_money: money,
                bill_money: money_update,
                discount_id: discounts.id
            }
        });
    }
    return success("done");
};

export async function saveOrderPayment(amountOder, orderID, moneyShip, note, receiver, phone_receiver, address, email_receiver) {
    const bill = await bills.updateOne(
        {id: orderID},
        {
            $set: {
                ship_money: moneyShip,
                note: note,
                receiver: receiver,
                phone_receiver: phone_receiver,
                address: address,
                email_receiver: email_receiver,
                status_bill: 1,
                create_date: create_date,
                create_by: create_by,
                bill_money: amountOder,
                is_deleted: false
            },
            $push: {
                time_line: {
                    id: v1(),
                    user_id: 1,
                    create_date: create_date,
                    create_by: receiver,
                    status_bill: 1,
                    action: "Tao don hang thanh toan vnpay",
                    type: 0
                }
            }
        }
    );
    return success(bill);
};

export async function saveOrderShipCOD(amountOder, orderID, moneyShip, note, receiver, phone_receiver, address, email_receiver) {
    const bill = await bills.updateOne(
        {id: orderID},
        {
            $set: {
                ship_money: moneyShip,
                note: note,
                receiver: receiver,
                phone_receiver: phone_receiver,
                address: address,
                email_receiver: email_receiver,
                status_bill: 1,
                create_date: create_date,
                create_by: receiver,
                bill_money: amountOder,
                is_deleted: false
            },
            $push: {
                time_line: {
                    id: v1(),
                    user_id: 1,
                    create_date: create_date,
                    create_by: receiver,
                    status_bill: 1,
                    action: "Tao don hang ship cod",
                    type: 0
                }
            }
        }
    );
    return success(bill);
}



