import mongoose from 'mongoose';

const { Schema } = mongoose;

const sampleDistrict = {
    "243": {
        "name": "Vĩnh Yên",
        "type": "thanh-pho",
        "slug": "vinh-yen",
        "name_with_type": "Thành phố Vĩnh Yên",
        "path": "Vĩnh Yên, Vĩnh Phúc",
        "path_with_type": "Thành phố Vĩnh Yên, Tỉnh Vĩnh Phúc",
        "code": "243",
        "parent_code": "26"
    },
}

const districtSchema = new Schema({
    // create schema for district
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

export default mongoose.model('District', districtSchema);
