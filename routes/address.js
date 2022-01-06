import express from 'express';
import city from '../models/city.js';
import district from '../models/district.js';
import ward from '../models/ward.js';

const router = express.Router();

router.get('/', (req, res) => {
    //find all cities
    city.find({}, (err, cities) => {
        if (err) {
            res.send(err);
        } else {
            res.json(cities);
        }
    });
});

router.get('/city', (req, res) => {
    //find all cities
    city.find({}, (err, cities) => {
        if (err) {
            res.send(err);
        } else {
            res.json(cities);
        }
    });
});

// create route to add city to database
router.post('/city', (req, res) => {
    const newCity = new city({
        name: req.body.name,
        slug: req.body.slug,
        type: req.body.type,
        name_with_type: req.body.name_with_type,
        code: req.body.code,
    });
    newCity.save((err) => {
        if (err) {
            res.send(err);
        } else {
            res.json({
                message: 'City created!',
            });
        }
    });
});

router.get('/district', (req, res) => {
    //find all districts in params.query.city (code), find all districts if no city is specified 
    if (req.query.city) {
        console.log(typeof(req.query.city));
        district.find({ parent_code: req.query.city }, (err, districts) => {
            if (err) {
                res.send(err);
            } else {
                res.json(districts);
            }
        });
    }
    else {
        district.find({}, (err, districts) => {
            if (err) {
                res.send(err);
            } else {
                res.json(districts);
            }
        });
    }
});
// create route to add district to database
router.post('/district', (req, res) => {
    const newDistrict = new district({
        name: req.body.name,
        type: req.body.type,
        slug: req.body.slug,
        name_with_type: req.body.name_with_type,
        path: req.body.path,
        path_with_type: req.body.path_with_type,
        code: req.body.code,
        parent_code: req.body.parent_code,
    });
    newDistrict.save((err) => {
        if (err) {
            res.send(err);
        } else {
            res.json({
                message: 'District created!',
            });
        }
    });
});

router.get('/ward', (req, res) => {
    //find all wards in params.query.district (code), find all wards if no district is specified
    if (req.query.district) {
        ward.find({ parent_code: req.query.district }, (err, wards) => {
            if (err) {
                res.send(err);
            } else {
                res.json(wards);
            }
        });
    }
    else {
        ward.find({}, (err, wards) => {
            if (err) {
                res.send(err);
            } else {
                res.json(wards);
            }
        });
    }
});

// create route to add ward to database
router.post('/ward', (req, res) => {
    const newWard = new ward({
        name: req.body.name,
        type: req.body.type,
        slug: req.body.slug,
        name_with_type: req.body.name_with_type,
        path: req.body.path,
        path_with_type: req.body.path_with_type,
        code: req.body.code,
        parent_code: req.body.parent_code,
    });
    newWard.save((err) => {
        if (err) {
            res.send(err);
        } else {
            res.json({
                message: 'Ward created!',
            });
        }
    });
});

export default router;
