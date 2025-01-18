const mapbox = require('@mapbox/mapbox-sdk');
const directionsService = require('@mapbox/mapbox-sdk/services/directions');

const mapboxClient = mapbox({ accessToken: process.env.MAPBOX_API_TOKEN });
const directionsClient = directionsService(mapboxClient);
// const autoComplation  = 


const { getCorrinates, getCorsArray , getAllPlaces } = require("../services/map.service");
const { validationResult } = require("express-validator");

module.exports.sendCoordinates = async (req,res) => {
    try {
        const {addresh} = req.body;
        const err =  validationResult(req);
        if(!err.isEmpty()){
            return res.json({err:err.array()})
        }


        const coors = await getCorrinates({addresh})
        // console.log(coors , addresh)
        return res.json(coors)
    } catch (error) {
        return res.json(error);
    }
}

module.exports.getDistaceAndTime = async({pickup, destination}) => {

    const req = {
        pickup,destination
    }
    const err =  validationResult(req);
    if(!err.isEmpty()){
        return res.json({err:err.array()})
    }

    try {
        console.log( "paras  : " , pickup , destination)
        const coodA = await getCorsArray(pickup);
    const coodB = await getCorsArray(destination);

    const response = await directionsClient
            .getDirections({
                profile: 'driving', // Options: 'driving', 'walking', 'cycling'
                waypoints: [
                    { coordinates: coodA },
                    { coordinates: coodB },
                ],
            })
            .send();

    const duration =  response.body.routes[0].duration
    const distance = response.body.routes[0].distance

    const distanceInKm = Math.floor(distance / 1000);
    const remainingMeters = Math.round(distance % 1000);
    // Convert duration to hours and minutes
        const days = Math.floor(duration / (3600 * 24));
            const hours = Math.floor((duration % (3600 * 24)) / 3600);
            const minutes = Math.round((duration % 3600) / 60);

            return obj = {
                distance: distance,
                duration: duration,
            }
    } catch (error) {
        console.log(error.message)
    
    }

}

module.exports.getSuggestion = async(req,res) => {
    const {addresh} = req.body;

    const AllPlaces = await getAllPlaces(addresh)
    const all = AllPlaces.body.features


    return  res.json({
        allSuggestions : all.map((feature) => ({
            place_name: feature.place_name,
            // coordinates: feature.geometry.coordinates,
        }))
    })
}