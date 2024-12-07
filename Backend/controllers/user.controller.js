const { validationResult } = require('express-validator');
const user = require('../models/user.model');
const { createUser } = require('../services/user.service');


module.exports.registerUser = async (req, res) => {
    // console.log(req.body)
    const errs = validationResult(req);
    if (!errs.isEmpty()) {
        console.log("in error parts")
        return res.json({ errrors: errs.array() });
    }
    try {
        const User = await createUser(req.body);
        const Token = User.getAuthToken();
        return res.json({User , Token})
    } catch (error) {
        return res.json(error)
    }
}