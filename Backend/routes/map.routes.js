const { query } = require('express-validator');
const { getDistaceAndTime, getSuggestion, getLocation, findDistanceBtnTwoPoints, getNearCaptainsByPickup, getCorrinatesByAddress } = require('../controllers/map.controller');
const { auth } = require('../middlewares/auth.middleware')
const route = require('express').Router();

route.post("/getNearCaptains",
    query('pickup').isString().isLength({ min: 6 }),
    query('destination').isString().isLength({ min: 6 })
    , auth, getNearCaptainsByPickup)

route.get("/getdis",
    query(('origin')),
    query(('destination'))
    , auth, getDistaceAndTime)



route.post("/getlocation", auth, getLocation);

route.post("/getDistance",
    query('lat1'),
    query('lon1'),
    query('lat2'),
    query('lon2')
    , findDistanceBtnTwoPoints);

route.post("/getCordinates",
    query('address')
    , auth, getCorrinatesByAddress)

module.exports = route;