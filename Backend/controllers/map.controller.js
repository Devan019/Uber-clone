const { getNearCaptains, convertCordinatesToAddress, getCorsArray, getCorrinates } = require('../services/map.service')
const { validationResult } = require("express-validator");
const axios = require('axios');

module.exports.getNearCaptainsByPickup = async (req, res) => {
    try {
        const { pickup, vechicleType } = req.body;
        // const err =  validationResult(req);
        // if(!err.isEmpty()){
        //     return res.json({err:err.array()})
        // }


        const coors = await getCorrinates(pickup)

        const allCaptains = await getNearCaptains(coors, vechicleType)

        return res.json(allCaptains)
    } catch (error) {
        return res.json(error);
    }
}

module.exports.getDistaceAndTime = async ({ pickup, destination }) => {

    const req = {
        pickup, destination
    }
    const err = validationResult(req);
    if (!err.isEmpty()) {
        return res.json({ err: err.array() })
    }

    try {
        const coodA = await getCorsArray(pickup);
        const coodB = await getCorsArray(destination);

        const apiKey = process.env.GOOGLE_API_KEY;

        const response = await axios.get('https://maps.googleapis.com/maps/api/directions/json', {
            params: {
                origin: `${coodA[1]},${coodA[0]}`,
                destination: `${coodB[1]},${coodB[0]}`,
                mode: 'driving', // Options: 'driving', 'walking', 'bicycling', 'transit'
                key: apiKey
            }
        });


        const route = response.data.routes[0];
        const duration = route.legs[0].duration.value; // in seconds
        const distance = route.legs[0].distance.value; // in meters

        return {
            distance: distance,
            duration: duration,
        };
    } catch (error) {
        return {
            error: "Error fetching distance and duration",
        };
       
    }
}

module.exports.getLocation = async (req, res) => {
    const { lat, long } = req.body;
    if (!lat || !long) {
        return res.json({
            mess: "not vaild"
        })
    }

    const place = await convertCordinatesToAddress(lat, long)
    return res.json({
        place: place
    })
}

module.exports.findDistanceBtnTwoPoints = async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        return res.json({ err: err.array() })
    }
    const { lat1, lon1, lat2, lon2 } = req.body;
    const toRad = (value) => (value * Math.PI) / 180;

    const R = 6371; // Radius of the Earth in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return res.json({
        distance : distance
    })
}

module.exports.getCorrinatesByAddress = async ( req,res) => {
    const {address} = req.body;
    const err = validationResult(req);
    if(!err.isEmpty()){
        return res.json({err:err.array()})
    }

    const corrinates = await getCorrinates(address)
    return res.json({
        corrinates : corrinates
    })
}
