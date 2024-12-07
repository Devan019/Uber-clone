const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const captainSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique : true,
        minlength: [5, 'Email must be at least 5 characters'],
        lowercase: true,
        match: [ /^\S+@\S+\.\S+$/, 'Please enter a valid email' ]
    },
    fullname: {
        fname: {
            type: String,
            required: [true, 'First name is required'],
            minlength: [2, 'First name must be at least 2 characters']
        },
        lname: {
            type: String,
            minlength: [2, 'Last name must be at least 2 characters']
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        select : false,
        minlength: [6, 'Password must be at least 6 characters']
    },
    socketid : {
        type : String
    },
    vehicle: {
        color: {
            type: String,
            required : [true, 'Color is required'],
            minlength: [3, 'Color must be at least 3 characters']
        },
        plate: {
            type: String,
            required : [true, 'Plate is required'],
            minlength: [5, 'Plate must be at least 5 characters']
        },
        capacity: {
            type: Number,
            required : [true, 'Capacity is required'],
            minlength: [1, 'Capacity must be at least 1']
        },
        type: {
            type: String,
            required : true,
            enum: ['auto', 'car', 'motorcycle']
        }
    },
    location : {
        ltd : {
            type : Number
        },
        lang : {
            type : Number
        }
    },
    status:{
        type : String,
        default : "inactive",
        enum : ['inactive' , 'active']
    }

})

captainSchema.statics.getHash = async function(password){
    return await bcrypt.hash(password , 10)

}

captainSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password , this.password);
}

captainSchema.methods.getAuthToken = function(){
    return jwt.sign( {id : this._id} , `${process.env.TOKEN_SECRET}`,{
        expiresIn : '24h'
    })
}

module.exports = new mongoose.model('Captain' , captainSchema)