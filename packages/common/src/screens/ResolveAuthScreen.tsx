import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

export default ({ navigation }) => {
  const { state, tryToLogin } = useContext(AuthContext);
  const { isLoading, isSignedIn } = state;

  useEffect(() => {
    const login = async () => {
      await tryToLogin();
      if (!isSignedIn) {
        navigation.navigate('/');
      }
    };
    login();
  }, []);

  if (isSignedIn) {
    navigation.navigate('/board');
  }

  return null;
};
