import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

const AuthModalContext = createContext(null);

export const AuthModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pendingSchoolId, setPendingSchoolId] = useState(null);

  const openLoginModal = useCallback((schoolId = null) => {
    setPendingSchoolId(schoolId);
    setIsOpen(true);
  }, []);

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
