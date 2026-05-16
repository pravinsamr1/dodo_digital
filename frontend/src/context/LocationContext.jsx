import React, { createContext, useContext, useEffect, useState, useRef } from 'react';

const LocationContext = createContext(null);

export const LocationProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState('');
  const [coords, setCoords] = useState(null);
  const [isLocationLoading, setIsLocationLoading] = useState(true);
  
  // Track unmount status to prevent state updates on unmounted component
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;

    if (!navigator.geolocation) {
      setIsLocationLoading(false);
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      async (position) => {
        const { latitude, longitude, accuracy } = position.coords;

        // EXTRA PRECISION CHECK: Reject the data if accuracy radius is worse than 150 meters
        // You can adjust this threshold (in meters) based on your needs.
        if (accuracy > 150) {
          console.log(`Skipping update: Accuracy too low (${accuracy}m)`);
          return; 
        }

        if (isMounted.current) {
          setCoords({ latitude, longitude, accuracy });
        }

        try {
          // Changed zoom to 18 for house/building level precision
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
          );

          const data = await response.json();
          console.log('Detailed Location address:', data.address);

          // Highly precise fields if available
          const building = data.address?.building || data.address?.amenity || '';
          const road = data.address?.road || '';
          
          const city =
            data.address?.city ||
            data.address?.municipality ||
            data.address?.town ||
            data.address?.county ||
            data.address?.village ||
            'Chennai';

          const area =
            data.address?.neighbourhood ||
            data.address?.suburb ||
            data.address?.residential ||
            data.address?.quarter ||
            data.address?.hamlet ||
            data.address?.village ||
            data.address?.city_district ||
            '';

          const normalizedArea = area
            ?.replace(/\bGreater Chennai Corporation\b/gi, '')
            ?.replace(/\bChennai district\b/gi, '')
            ?.replace(/\s+/g, ' ')
            ?.trim();

          // Construct a much more precise address string if road details exist
          let preciseStreet = normalizedArea;
          if (road) {
            preciseStreet = building ? `${building}, ${road}` : road;
            if (normalizedArea && !building.includes(normalizedArea)) {
              preciseStreet = `${preciseStreet}, ${normalizedArea}`;
            }
          }

          const formattedLocation = preciseStreet
            ? `${preciseStreet}, ${city}`
            : city;

          if (isMounted.current) {
            setUserLocation(formattedLocation || '');
          }
        } catch (error) {
          if (isMounted.current) setUserLocation('Chennai, India');
        } finally {
          if (isMounted.current) setIsLocationLoading(false);
        }
      },
      () => {
        if (isMounted.current) {
          setUserLocation('Chennai, India');
          setIsLocationLoading(false);
        }
      },
      {
        enableHighAccuracy: true, // Asks device to use GPS hardware if available
        timeout: 15000,           // Increased slightly to give hardware time to find a lock
        maximumAge: 0,            // Force it to get a fresh location, not a cached one
      }
    );

    return () => {
      isMounted.current = false;
      navigator.geolocation.clearWatch(watchId);
    };
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