const mapbox = require('@mapbox/mapbox-sdk/services/geocoding');
const client = mapbox({ accessToken: process.env.MAPBOX_API_TOKEN });
const Captain = require('../models/captain.model');
const mongoose = require('mongoose')

const createLocationIndex = async () => {
   try {
       console.log("Creating index...");
       // Use the actual collection name 'captainsTree' instead of default 'captains'
       await mongoose.connection.collection('Captain').createIndex({ "location": "2dsphere" });
       console.log("Index created successfully");
   } catch (error) {
       console.error("Error creating index:", error);
       throw error;
   }
};

module.exports.getCorrinates = async(addresh) => {
    
    
   const result = await client.forwardGeocode({
    query : addresh,
    limit  : 1,
   }).send();


   const coordinates = result.body.features[0].geometry.coordinates;
   const ans = {
    ltd : coordinates[0],
    lng : coordinates[1]
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

module.exports.getNearCaptains = async({ltd,lng}) => {  

   console.log("in nera ", ltd,lng)

   // await createLocationIndex();

      const captains = await Captain.find({
         location : {
               $near : {
                  $geometry : {
                     type : "Point",
                     coordinates : [Number(ltd),Number(lng)]
                  },
                  $maxDistance : 10000
               }
         }
      })

      console.log(captains)
   
      return captains;
}