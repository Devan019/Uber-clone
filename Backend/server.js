const app = require("./app")
const http = require('http')

const server = http.createServer(app);

server.listen(3000 , () => {
 console.log(`http://localhost:3000`); 
}
);