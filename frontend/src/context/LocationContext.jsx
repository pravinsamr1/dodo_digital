import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react';

const LocationContext = createContext(null);

const DEFAULT_LOCATIONS = [
  'Chennai, India',
];

export const LocationProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState(() => {
    const cached = sessionStorage.getItem('userLocation');
    // If it's a generic fallback or empty, leave it empty to trigger fetch
    return cached === 'Chennai, India' ? '' : (cached || '');
  });
  
  const [coords, setCoords] = useState(() => {
    const savedCoords = sessionStorage.getItem('userCoords');
    return savedCoords ? JSON.parse(savedCoords) : null;
  });
  
  const [isLocationLoading, setIsLocationLoading] = useState(() => {
    const cached = sessionStorage.getItem('userLocation');
    return !cached || cached === 'Chennai, India';
  });
  
  // Track unmount status to prevent state updates on unmounted component
  const isMounted = useRef(true);

  // Helper to get a random default location from the array if geo fails
  const getRandomDefaultLocation = () => {
    return DEFAULT_LOCATIONS[Math.floor(Math.random() * DEFAULT_LOCATIONS.length)];
  };

  const fetchLocation = useCallback((forceRefresh = false) => {
    if (!forceRefresh) {
      const cachedLoc = sessionStorage.getItem('userLocation');
      if (cachedLoc && cachedLoc !== 'Chennai, India') {
        if (isMounted.current) setIsLocationLoading(false);
        return;
      }
    } else {
      if (isMounted.current) setIsLocationLoading(true);
    }

    if (!navigator.geolocation) {
      if (isMounted.current) {
        const fallback = getRandomDefaultLocation();
        setUserLocation(fallback);
        sessionStorage.setItem('userLocation', fallback);
        setIsLocationLoading(false);
      }
      return;
    }

    const handleSuccess = async (position) => {
      const { latitude, longitude, accuracy } = position.coords;
      const newCoords = { latitude, longitude, accuracy };
      
      if (isMounted.current) {
        setCoords(newCoords);
        sessionStorage.setItem('userCoords', JSON.stringify(newCoords));
      }

      try {
        // Zoom 14-16 is good for suburbs/neighborhoods rather than exact buildings
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=14&addressdetails=1`
        );

        const data = await response.json();
        console.log('Neighborhood Location data:', data.address);
        
        const city =
          data.address?.city ||
          data.address?.municipality ||
          data.address?.state_district ||
          'Chennai';

        const area =
          data.address?.suburb ||
          data.address?.neighbourhood ||
          data.address?.town ||
          data.address?.residential ||
          data.address?.village ||
          data.address?.city_district ||
          '';

        const normalizedArea = area
          ?.replace(/\bGreater Chennai Corporation\b/gi, '')
          ?.replace(/\bChennai district\b/gi, '')
          ?.replace(/\s+/g, ' ')
          ?.trim();

        // Format strictly as "Neighborhood, City" (e.g., "Porur, Chennai")
        const formattedLocation = normalizedArea
          ? `${normalizedArea}, ${city}`
          : city;

        if (isMounted.current) {
          setUserLocation(formattedLocation || '');
          sessionStorage.setItem('userLocation', formattedLocation || '');
        }
      } catch (error) {
        if (isMounted.current) {
          const fallback = getRandomDefaultLocation();
          setUserLocation(fallback);
          sessionStorage.setItem('userLocation', fallback);
        }
      } finally {
        if (isMounted.current) setIsLocationLoading(false);
      }
    };

    const handleError = () => {
      if (isMounted.current) {
        const fallback = getRandomDefaultLocation();
        setUserLocation(fallback);
        sessionStorage.setItem('userLocation', fallback);
        setIsLocationLoading(false);
      }
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    });
  }, []);

  useEffect(() => {
    isMounted.current = true;
    fetchLocation();

    return () => {
      isMounted.current = false;
    };
  }, [fetchLocation]);

  return (
    <LocationContext.Provider value={{ coords, isLocationLoading, userLocation, refreshLocation: () => fetchLocation(true) }}>
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
