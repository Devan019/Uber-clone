const Route = require('express').Router();
const { query } = require('express-validator');
const { makeRide } = require('../controllers/ride.controller')
const { auth } = require('../middlewares/auth.middleware')
const { getFare } = require('../services/ride.service')

Route.post('/create',
  // query('userId').isString().isLength({min: 4 , max : 100}).withMessage("invaild userid"),
  query('pickup').isString().isLength({ max: 100 }).withMessage("invaild pickup"),
  query('destination').isString().isLength({ max: 100 }).withMessage("invaild destination"),
  query('vehicleType').isString().isIn(['auto', 'car', 'moto']).withMessage("invalid vehicalType"),
  auth, makeRide)


Route.post('/getPrices', auth, async (req, res) => {
  const { pickup, destination } = req.body;

  if (!pickup && !destination) {
    return res.json({
      mess: "not possible"
    })
  }

  const motofare = await getFare(pickup, destination, "moto")
  const car = await getFare(pickup, destination, "car")
  const auto = await getFare(pickup, destination, "auto")

  return res.json({
    car, auto, moto: motofare
  })
})

module.exports = Route