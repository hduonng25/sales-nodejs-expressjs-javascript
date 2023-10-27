import mongoose from "mongoose";

const User = mongoose.Schema({
     id: {
          type: String,
          required: true
     },

     name: {
          type: String,
          required: false
     },

     email: {
          type: String,
          required: false
     },

     phone: {
          type: String,
          required: false
     },

     password: {
          type: String,
          required: false
     },

     address: {
          type: String,
          required: false
     },

     is_deleted: {
          type: Boolean,
          required: false
     },

     type_user: {
          type: Number,
          required: false
     },

     role: {
          type: String,
          required: true
     }
});

export default mongoose.model("User", User);