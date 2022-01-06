import mongoose from 'mongoose';

const { Schema } = mongoose;

const sampleWard = {
    "31117": {
        "name": "Cái Khế",
        "type": "phuong",
        "slug": "cai-khe",
        "name_with_type": "Phường Cái Khế",
        "path": "Cái Khế, Ninh Kiều, Cần Thơ",
        "path_with_type": "Phường Cái Khế, Quận Ninh Kiều, Thành phố Cần Thơ",
        "code": "31117",
        "parent_code": "916"
    },
};

const wardSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    name_with_type: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true,
    },
    path_with_type: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    parent_code: {
        type: String,
        required: true,
    },
});

export default mongoose.model('Ward', wardSchema);
