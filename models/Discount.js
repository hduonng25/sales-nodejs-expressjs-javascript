import mongoose from "mongoose";

const Discount = mongoose.Schema({
     id: {
          type: String,
          required: true
     },
     isDeleted: {
          type: Boolean,
          required: true
     },
     maxValue: {
          type: Number,
          required: true
     },
     percent: {
          type: Number,
          required: true
     },
     status: {
          type: Number,
          required: true
     },
     startDate: {
          type: Date,
          required: true
     },
     endDate: {
          type: Date,
          required: true
     },
     name: {
          type: String,
          required: true
     },
     createdDate: {
          type: Date,
          required: true
     }
});

export default mongoose.model("Discount", Discount);