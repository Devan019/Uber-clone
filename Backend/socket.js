const { Server } = require('socket.io');
const User = require('./models/user.model');
const Captain = require('./models/captain.model');

let io;

module.exports.socketInit = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  })

  io.on('connection', (socket) => {

    try {
      socket.on('join', async (data) => {
        const { id, type } = data;

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
        const { id, location } = data
        const captain = await Captain.findById(id)
        captain.location = {
          type: 'Point',
          coordinates: [location.lng, location.ltd]
        }
       
        await captain.save()
        
      })

      //send ride request to captain or  user
      socket.on('sendForRide', ({ name, ride, userSocketId, IAmSocketId }) => {
        console.log('sendForRide', name, ride, userSocketId, IAmSocketId)
        io.to(userSocketId).emit('reciveRideRequest', {name, ride, IAmSocketId})
      })

    } catch (error) {
      console.log(error)
    }

  })

}

