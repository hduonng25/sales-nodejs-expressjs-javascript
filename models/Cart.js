import mongoose from "mongoose";

const Cart = mongoose.Schema({
     id: {
          type: String,
          required: true
     },

     user_id: {
          type: String,
          required: false
     },

     cart_details: [{
          _id: false,
          id: {
               type: String,
               required: true
          },

          is_deleted: {
               type: Boolean,
               required: false
          },

          created_date: {
               type: Date,
               default: Date.now
          },

          created_by: {
               type: String,
               required: false
          },

          price: {
               type: Number,
               required: false
          },

          quantity: {
               type: Number,
               required: false
          },

          cart_details_money: {
               type: Number,
               required: false
          },

          product_details_id: {
               type: String,
               required: false
          }
     }]
});

export default mongoose.model("Cart", Cart);