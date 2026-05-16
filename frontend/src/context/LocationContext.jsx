import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react';

const LocationContext = createContext(null);

export const LocationProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState(() => {
    const cached = sessionStorage.getItem('userLocation');
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
      if (isMounted.current) setIsLocationLoading(false);
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
          sessionStorage.setItem('userLocation', formattedLocation || '');
          }
        } catch (error) {
        if (isMounted.current) {
          setUserLocation('Chennai, India');
          sessionStorage.setItem('userLocation', 'Chennai, India');
        }
        } finally {
          if (isMounted.current) setIsLocationLoading(false);
        }
    };

    const handleError = () => {
        if (isMounted.current) {
          setUserLocation('Chennai, India');
        sessionStorage.setItem('userLocation', 'Chennai, India');
          setIsLocationLoading(false);
        }
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
        enableHighAccuracy: true, // Asks device to use GPS hardware if available
        timeout: 15000,           // Increased slightly to give hardware time to find a lock
        maximumAge: 0,            // Force it to get a fresh location, not a cached one
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