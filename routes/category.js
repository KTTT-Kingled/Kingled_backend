import express from 'express';
import category from '../models/category.js';

const router = express.Router();

//create route to get all categories
router.get('/all', (req, res) => {
    category.find({}, (err, categories) => {
        if (err) {
            res.send(err);
        } else {
            res.json(categories);
        }
    });
});

// create route to add new category
router.post('/add', (req, res) => {
    const newCategory = new category({
        name: req.body.name,
        slug: req.body.slug,
        img: req.body.img,
        url: req.body.url,
    });
    newCategory.save((err) => {
        if (err) {
            res.send(err);
        } else {
            res.json({
                message: 'Category created!',
            });
        }
    });
});

// create route to delete category by slug
router.delete('/delete', (req, res) => {
    category.findOneAndRemove({
        slug: req.body.slug,
    }, (err) => {
        if (err) {
            res.send(err);
        } else {
            res.json({
                message: 'Category deleted!',
            });
        }
    });
});


export default router;
