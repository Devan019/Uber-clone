const route = require('express').Router();
const {body} = require('express-validator');
const {registerUser , loginUser , profile , logout} = require('../controllers/user.controller');
const {auth} = require('../middlewares/auth.middleware')


route.post('/register',[
    body('email').isEmail().withMessage("invalid email"),
    body('password').isLength({min : 6}).withMessage("password should contains 6 charcters"),
    body('fullname.fname').isLength({min:3}).withMessage('firstname should contains length 3')
]  , registerUser)

route.post("/login" , [
    body('email').isEmail().withMessage("invalid email"),
    body('password').isLength({min : 6}).withMessage("password should contains 6 charcters")
] , loginUser)

route.get("/profile",auth , profile)

route.get("/logout" , logout );


module.exports = route