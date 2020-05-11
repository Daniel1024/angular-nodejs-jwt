const {Router} = require('express');
const router = Router();

const User = require('../models/User');

const jwt = require('jsonwebtoken');

router.get('/', (req, res) => res.send('Hello world'));

router.post('/signup', (req, res) => {
    const {email, password} = req.body;
    const newUser = new User({email, password});
    newUser.save();

    const token = jwt.sign({_id: newUser._id}, 'secretKey');

    res.status(200).json({token});
});

router.post('/signin', async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (!user) return res.status(401).send("The email doesn't exists");
    if (user.password !== password) return res.status(401).send("Wrong Password");

    const token = jwt.sign({_id: user._id}, 'secretKey');

    res.status(200).json({token});
});

router.get('/tasks', async (req, res) => {
    res.json([]);
});

router.get('/private-tasks', verifyToken, async (req, res) => {
    res.json([]);
});

router.get('/profile', verifyToken, async (req, res) => {
    res.json({user_id: req.userId});
});

module.exports = router;

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized Request');
    }
    const token = req.headers.authorization.split(' ')[1];
    if (token === null) {
        return res.status(401).send('Unauthorized Request');
    }
    const payload = jwt.verify(token, 'secretKey');
    req.userId = payload._id;
    next();
}
