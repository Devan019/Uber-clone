const Captain = require('../models/captain.model');
const axios = require('axios')

module.exports.getCorrinates = async (address) => {
   const api = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.GOOGLE_API_KEY}`);
   if (api.data.results.length === 0) {
      return null; // or handle the error as needed
   }
   if (api.data.results[0].geometry.location === undefined) {
      return null; // or handle the error as needed
   }
   const location = api.data.results[0].geometry.location;
   const ans = {
      lng: location.lng,
      ltd: location.lat
   };

   return ans;
}

module.exports.getCorsArray = async (address) => {
   const api = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.GOOGLE_API_KEY}`);
   if (api.data.results.length === 0) {
      return null; // or handle the error as needed
   }
   const location = api.data.results[0].geometry.location;
   const coordinates = [location.lng, location.lat];
   return coordinates;
}



module.exports.getNearCaptains = async ({ lng, ltd },vechicleType) => {  

   const allCaptains = await Captain.find({});
   const myLocation = { lng, lat: ltd }; // fixed key name for clarity

   const nearbyCaptains = allCaptains.filter(captain => {
      if (!captain.location || !captain.location.coordinates) return false;
      if (captain.vehicle.type  !== vechicleType) return false; 
      if (captain.status !== 'active') return false; 
      const [capLng, capLat] = captain.location.coordinates;

      return isCaptainNearby(myLocation.lat, myLocation.lng, capLat, capLng , 5);
   });

   return nearbyCaptains;
}

function isCaptainNearby(lat1, lon1, lat2, lon2, maxDistanceKm = 5) {
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

    return distance <= maxDistanceKm;
}

module.exports.convertCordinatesToAddress = async (ltd, lng) => {
   const api = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${ltd},${lng}&key=${process.env.GOOGLE_API_KEY}`)
   const address = api.data.results[0].formatted_address;
   return address;
}