import React, { useContext, useRef, useState, useEffect } from 'react'
import {RideCon} from '../context/RideContext';
import { MySocketContext } from '../context/SocketContext';
import { useNavigate } from 'react-router-dom';

const Ride = () => {

  const navigate = useNavigate();
  // console.log(navigate.state);


  const googleMapRef = useRef(null);
  const pickupCenter = useRef(null);
  const destinationCenter = useRef(null);
  const captainCenter = useRef(null);
  const map = useRef(null);
  const vechicalImage = useRef(null);

  const pickupMarker = useRef(null);
  const destinationMarker = useRef(null);
  const captainMarker = useRef(null);

  const userScoketId = useRef(null);
  const rideData = useRef(null);
  const captainScoketId = useRef(null);

  const {ride} = useContext(RideCon);
  if(!ride) return <div>Loading...</div>;
  const { socket, sendMessage, reciveMessage } = useContext(MySocketContext);

  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Initialize Google Map
  const initializeMap = () => {
    if (!window.google || !pickupCenter.current) return;

    const mapOptions = {
      center: {
        lat: pickupCenter.current.lat,
        lng: pickupCenter.current.lng
      },
      zoom: 13,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false
    };

    map.current = new window.google.maps.Map(googleMapRef.current, mapOptions);
    setIsMapLoaded(true);
  };

  // Create markers
  const createMarkers = () => {
    if (!map.current || !window.google) return;

    // Pickup marker (user location)
    if (pickupCenter.current) {
      pickupMarker.current = new window.google.maps.Marker({
        position: {
          lat: pickupCenter.current.lat,
          lng: pickupCenter.current.lng
        },
        map: map.current,
        title: "Pickup Location",
        icon: {
          url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='%2300ff00'%3E%3Cpath d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'/%3E%3C/svg%3E",
          scaledSize: new window.google.maps.Size(40, 40)
        }
      });
    }

    // Destination marker
    if (destinationCenter.current) {
      destinationMarker.current = new window.google.maps.Marker({
        position: {
          lat: destinationCenter.current.lat,
          lng: destinationCenter.current.lng
        },
        map: map.current,
        title: "Destination",
        icon: {
          url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='%23ff0000'%3E%3Cpath d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'/%3E%3C/svg%3E",
          scaledSize: new window.google.maps.Size(40, 40)
        }
      });
    }

    // Captain marker (vehicle)
    if (captainCenter.current) {
      const vehicleIcon = vechicalImage.current || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='%230000ff'%3E%3Cpath d='M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z'/%3E%3C/svg%3E";

      captainMarker.current = new window.google.maps.Marker({
        position: {
          lat: captainCenter.current.lat,
          lng: captainCenter.current.lng
        },
        map: map.current,
        title: "Captain Location",
        icon: {
          url: vehicleIcon,
          scaledSize: new window.google.maps.Size(40, 40)
        }
      });
    }

    // Fit map to show all markers
    const bounds = new window.google.maps.LatLngBounds();
    if (pickupCenter.current) bounds.extend(new window.google.maps.LatLng(pickupCenter.current.lat, pickupCenter.current.lng));
    if (destinationCenter.current) bounds.extend(new window.google.maps.LatLng(destinationCenter.current.lat, destinationCenter.current.lng));
    if (captainCenter.current) bounds.extend(new window.google.maps.LatLng(captainCenter.current.lat, captainCenter.current.lng));
    
    map.current.fitBounds(bounds);
  };

  // Update captain location
  const updateCaptainLocation = (newLocation) => {
    if (captainMarker.current && newLocation) {
      captainMarker.current.setPosition({
        lat: newLocation.lat,
        lng: newLocation.lng
      });
      captainCenter.current = newLocation;
    }
  };

  // Socket event listeners for live tracking
  useEffect(() => {
    if (socket && userScoketId.current) {
      // Join ride room
      sendMessage('join-ride', {
        rideId: rideData.current?._id,
        socketId: userScoketId.current
      });

      // Listen for captain location updates
      reciveMessage('captain-location-update', (data) => {
        console.log('Captain location updated:', data);
        updateCaptainLocation(data.location);
      });

      // Listen for ride status updates
      reciveMessage('ride-status-update', (data) => {
        console.log('Ride status updated:', data);
        // Handle ride status changes (started, completed, etc.)
      });

      // Send user's current location if needed
      if (navigator.geolocation) {
        const watchId = navigator.geolocation.watchPosition(
          (position) => {
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            
            sendMessage('user-location-update', {
              rideId: rideData.current?._id,
              location: userLocation,
              socketId: userScoketId.current
            });
          },
          (error) => console.error('Geolocation error:', error),
          { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );

        return () => {
          navigator.geolocation.clearWatch(watchId);
        };
      }
    }

    return () => {
      if (socket) {
        socket.off('captain-location-update');
        socket.off('ride-status-update');
      }
    };
  }, [socket, userScoketId.current, rideData.current]);

  useEffect(() => {
    if (ride) {
      pickupCenter.current = ride.pickupCordinates;
      destinationCenter.current = ride.destinationCordinates;
      captainCenter.current = ride.waitCaptainCordinates;
      vechicalImage.current = ride.vehicleImg;

      userScoketId.current = ride.userScoketId;
      rideData.current = ride;
      captainScoketId.current = ride.captainScoketId;
      
    }
  },[ride])

  return (
    <div className="ride-container">
      <div className="ride-header">
        <h2>Live Ride Tracking</h2>
        <div className="ride-info">
          <p>Ride ID: {rideData.current?.id}</p>
          <p>Status: {rideData.current?.status || 'In Progress'}</p>
        </div>
      </div>
      
      <div 
        ref={googleMapRef} 
        className="google-map"
        style={{
          width: '100%',
          height: '400px',
          borderRadius: '8px',
          border: '2px solid #ddd'
        }}
      />
      
      <div className="ride-details">
        <div className="location-info">
          <div className="pickup-info">
            <span className="location-dot pickup"></span>
            <span>Pickup Location</span>
          </div>
          <div className="destination-info">
            <span className="location-dot destination"></span>
            <span>Destination</span>
          </div>
          <div className="captain-info">
            <span className="location-dot captain"></span>
            <span>Captain Location</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .ride-container {
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .ride-header {
          margin-bottom: 20px;
        }
        
        .ride-header h2 {
          margin: 0 0 10px 0;
          color: #333;
        }
        
        .ride-info p {
          margin: 5px 0;
          color: #666;
        }
        
        .ride-details {
          margin-top: 20px;
          padding: 15px;
          background: #f8f9fa;
          border-radius: 8px;
        }
        
        .location-info {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        
        .pickup-info, .destination-info, .captain-info {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .location-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }
        
        .location-dot.pickup {
          background-color: #00ff00;
        }
        
        .location-dot.destination {
          background-color: #ff0000;
        }
        
        .location-dot.captain {
          background-color: #0000ff;
        }
      `}</style>
    </div>
  );
};

export default Ride;