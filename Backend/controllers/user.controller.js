const { validationResult } = require('express-validator');
const user = require('../models/user.model');
const { createUser } = require('../services/user.service');
const blacklistModel = require('../models/blacklist.model')

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
        return res.json({ User, Token })
    } catch (error) {
        return res.json(error)
    }
}

module.exports.loginUser = async (req, res) => {
    const errs = validationResult(req);
    if (!errs.isEmpty()) {
        return res.json({ errrors: errs.array() });
    }

    const { email, password } = req.body;

    const User = await user.findOne({ email }).select('+password');

    if (!User) {
        return res.status(401).json("Invalid email and password");
    }

    const ispassMatch = await User.comparePassword(password);

    if (!ispassMatch) {
        return res.status(401).json("Invalid email and password");
    }

    const token = User.getAuthToken();
    res.cookie('token', token)
    return res.json({ token, User })
}

module.exports.profile = async (req, res) => {
    try {
        return res.json(req.user);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports.logout = async (req, res) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (token) {
        try {
            const blacklist = new blacklistModel({
                token
            })

            const saveblocklist = await blacklist.save();
            return res.json({mess : "user logout!", saveblocklist});
        } catch (error) {
            return res.status(402).json(error.message);
        }
    }

    return res.status(403).json("unauthorized");
}

