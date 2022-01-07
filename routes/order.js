import express from 'express';
import mongoose from 'mongoose';
import order from '../models/order';

var ObjectId = mongoose.Types.ObjectId;

const router = express.Router();

// create route to get all orders
router.get('/all', (req, res) => {
    order.find({}, (err, orders) => {
        if (err) {
            res.send(err);
        } else {
            res.json([
                {
                    title: 'All Orders',
                    data: orders,
                },
            ]);
        }
    });
});

// create route to get orders by order.orderUser.username
router.get('/user', (req, res) => {
    order.find(
        {
            'orderUser.username': req.query.username,
        },
        (err, orders) => {
            if (err) {
                res.send(err);
            } else {
                res.json([
                    {
                        title: 'Orders by User',
                        data: orders,
                    },
                ]);
            }
        },
    );
});

// create route to add new order
router.post('/add', (req, res) => {
    order.init().then(() => {
        const newOrder = new order({
            orderUser: req.body.orderUser,
            orderAddress: req.body.orderAddress,
            orderProducts: req.body.orderProducts,
            totalPrice: req.body.totalPrice,
        });
        newOrder.save((err) => {
            if (err) {
                res.send(err);
            } else {
                res.json({
                    message: 'Order added!',
                });
            }
        });
    });
});

// create route to update order's deliveringAt = Date.now
router.put('/setDelivering', (req, res) => {
    order.findOneAndUpdate(
        {
            _id: ObjectId(req.body.id),
        },
        {
            $set: {
                deliveringAt: Date.now(),
                status: 'delivering',
            },
        },
        (err) => {
            if (err) {
                res.send(err);
            } else {
                res.json({
                    message: 'Order updated!',
                });
            }
        },
    );
});

// create route to update order's deliveredAt = Date.now
router.put('/setDelivered', (req, res) => {
    order.init().then(() => {
        order.findOneAndUpdate(
            {
                _id: req.body.id,
            },
            {
                $set: {
                    deliveredAt: Date.now(),
                    status: 'delivered',
                },
            },
            (err) => {
                if (err) {
                    res.send(err);
                } else {
                    res.json({
                        message: 'Order updated!',
                    });
                }
            },
        );
    });
});

// create route to update order's paidAt = Date.now
router.put('/setPaid', (req, res) => {
    order.init().then(() => {
        order.findOneAndUpdate(
            {
                _id: req.body.id,
            },
            {
                $set: {
                    paidAt: Date.now(),
                    paymentStatus: 'paid',
                },
            },
            (err) => {
                if (err) {
                    res.send(err);
                } else {
                    res.json({
                        message: 'Order updated!',
                    });
                }
            },
        );
    });
});

// create route to update order's cancelledAt = Date.now
router.put('/setCancelled', (req, res) => {
    order.init().then(() => {
        order.findOneAndUpdate(
            {
                _id: req.body.id,
            },
            {
                $set: {
                    cancelledAt: Date.now(),
                    status: 'cancelled',
                },
            },
            (err) => {
                if (err) {
                    res.send(err);
                } else {
                    res.json({
                        message: 'Order updated!',
                    });
                }
            },
        );
    });
});

// create route to delete order by id
router.delete('/delete', (req, res) => {
    order.findOneAndRemove(
        {
            _id: req.body.id,
        },
        (err) => {
            if (err) {
                res.send(err);
            } else {
                res.json({
                    message: 'Order deleted!',
                });
            }
        },
    );
});

export default router;
