import mongoose from "mongoose";

const Metarial = mongoose.Schema({
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

export default mongoose.model("Metarial", Metarial);