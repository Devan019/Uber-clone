const mongoose = require('mongoose')

const RideSchema = new mongoose.Schema({
    user : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : "User",
        required : true
    },

    captain : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : "Captain",
    },

    pickup : {
        type : String,
        required : true
    },
    destination : {
        type : String,
        required : true
    },

    fare : {
        type : Number,
        required : true
    },
    distance : Number,
    duration : Number,

    status : {
        type : String,
        enum : ['pending' , 'completed' , 'ongoing' , 'cancelled','accepted'],
        default : 'pending'
    },

    paymentId : String,
    orderId : String,
    signature : String,

    otp : {
        type : String,
        select : false
    }

})

module.exports = new mongoose.model("Ride" , RideSchema);