const RideModel = require('../models/ride.model')
const {createRide} = require('../services/ride.service')

module.exports.makeRide = async(req,res) => {
  const {pickup , destination , vehicleType, fare} = req.body;

  const userId = req.user._id.toString();

  if(!userId || !pickup || !destination || !vehicleType || !fare){
    return res.json({
      msgg : "invaild form"
    })
  }

  const newride = await  createRide({user : userId , pickup , destination , vehicleType, fare});

  return res.json({
    ride : newride
  })

}