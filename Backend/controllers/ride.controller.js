const RideModel = require('../models/ride.model')
const {createRide} = require('../services/ride.service')

module.exports.makeRide = async(req,res) => {
  const {pickup , destination , vehicleType} = req.body;
  console.log("user is : " , req.user)

  const userId = req.user._id.toString();

  if(!userId || !pickup || !destination || !vehicleType){
    return res.json({
      msgg : "invaild form"
    })
  }

  const newride = await  createRide({user : userId , pickup , destination , vehicleType});

  return res.json({
    ride : newride
  })

}