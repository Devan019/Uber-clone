const app = require("./app")
const http = require('http')
require('dotenv').config();
const server = http.createServer(app);

const connection = require('./db/db.connection');

connection()

server.listen(3000 , () => {
 console.log(`http://localhost:3000`); 
}
);