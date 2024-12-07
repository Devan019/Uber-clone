const express = require('express')
const cors = require('cors')
const userRoute = require('./routes/user.route');

const app = express()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.get("/",(req,res) => {
  res.send("hy guys!");
}
)

app.use("/users",userRoute)

module.exports = app