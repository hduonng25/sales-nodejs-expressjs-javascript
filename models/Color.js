import mongoose from "mongoose";

const Color = mongoose.Schema({
    id: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: false
    },

    code: {
        type: String,
        required: false
    },

    is_deleted: {
        type: Boolean,
        required: false
    }
});

export default mongoose.model("Color", Color);