const captainModel = require('../models/captain.model');

module.exports.createCaptain = async ({ email, password, fullname, vehicle, status, location }, res) => {
    try {
      const { fname , lname } = fullname;
      const { color, plate, capacity, type } = vehicle;
  
      const CaptainCheck = await captainModel.findOne({ email }).select('+password');
      if (CaptainCheck) {
        return res.status(402).json({ msg: "Captain is already exists!" });
      }
  
      const hashPass = await captainModel.getHash(password);
      const newCaptain = new captainModel({
        fullname: { fname, lname },
        email,
        password: hashPass,
        status,
        vehicle: { color, plate, capacity, type },
        
      });
  
      const Captain = await newCaptain.save();
      return Captain;
    } catch (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  