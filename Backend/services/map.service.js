const mapBox = require('mapbox');
const client = new mapBox(process.env.MAPBOX_ID);

module.exports.getCorrinates = async({addresh}) => {
    return new Promise(async(reslove,resject) => {
        client.geocodeForward(addresh, function(err, data, result) {
            const geo = result.entity;
            const geometry = geo.features[0].geometry;
            reslove({
                ltd : geometry.coordinates[1],
                lng : geometry.coordinates[0]
            });
          });
    })
      
     
}


