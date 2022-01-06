import mongoose from 'mongoose';

const { Schema } = mongoose;

const productSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        dropDups: true,
    },
    name: {
        type: String,
        required: true,
    },
    images: {
        type: Array,
        of: String,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        of: String,
    },
    specification: {
        type: Array,
        of: Object,
    },
    price: {
        type: Number,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
});

export default mongoose.model("Product", productSchema);