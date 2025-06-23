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
        } catch (error) { }


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
        io.to(userSocketId).emit('reciveRideRequest', { name, ride, IAmSocketId })
      })

      

      // Handle ride status updates
      socket.on('update-ride-status', (data) => {
        const { rideId, status, captainId, userId } = data;

        // Broadcast status update to all participants in the ride
        io.to(`ride-${rideId}`).emit('ride-status-update', {
          rideId: rideId,
          status: status,
          timestamp: new Date()
        });


      });

      socket.on('startRideNotification', (data) => {
        const { userScoketId, ride } = data;
        console.log('startRideNotification', data);
        io.to(userScoketId).emit('sendStartRideNotification', {
          ride: ride,
        });
      })

      // Handle ride start
      socket.on('start-ride', (data) => {
        const { rideId, captainId, userId } = data;

        io.to(`ride-${rideId}`).emit('ride-started', {
          rideId: rideId,
          captainId: captainId,
          startTime: new Date()
        });


      });

      // Handle ride completion
      socket.on('complete-ride', (data) => {
        const { rideId, captainId, userId, endLocation } = data;

        io.to(`ride-${rideId}`).emit('ride-completed', {
          rideId: rideId,
          endLocation: endLocation,
          endTime: new Date()
        });

      });

      // Handle captain arrival at pickup
      socket.on('captain-arrived-pickup', (data) => {
        const { rideId, captainId, location } = data;

        io.to(`ride-${rideId}`).emit('captain-arrived-pickup', {
          rideId: rideId,
          captainId: captainId,
          location: location,
          timestamp: new Date()
        });

      });

      // Handle emergency or panic button
      socket.on('emergency-alert', (data) => {
        const { rideId, userId, location, message } = data;

        // Broadcast emergency to all relevant parties
        io.to(`ride-${rideId}`).emit('emergency-alert', {
          rideId: rideId,
          userId: userId,
          location: location,
          message: message,
          timestamp: new Date()
        });

      });

      // Handle disconnect
      socket.on('disconnect', async () => {
        console.log('User disconnected:', socket.id);

        try {
          // Update user/captain socketId to null on disconnect
          await User.updateOne({ socketId: socket.id }, { socketId: null });
          await Captain.updateOne({ socketId: socket.id }, { socketId: null });
        } catch (error) {
          console.log('Error on disconnect:', error);
        }
      });

    } catch (error) {
      console.log(error)
    }

  })

}

