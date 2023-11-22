import color from "../../models/Color.js";
import { OK } from "../../constant/HttpResponeCode.js";
import { v1 } from "uuid";
import { success } from "../../respone/Respone.Util.js";

export async function getColor() {
    const list = await color.find({ is_deleted: false });
    return success(list);
}

export async function createColor(name, code) {
    const new_color = await color.create({
        id: v1(),
        name: name,
        code: code,
        is_deleted: false,
    });
    return success(new_color);
}

export async function updateColor(id, name, code) {
    const update = await color.findOneAndUpdate(
        { id: id },
        { $set: { name: name, code: code } }
    );

    return success(update);
}

export async function deleteColor(id) {
    const deleted = await color.findOneAndUpdate(
        { id: id },
        { $set: { is_deleted: true } }
    );
    return success(deleted);
}
