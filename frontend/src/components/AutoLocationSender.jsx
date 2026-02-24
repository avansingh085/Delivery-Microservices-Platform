import React, { useEffect, useState } from 'react';
import { Error, Success } from '../utils/toast';

const AutoLocationSender = () => {
  const [status, setStatus] = useState('Waiting for permission...');

  useEffect(() => {

    if (!navigator.geolocation) {
      Error('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
       
        Success('Permission granted. Sending to server...');
        
        const payload = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        try {
        
          
          setStatus('Location sent successfully in the background.');
        } catch (error) {
          setStatus('Failed to send location to server.');
        }
      },
      (err) => {
      
        if (err.code === err.PERMISSION_DENIED) {
          Error('User denied location access.');
        } else {
          Error('Unable to retrieve location.');
        }
      }
    );
  }, []); 

  return (
    <>
     
    </>
  );
};

export default AutoLocationSender;