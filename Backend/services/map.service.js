const mapbox = require('@mapbox/mapbox-sdk/services/geocoding');
const client = mapbox({ accessToken: process.env.MAPBOX_API_TOKEN });

module.exports.getCorrinates = async({addresh}) => {
    
    
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
