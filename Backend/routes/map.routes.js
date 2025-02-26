const { query } = require('express-validator');
const { sendCoordinates , getDistaceAndTime , getSuggestion } = require('../controllers/map.controller');
const {auth} = require('../middlewares/auth.middleware')
const route = require('express').Router();



route.post("/getNearCaptains" ,
    query('pickup').isString().isLength({min:6})
    , auth , sendCoordinates)

route.get("/getdis" , 
    query(('origin')),
    query(('destination'))
    , auth , getDistaceAndTime)

route.post("/getsuggestion" , 
    query(('addresh')),
    auth ,getSuggestion
)

// route.post("/getsuggestion" , (req,res) => {
//   res.json({
//     add : req.body
//   })
// }
// )

module.exports = route;