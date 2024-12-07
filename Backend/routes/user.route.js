const route = require('express').Router();
const {body} = require('express-validator');
const {registerUser} = require('../controllers/user.controller');

route.post('/register',[
    body('email').isEmail().withMessage("invalid email"),
    body('password').isLength({min : 6}).withMessage("password should contains 6 charcters"),
    body('fullname.fname').isLength({min:3}).withMessage('firstname should contains length 3')
]  , registerUser)


module.exports = route