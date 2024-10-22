import mongoose, { SchemaTypes, Schema, model } from "mongoose";

const categorySchema = new Schema(
    {
        name: { type: String },
        slug: { type: String, required: true }
    },
    {
        versionKey: false,
        _id: false
    }
);

const userSchema = new Schema(
    {
        _id: { type: SchemaTypes.ObjectId },
        name: { type: String }
    },
    {
        versionKey: false,
        _id: false
    }
);

const productSchema = new Schema(
    {
        name: { type: String },
        description: { type: String },
        slug: { type: String, required: true, index: true },
        categories: [{ type: categorySchema }],
        mrp: { type: Number },
        sp: { type: Number },
        stock: { type: Number, default:0 },
        returnable: { type: Boolean },
        active: { type: Boolean, default: true  },
        images: {
            image1: String,
            image2: String,
            image3: String,
            image4: String,
            image5: String
        },
        deleted: { type: Boolean },
        deletedAt: { type: Date },
        createdBy: { type: userSchema }
    },
    {
        versionKey: false,
        timestamps: true
    }
);


const ProductModel = model('Products', productSchema);

export default ProductModel