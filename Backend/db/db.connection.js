const mongoose = require('mongoose');

async function connection() {
    await mongoose.connect(process.env.DB_CONNECTION)
}

connection()
.then(()=>{console.log("connect succesfully with db")})
.catch((err)=>{console.log(err)})

module.exports = connection