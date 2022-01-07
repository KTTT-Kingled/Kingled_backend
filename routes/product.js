import express from 'express';
import product from '../models/product.js';

const router = express.Router();

// create route to get all products
router.get('/all', (req, res) => {
    product.find({}, (err, products) => {
        if (err) {
            res.send(err);
        } else {
            res.json(products);
        }
    });
});

// create route to search for products with multiple parameters
router.get('/search', (req, res) => {
    const { name, category, code } = req.query;
    product.find(
        {
            name: { $regex: name, $options: 'i' },
            category: { $regex: category, $options: 'i' },
            code: { $regex: code, $options: 'i' },
        },
        (err, products) => {
            if (err) {
                res.send(err);
            } else {
                res.json([{
                            results: products.length,
                            data: products,
                        }]);
            }
        },
    );
});

// create route to get detail product by code
router.get('/detail', (req, res) => {
    const { code } = req.query;
    product.findOne({ code: req.query.code }, (err, product) => {
        if (err) {
            res.send(err);
        } else {
            res.json(product);
        }
    });
});

// create route to add new product
router.post('/add', (req, res) => {
    product.init().then(() => {
        const newProduct = new product({
            code: req.body.code,
            name: req.body.name,
            images: req.body.images,
            category: req.body.category,
            description: req.body.description,
            specification: req.body.specification,
            price: req.body.price,
            url: req.body.url,
        });
        newProduct.save((err) => {
            if (err) {
                res.send(err);
            } else {
                res.json({
                    message: 'Product created!',
                });
            }
        });
    });
});

// create route to update product by code
router.put('/update', (req, res) => {
    product.init().then(() => {
        product.findOneAndUpdate(
            {
                code: req.body.code,
            },
            {
                $set: {
                    name: req.body.name,
                    images: req.body.images,
                    category: req.body.category,
                    description: req.body.description,
                    specification: req.body.specification,
                    price: req.body.price,
                    url: req.body.url,
                },
            },
            (err) => {
                if (err) {
                    res.send(err);
                } else {
                    res.json({
                        message: 'Product updated!',
                    });
                }
            },
        );
    });
});

// create route to delete product by code
router.delete('/delete', (req, res) => {
    product.findOneAndRemove(
        {
            code: req.body.code,
        },
        (err) => {
            if (err) {
                res.send(err);
            } else {
                res.json({
                    message: 'Product deleted!',
                });
            }
        },
    );
});

export default router;
