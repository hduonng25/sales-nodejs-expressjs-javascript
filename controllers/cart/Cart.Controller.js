import product from "../../models/Product.js";
import cart from "../../models/Cart.js";
import { v1 } from "uuid";
import { error, success } from "../../respone/Respone.Util.js";
import user from "../../models/User.js";

export async function getListCartDetails(id) {
  const carts = await cart.aggregate([
    { $match: { id: id } },
    { $unwind: "$cart_details" },
    { $project: { _id: 0, cart_details: 1 } },
  ]);
  return success(carts);
}

export async function addToCart(id, id_color, id_size, id_product, quantity) {
  const products = await product.findOne({ id: id_product });
  if (products) {
    const product_details = products.product_details.find(
      (details) => details.color.id === id_color && details.size.id === id_size
    );
    const carts = await cart.findOne({ user_id: id });
    const checkCartDetails = carts.cart_details.find(
      (details) => details.product_details_id === product_details.id
    );
    const money = products.price * quantity;
    if (checkCartDetails) {
      checkCartDetails.quantity += quantity;
      checkCartDetails.cart_details_money += money;
    } else {
      carts.cart_details.push({
        id: v1(),
        is_deleted: false,
        created_date: new Date(),
        created_by: "hduong",
        price: products.price,
        quantity: quantity,
        cart_details_money: money,
        product_details_id: product_details.id,
      });
    }

    await carts.save();
    return success("done");
  }
  return error("product NaN");
}

export async function updateQuantity(id, id_cart_details, quantity) {
  const carts = await cart.findOne({ user_id: id });
  const resuilt = await cart.aggregate([
    { $match: { id: id_cart } },
    { $unwind: "$cart_details" },
    { $match: { "cart_details.id": id_cart_details } },
    {
      $set: {
        "cart_details.quantity": quantity,
        "cart_details.cart_details_money": {
          $multiply: ["$cart_details.price", quantity],
        },
      },
    },
  ]);
  console.log(resuilt[0]);
  await cart.updateOne({ id: carts.id }, resuilt[0]);

  return success("done");
}

export async function deletedCartDetails(id_cart_details) {
  await cart.updateOne(
    { "cart_details.id": id_cart_details },
    { $set: { "cart_details.$.is_deleted": true } }
  );
  return success("done");
}
