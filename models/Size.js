import mongoose from "mongoose";

const Size = mongoose.Schema({
    id: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: false
    },

    is_deleted: {
        type: Boolean,
        required: false
    }
});

export default mongoose.model("Size", Size);
