import size from "../../models/Size.js";
import { OK } from "../../constant/HttpResponeCode.js";
import { v1 } from "uuid";
import { success } from "../../respone/Respone.Util.js";

export async function getSize() {
    const list = await size.find({ is_deleted: false });
    return success(list);
}

export async function createSize(name) {
    const new_size = await size.create({
        id: v1(),
        name: name,
        is_deleted: false,
    });
    return success(new_size);
}

export async function updateSize(id, name) {
    const update = await size.findOneAndUpdate(
        { id: id },
        { $set: { name: name } }
    );
    return success(update);
}

export async function deleteSize(id) {
    const deleted = await size.findOneAndUpdate(
        { id: id },
        { $set: { is_deleted: true } }
    );
    return success(deleted);
}
