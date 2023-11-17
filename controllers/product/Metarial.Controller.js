import metarial from "../../models/Metarial.js";
import {v1} from "uuid";
import {success} from "../../respone/Respone.Util.js";

export async function getMetarial() {
    const list = await metarial.find({is_deleted: false});
    return success(list);
};

export async function createMetarial(name) {
    await metarial.create(
        {
            id: v1(),
            name: name,
            is_deleted: false
        }
    )
    const list = await metarial.find();
    return success(list);
};

export async function updateMetarial(id, name) {
    const update = await metarial.findOneAndUpdate(
        {id: id},
        {$set: {name: name, is_deleted: false}}
    );
    return success(update);
};

export async function deleteMetarial(id) {
    await metarial.findOneAndUpdate(
        {id: id},
        {$set: {is_deleted: true}}
    );
    const list = await metarial.find();
    return success(list);
};