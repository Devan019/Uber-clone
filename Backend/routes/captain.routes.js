const route = require('express').Router();
const { body } = require('express-validator');
const { registerCaptain, loginCaptain, profile, logout, setActive } = require('../controllers/captain.controller')
const { authCaptain } = require('../middlewares/auth.middleware')

route.post("/register", [
    body('email').isEmail().withMessage("invalid email"),
    body('password').isLength({ min: 6 }).withMessage("password should contains 6 charcters"),
    body('fullname.fname').isLength({ min: 3 }).withMessage('firstname should contains length 3'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters'),
    body('vehicle.plate').isLength({ min: 5 }).withMessage('Plate must be at least 5 characters'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
    body('vehicle.type').isIn(['auto', 'car', 'motorcycle']).withMessage('Invalid vehicle type'),
    body('status').isIn(['inactive', 'active']).withMessage('Invalid status'),
], registerCaptain)

route.post("/login", [
    body('email').isEmail().isLength({ min: 5 }).withMessage("invalid email"),
    body('password').isLength({ min: 6 }).withMessage("password should contains 6 charcters"),
], loginCaptain)

route.get("/profile", authCaptain, profile)
route.post("/active", authCaptain, setActive)
route.get("/logout", logout)

module.exports = route