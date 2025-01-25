const RideModel = require('../models/ride.model')
const {createRide} = require('../services/ride.service')

module.exports.makeRide = async(req,res) => {
  const {pickup , destination , vehicleType, fare} = req.body;
  // console.log("user is : " , req.user)
  console.log("pickup is : " , pickup , "destination is : " , destination , "vehicle type is : " , vehicleType)

  const userId = req.user._id.toString();

  if(!userId || !pickup || !destination || !vehicleType || !fare){
    return res.json({
      msgg : "invaild form"
    })
  }

  const newride = await  createRide({user : userId , pickup , destination , vehicleType, fare});
  console.log("new ride is : " , newride)

  return res.json({
    ride : newride
  })

}