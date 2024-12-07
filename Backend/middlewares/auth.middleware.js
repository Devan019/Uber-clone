const user = require('../models/user.model');
const jwt = require('jsonwebtoken')
const blacklistModel = require('../models/blacklist.model')
const captainModel = require('../models/captain.model');

module.exports.auth = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(402).json("Unauthorization");
  }

  const blacklist = await blacklistModel.findOne({ token });

  if (blacklist) {
    return res.status(402).json('unauthoried');
  }

  try {
    const decode = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log(decode)

    if (!decode.id) {
      return res.status(401).json("user is invaild");
    }

    const User = await user.findById(decode.id);
    if (!User) {
      return res.status(402).json("User is not found");
    }

    req.user = User
    next();

  } catch (error) {
    res.status(401).json(error);
  }

}

module.exports.authCaptain = async (req, res, next) => {
  try {

    const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;

    if (!token) {
      return res.status(403).json("unauthorized token not found")
    }

    const blacklist = await blacklistModel.findOne({ token });
    if (blacklist) {
      return res.status(403).json("unauthorized blacklist")
    }

    const decode = jwt.decode(token, process.env.TOKEN_SECRET);

    if (!decode) {
      return res.status(403).json("unauthorized not decode")
    }

    if (!decode.id) {
      return res.status(403).json("unauthorized id not")
    }

    const Captain = await captainModel.findById(decode.id);
    if (!Captain) {
      return res.status(403).json("unauthorized not captain")
    }

    req.captain = Captain;

    next();
  } catch (error) {
    console.log(error);
  }
}
