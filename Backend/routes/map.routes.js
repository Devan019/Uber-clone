const { query } = require('express-validator');
const { sendCoordinates , getDistaceAndTime , getSuggestion } = require('../controllers/map.controller');
const {auth} = require('../middlewares/auth.middleware')
const route = require('express').Router();



route.get("/getcors",
    query('addresh').isString().isLength({min:6})
    , auth , sendCoordinates)

route.get("/getdis" , 
    query(('origin')),
    query(('destination'))
    , auth , getDistaceAndTime)

route.get("/getsuggestion" , 
    query(('addresh')),
    auth  ,getSuggestion
)

module.exports = route;