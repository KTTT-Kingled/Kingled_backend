import mongoose from 'mongoose';

const { Schema } = mongoose;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    img: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
});

export default mongoose.model("Category", categorySchema);