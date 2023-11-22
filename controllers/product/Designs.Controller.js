import Designs from "../../models/Designs.js";
import { v1 } from "uuid";
import { success } from "../../respone/Respone.Util.js";

export async function getDesigns() {
    const list = await Designs.find({ is_deleted: false });
    return success(list);
}

export async function createDesigns(name) {
    const new_designs = await Designs.create({
        id: v1(),
        name: name,
        is_deleted: false,
    });
    return success(new_designs);
}

export async function updateDesigns(id, name) {
    const update = await Designs.findOneAndUpdate(
        { id: id },
        { $set: { name: name, is_deleted: false } }
    );
    return success(update);
}

export async function deletedDesigns(id) {
    await Designs.findOneAndUpdate({ id: id }, { $set: { is_deleted: true } });
    const list = await Designs.find();
    return success(list);
}
