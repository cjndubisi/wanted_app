import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

export default ({ navigation }) => {
  const { state, tryToLogin } = useContext(AuthContext);
  const { isSignedIn } = state;

  useEffect(() => {
    const login = async () => {
      const didSignin = await tryToLogin();
      if (!didSignin) {
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
