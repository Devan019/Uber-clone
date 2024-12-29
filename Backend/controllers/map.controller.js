const { getCorrinates } = require("../services/map.service");

module.exports.sendCoordinates = async (req,res) => {
    try {
        const {addresh} = req.body;
        const coors = await getCorrinates({addresh})
        return res.json(coors)
    } catch (error) {
        return res.json(error);
    }
}