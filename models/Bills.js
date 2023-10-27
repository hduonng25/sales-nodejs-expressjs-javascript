import mongoose from "mongoose";

const Bills = mongoose.Schema({
     id: {
          type: String,
          required: true
     },

     code: {
          type: String,
          required: true
     },

     is_deleted: {
          type: Boolean,
          required: false
     },

     address: {
          type: String,
          required: false
     },

     email_receiver: {
          type: String,
          required: false
     },

     note: {
          type: String,
          required: false
     },

     type_bill: {
          type: Number,
          required: false
     },

     receiver: {
          type: String,
          required: false
     },

     phone_receiver: {
          type: String,
          required: false
     },

     ship_money: {
          type: Number,
          required: false
     },

     reduced_money: {
          type: Number,
          required: false
     },

     order_money: {
          type: Number,
          required: false
     },

     bill_money: {
          type: Number,
          required: false
     },

     user_id: {
          type: String,
          required: false
     },

     discount_id: {
          type: String,
          required: false
     },

     bill_details: [{
          _id: false,
          id: {
               type: String,
               required: true
          },

          created_date: {
               type: Date,
               required: false
          },

          created_by: {
               type: String,
               required: false
          },

          is_deleted: {
               type: Boolean,
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

          money_bill_details: {
               type: Number,
               required: false
          },

          product_details_id: {
               type: String,
               required: false
          }
     }],

     time_line: [{
          _id: false,
          id: {
               type: String,
               required: false
          },

          user_id: {
               type: String,
               required: false
          },

          created_date: {
               type: Date,
               required: false
          },

          created_by: {
               type: String,
               required: false
          },

          status_bill: {
               type: Number,
               required: false
          },

          action: {
               type: String,
               required: false
          },

          type: {
               type: Number,
               required: false
          }
     }],

     created_date: {
          type: Date,
          required: false
     },

     created_by: {
          type: String,
          required: false
     },

     status_bill: {
          type: Number,
          required: false
     },

});

export default mongoose.model("Bill", Bills);