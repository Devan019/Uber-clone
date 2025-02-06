const { Server } = require('socket.io');
const User = require('./models/user.model');
const Captain = require('./models/captain.model');

let io;

module.exports.socketInit = (server) => {
  // console.dir(server)
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  })

  io.on('connection', (socket) => {
    // console.log(`connection successfully : ${socket.id}`)

    try {
      socket.on('join', async (data) => {
        const { id, type } = data;
        console.log(data, " in")

        try {
          if (type === 'captain') {
            const captain = await Captain.findById(id)
            captain.socketId = socket.id
            await captain.save()
          } else if (type === 'user') {
            const user = await User.findById(id)
            user.socketId = socket.id
            await user.save()
          }
        } catch (error) {}


      })

      socket.on('update-captain-location', async (data) => {
        // console.log(data)
        const { id, location } = data
        const captain = await Captain.findById(id)
        captain.location = {
          type: 'Point',
          coordinates: [location.lng, location.ltd]
        }
       
        await captain.save()
        
      })

    } catch (error) {
      console.log(error)
    }

  })

}

