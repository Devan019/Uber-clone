const mapbox = require('@mapbox/mapbox-sdk');
const directionsService = require('@mapbox/mapbox-sdk/services/directions');
const mapboxClient = mapbox({ accessToken: process.env.MAPBOX_API_TOKEN });
const directionsClient = directionsService(mapboxClient);


const { getCorrinates, getCorsArray } = require("../services/map.service");
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

module.exports.getDistaceAndTime = async(req,res) => {
    const {origin, destination} = req.body;
    const err =  validationResult(req);
    if(!err.isEmpty()){
        return res.json({err:err.array()})
    }

    try {
        const coodA = await getCorsArray(origin);
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

            return res.json({
                distance: `${distanceInKm} km ${remainingMeters} m`,
                duration: `${days} days ${hours} hrs ${minutes} min`,
            });
    } catch (error) {
        console.log(error.message)
        return res.json({err : error.message})
    }


    
}





// function temp(){
//     try {
//         // console.log(origin , destination)
//         const res1 = await getCorsArray(origin)
//         const res2 = await getCorsArray(destination)
//         // console.log(res1 , res2)
    
//         console.log("befotre")
//         const response = await directionsClient
//             .getDirections({
//                 profile: 'driving', 
//                 waypoints: [
//                     { coordinates: res1 }, 
//                     { coordinates: res2 } // Destination coordinates [longitude, latitude]
//                 ],
//                 geometries: 'geojson' // Return geometry in GeoJSON format (optional)
//             })
//             .send();
    
//             console.log("after")
    
//         // Extract relevant data
//         const route = response.body.routes[0];
//         const distanceInMeters = route.distance; // Distance in meters
//         const durationInSeconds = route.duration; // Duration in seconds
    
//         console.log('Distance (meters):', distanceInMeters);
//         console.log('Duration (seconds):', durationInSeconds);
    
//         return {
//             distance: (distanceInMeters / 1000).toFixed(2) + ' km',
//             duration: (durationInSeconds / 60).toFixed(2) + ' minutes',
//         };
//     } catch (error) {
//         console.error('Error fetching directions:', error.message);
//         throw error;
//     }
// }