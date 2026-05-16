import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

const AuthModalContext = createContext(null);

export const AuthModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pendingSchoolId, setPendingSchoolId] = useState(null);
  const navigate = useNavigate();

  const openLoginModal = useCallback((schoolId = null) => {
    if (isAuthenticated()) {
      if (schoolId) {
        navigate(`/schools/${schoolId}`);
      }
      return;
    }
    setPendingSchoolId(schoolId);
    setIsOpen(true);
  }, [navigate]);

  const closeLoginModal = useCallback(() => {
    setIsOpen(false);
    setPendingSchoolId(null);
  }, []);

  const value = useMemo(
    () => ({
      isOpen,
      pendingSchoolId,
      openLoginModal,
      closeLoginModal,
    }),
    [isOpen, pendingSchoolId, openLoginModal, closeLoginModal]
  );

  return (
    <AuthModalContext.Provider value={value}>{children}</AuthModalContext.Provider>
  );
};

export const useAuthModal = () => {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error('useAuthModal must be used within AuthModalProvider');
  }
  return context;
};
