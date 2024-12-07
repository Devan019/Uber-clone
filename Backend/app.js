const express = require('express')
const cors = require('cors')
const userRoute = require('./routes/user.route');
const CaptainRoute = require('./routes/captain.route');
const cookieParser = require('cookie-parser');

const app = express()


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())



app.get("/",(req,res) => {
  res.send("hy guys!");
})

app.use("/users",userRoute)
app.use("/captains",CaptainRoute)

module.exports = app