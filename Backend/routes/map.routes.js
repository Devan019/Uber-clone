const { query } = require('express-validator');
const { sendCoordinates } = require('../controllers/map.controller');
const {auth} = require('../middlewares/auth.middleware')
const route = require('express').Router();



route.get("/getcors",
    query('addresh').isString().isLength({min:6})
    , auth , sendCoordinates)

module.exports = route;