const captainModel = require('../models/captain.model')
const { validationResult } = require('express-validator')
const { createCaptain } = require('../services/captain.service')
const blacklistModel = require('../models/blacklist.model')

module.exports.registerCaptain = async (req, res) => {
    try {
        const errs = validationResult(req);
        if (!errs.isEmpty()) {
            return res.status(402).json(errs);
        }

        const Captain = await createCaptain(req.body, res);
        return res.json({
            msg: "register successfully",
            Captain
        })
    } catch (error) {
        res.json(error)
    }

}

module.exports.loginCaptain = async (req, res) => {
    try {
        const errs = validationResult(req);
        if (!errs.isEmpty()) {
            return res.json({ message :  errs , err : true});
        }

        const { email, password } = req.body;


        const CheckCaptain = await captainModel.findOne({ email }).select('+password');

        if (!CheckCaptain) {
            return res.json({message : "Captain is not present" , err : true});
        }

        const checkPassword = await CheckCaptain.comparePassword(password);


        if (!checkPassword) {
            return res.json({message : "Captain is not present" , err : true});
        }

        const token = CheckCaptain.getAuthToken();

        if (!token) {
            return res.json({message : "server fail" , err : true});
        }

        res.cookie('token', token);
        return res.status(201).json({
            msg: "login sucessfully",
            token,
            CheckCaptain
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports.profile = async (req, res) => {
    try {
        res.json(req.captain);
    }catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports.logout = async(req,res) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(403).json("unauthorized");
    }

    try {
        const newblacklist = new blacklistModel({token});
        await newblacklist.save();
        res.clearCookie('token');
        return res.json("logout successfully");
    } catch (error) {
        console.log(error);
    }
}


