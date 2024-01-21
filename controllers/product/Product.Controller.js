import product from '../../models/Product.js';
import color from '../../models/Color.js';
import size from '../../models/Size.js';
import metarial from '../../models/Metarial.js';
import designs from '../../models/Designs.js';
import { OK } from '../../constant/HttpResponeCode.js';
import { v1 } from 'uuid';
import { success } from '../../respone/Respone.Util.js';

const create_date = new Date();
const create_by = 'hduong';

export async function getProducts() {
    const list = await product.find({ is_deleted: false });
    return success(list);
}

export async function createProduct(
    price,
    name,
    note,
    quantity,
    color_id,
    size_id,
    metarial_id,
    designs_id,
) {
    const colors = await color.find({ id: color_id });
    const sizes = await size.find({ id: size_id });
    const metarials = await metarial.findOne({ id: metarial_id });
    const designss = await designs.findOne({ id: designs_id });

    let product_details = [];

    for (const color of colors) {
        for (const size of sizes) {
            const details = {
                id: v1(),
                created_date: create_date,
                quantity: quantity,
                is_deleted: false,
                status: false,

                size: {
                    id: size.id,
                    name: size.name,
                },

                color: {
                    id: color.id,
                    name: color.name,
                    code: color.code,
                },

                metarial: {
                    id: metarials.id,
                    name: metarials.name,
                },

                designs: {
                    id: designss.id,
                    name: designss.name,
                },
            };
            product_details.push(details);
        }
    }

    const new_product = await product.create({
        id: v1(),
        created_date: create_date,
        created_by: create_by,
        is_deleted: false,
        price: price,
        name: name,
        note: note,
        product_details: product_details,
    });

    return success(new_product);
}

export async function updateProduct(id, price, name, note) {
    const update = await product.findOneAndUpdate(
        { id: id },
        { $set: { price: price, name: name, note: note } },
        { new: true },
    );

    return success(update);
}

export async function deletedProduct(id) {
    const deleted = await product.findOneAndUpdate(
        { id: id },
        { $set: { is_deleted: true } },
    );
    return success(deleted);
}

export async function getDetails(product_id) {
    const products = await product.findOne({ id: product_id });
    const details = products.product_details;
    return success(details);
}

export async function updateProductDetails(
    product_id,
    product_details_id,
    quantity,
    status,
    is_deleted,
) {
    const filter = [
        {
            $match: {
                id: product_id,
                'product_details.id': product_details_id,
                is_deleted: false,
            },
        },
        { $unwind: '$product_details' },
        { $match: { 'product_details.id': product_details_id } },
        {
            $set: {
                'product_details.quantity': quantity,
                'product_details.status': status,
                'product_details.is_deleted': is_deleted,
            },
        },
    ];

    const product_update = await product.aggregate(filter).exec();

    const update = await product.findOneAndUpdate(
        { id: product_id },
        {
            $set: {
                product_details: product_update[0].product_details,
            },
        },
    );
    return success(update);
}

export async function saveImage(
    product_id,
    product_details_id,
    image,
) {
    const products = await product.findOne({ id: product_id });
    const product_details = products.product_details.find(
        (details) => details.id === product_details_id,
    );
    product_details.image.push({
        id: v1(),
        name: image,
        status: false,
    });

    await products.save();
    return success(product_details);
}
