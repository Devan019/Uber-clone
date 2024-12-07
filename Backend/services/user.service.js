const userModel = require('../models/user.model');

module.exports.createUser = async({
    fullname  , email , password
}) => {
    if(!fullname.fname || !email || !password) {
        throw new Error('Missing required fields: fname, email, or password');
    }
    const hashpassword = await userModel.getHashed(password);
    const newuser = new userModel({
        fullname:{
            fname : fullname.fname,
            lname : fullname.lname
        },
        email,
        password : hashpassword
    })
    const User = await newuser.save();

    return User;
}
