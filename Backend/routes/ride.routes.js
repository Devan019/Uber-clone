const Route = require('express').Router();
const { query } = require('express-validator');
const {makeRide} = require('../controllers/ride.controller')
const {auth} = require('../middlewares/auth.middleware')

Route.post('/create' ,
  // query('userId').isString().isLength({min: 4 , max : 100}).withMessage("invaild userid"),
  query('pickup').isString().isLength({max:100}).withMessage("invaild pickup"),
  query('destination').isString().isLength({max:100}).withMessage("invaild destination"),
  query('vehicleType').isString().isIn(['auto' , 'car' , 'moto']).withMessage("invalid vehicalType"),
  auth , makeRide)

module.exports = Route