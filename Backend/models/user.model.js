const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullname : {
        fname : {
            type : String,
            required : true,
            minLength: [3 , "minimunm 3 chars required"]
        },
        fname : {
            type : String,
            minLength: [3 , "minimunm 3 chars required"]
        },
    },
    email : {
        type : String,
        required : true
    },
    password:{
        type : String,
        required : true,
        selected : false
    },
    socketId : {
        type : String
    }
})

userSchema.methods.get