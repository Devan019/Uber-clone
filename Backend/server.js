const app = require("./app")
const http = require('http')
require('dotenv').config();
const server = http.createServer(app);

const connection = require('./db/db.connection');

connection()
const port = 4000 || process.env.PORT
server.listen(port , () => {
 console.log(`http://localhost:${port}`); 
}
);