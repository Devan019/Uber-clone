const mapbox = require('@mapbox/mapbox-sdk/services/geocoding');
const client = mapbox({ accessToken: process.env.MAPBOX_API_TOKEN });
const Captain = require('../models/captain.model');
const mongoose = require('mongoose')


module.exports.getCorrinates = async(addresh) => {
    
    
   const result = await client.forwardGeocode({
    query : addresh,
    limit  : 1,
   }).send();


   const coordinates = result.body.features[0].geometry.coordinates;
   const ans = {
    lng : coordinates[0],
    ltd : coordinates[1]
   }

   return ans;
     
}

module.exports.getCorsArray = async(addresh) => {
    // console.log("in fun " , addresh)
    const result = await client.forwardGeocode({
        query : addresh,
        limit  : 1,
        // countries: ['IN'],
       }).send()

    //    console.log(result)
          
       const coordinates = result.body.features[0].geometry.coordinates;
    //    console.log(coordinates)
       return coordinates;
         
    
}

module.exports.getAllPlaces = async(addresh) => {
   const result = await client.forwardGeocode({
      query : addresh,
      limit  : 6,
      autocomplete: true,
      types: ['place', 'locality', 'address'],
      countries: ['IN'],
     }).send()

     return result;
}

module.exports.getNearCaptains = async({lng,ltd}) => {  

   console.log("in nera ", ltd,lng)


      const captains = await Captain.find({
         location : {
               $near : {
                  $geometry : {
                     type : "Point",
                     coordinates : [Number(lng),Number(ltd)]
                  },
                  $maxDistance : 10000
               }
         }
      })

      console.log(captains)
   
      return captains;
}