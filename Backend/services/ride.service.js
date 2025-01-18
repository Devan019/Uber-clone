const rideModel = require('../models/ride.model')
const {getDistaceAndTime} = require('../controllers/map.controller')
const crypto = require('crypto')

const fareRates = {
  auto: {
    baseFare: 30,
    perKmRate: 10,
    waitingChargePerMinute: 2,
  },
  moto: {
    baseFare: 20,
    perKmRate: 8,
    waitingChargePerMinute: 1,
  },
  car: {
    baseFare: 50,
    perKmRate: 15,
    waitingChargePerMinute: 3,
  },
};
const getotp = (num) => {
    const otp = crypto.randomInt(Math.pow(10 , num-  1) , Math.pow(10,num)).toString()

    return otp;
}
const getFare = async(pickup, destination, vehicleType) => {
    let distance = await getDistaceAndTime({pickup,destination})
    distance = Math.floor(distance.distance / 1000)
    
    const rate = fareRates[vehicleType];

    if(!rate){
        return "not possible"
    }

    console.log( "rate : " , rate)

    const totalFare = rate.baseFare + rate.perKmRate * distance
    console.log("tfare : " , totalFare)


    if (!totalFare) {
        throw new Error('Invalid vehicle type');
    }
    return totalFare ;
};

module.exports.createRide = async({
    user , pickup , destination , vehicleType
}) => {
    if(!user || !pickup || !destination || !vehicleType){
        return "not get"
    }

    let fare = await getFare(pickup , destination , vehicleType);

    if(isNaN(fare)){
        return fare
    }

    console.log("fare is "  , fare)
    const otp = getotp(6)

    const newRide = new rideModel({
        user ,
        pickup,
        destination,
        fare,
        otp,
    })

    await newRide.save()

    return newRide;

}

