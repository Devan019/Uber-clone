const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    fullname : {
        fname : {
            type : String,
            required : true,
            minlength: [3 , "first name has minimunm 3 chars required"]
        },
        lname : {
            type : String,
            minlength: [3 , "last name has minimunm 3 chars required"]
        },
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password:{
        type : String,
        required : true,
        select : false
    },
    socketId : {
        type : String
    }
})

userSchema.methods.getAuthToken = function(){
    return jwt.sign( {id : this._id} ,`${process.env.TOKEN_SECRET}` , {
        expiresIn : '24h'
    } )
}

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password , this.password)
}

userSchema.statics.getHashed = async function (password){
    return await bcrypt.hash(password , 10);
}

module.exports = new mongoose.model('user',userSchema);