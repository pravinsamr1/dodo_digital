import React, { createContext, useContext, useEffect, useState } from 'react';

const LocationContext = createContext(null);

export const LocationProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState('Chennai, India');
  const [coords, setCoords] = useState(null);
  const [isLocationLoading, setIsLocationLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setIsLocationLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ latitude, longitude });

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
          );

          const data = await response.json();

          const area =
            data.address?.suburb ||
            data.address?.neighbourhood ||
            data.address?.quarter ||
            data.address?.city_district ||
            data.address?.town ||
            data.address?.village;

          const city =
            data.address?.city ||
            data.address?.town ||
            data.address?.village ||
            data.address?.state_district;

          setUserLocation(area && city ? `${area}, ${city}` : 'Exact location unavailable');
        } catch (error) {
          setUserLocation('Chennai, India');
        } finally {
          setIsLocationLoading(false);
        }
      },
      () => {
        setUserLocation('Chennai, India');
        setIsLocationLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  return (
    <LocationContext.Provider value={{ coords, isLocationLoading, userLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useUserLocation = () => {
  const context = useContext(LocationContext);

  if (!context) {
    throw new Error('useUserLocation must be used inside LocationProvider');
  }

  return context;
};
