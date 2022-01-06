import mongoose from 'mongoose';

const { Schema } = mongoose;

const sampleCity = {
    "26": {
        "name": "Vĩnh Phúc",
        "slug": "vinh-phuc",
        "type": "tinh",
        "name_with_type": "Tỉnh Vĩnh Phúc",
        "code": "26"
    }
}

const citySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: String,
        required: true,
    },
    name_with_type: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
    },
});

export default mongoose.model('City', citySchema);
