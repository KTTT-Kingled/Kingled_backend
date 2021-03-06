import bcrypt from 'bcryptjs';
import express from 'express';
import jwt from 'jsonwebtoken';
import user from '../models/user.js';

const router = express.Router();

router.get('/', (req, res) => {
    user.find({}, (err, users) => {
        if (err) {
            res.send(err);
        } else {
            res.json(users);
        }
    });
});

// create route to login user
router.post('/login', (req, res) => {
    user.init().then(() => {
        user.findOne(
            {
                $or: [{ email: req.body.username }, { username: req.body.username }, { phone: req.body.username }],
            },
            (err, user) => {
                if (err) {
                    res.send(err);
                } else if (user) {
                    if (bcrypt.compareSync(req.body.password, user.password)) {
                        const token = jwt.sign(
                            {
                                username: user.username,
                            },
                            process.env.SECRET_KEY,
                            { expiresIn: '1h' },
                        );
                        res.json({
                            success: true,
                            user: user,
                            message: 'User logged in!',
                            token,
                        });
                    } else {
                        res.json({
                            success: false,
                            message: 'Wrong password!',
                        });
                    }
                } else {
                    res.json({
                        success: false,
                        message: 'User not found!',
                    });
                }
            },
        );
    });
});

// create route to register user
router.post('/register', (req, res) => {
    user.init().then(() => {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                res.send(err);
            } else {
                const newUser = new user({
                    fullName: req.body.fullName,
                    username: req.body.username,
                    password: hash,
                    address: req.body.address,
                    email: req.body.email,
                    isAdmin: req.body.isAdmin,
                    phone: req.body.phone,
                });
                newUser.save((err) => {
                    if (err) {
                        res.send(err);
                    } else {
                        res.json({
                            message: 'User created!',
                        });
                    }
                });
            }
        });
    });
});

// create route to update user by username/email/phone, also hash password
router.put('/update', (req, res) => {
    user.init().then(() => {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                res.send(err);
            } else {
                user.findOneAndUpdate(
                    {
                        $or: [{ email: req.body.email }, { username: req.body.username }, { phone: req.body.phone }],
                    },
                    {
                        $set: {
                            username: req.body.username,
                            password: hash,
                            address: req.body.address,
                            email: req.body.email,
                            isAdmin: req.body.isAdmin,
                            phone: req.body.phone,
                            updatedAt: Date.now(),
                        },
                    },
                    (err) => {
                        if (err) {
                            res.send(err);
                        } else {
                            res.json({
                                message: 'User updated!',
                            });
                        }
                    },
                );
            }
        });
    });
});

//create route to change user's password by username
router.put('/changePassword', (req, res) => {
    user.init().then(() => {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                res.send(err);
            } else {
                user.findOneAndUpdate(
                    {
                        username: req.body.username,
                    },
                    {
                        $set: {
                            password: hash,
                            updatedAt: Date.now(),
                        },
                    },
                    (err) => {
                        if (err) {
                            res.send(err);
                            res.json({
                                success: false,
                                message: 'Something wrong!',
                            });
                        } else {
                            res.json({
                                success: true,
                                message: 'User password changed!',
                            });
                        }
                    },
                );
            }
        });
    });
});


export default router;
