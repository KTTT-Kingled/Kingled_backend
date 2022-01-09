import mongoose from 'mongoose';

const { Schema } = mongoose;

// create Order Schema and Model
const orderSchema = new Schema({
    orderUser: {
        type: Map,
        required: true,
    },
    orderAddress: {
        type: String,
        required: true,
    },
    orderProducts: {
        type: Array,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'delivering', 'delivered', 'cancelled'],
        default: 'pending',
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid'],
        default: 'pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    deliveringAt: {
        type: Date,
    },
    deliveredAt: {
        type: Date,
    },
    paidAt: {
        type: Date,
    },
    cancelledAt: {
        type: Date,
    },
});

export default mongoose.model('Order', orderSchema);