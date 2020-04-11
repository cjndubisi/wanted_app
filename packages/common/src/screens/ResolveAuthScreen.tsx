import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

export default () => {
  const { state, tryToLogin } = useContext(AuthContext);
  const { isLoading, isSignedIn } = state;

  useEffect(() => {
    const login = async () => {
      await tryToLogin();
      if (!isSignedIn) {
        // navigate to splash
      }
    };
    login();
  }, []);

  if (isSignedIn) {
    // navigate home
  }

  return null;
};
