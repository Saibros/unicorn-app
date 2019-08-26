import React, { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import { STORAGE_KEY } from './constants';

const AuthContext = createContext();

const useAuthState = () => useState({
  token: null,
  name: null,
  isLoaded: false,
});

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useAuthState();
  const value = { authState, setAuthState };

  useEffect(() => {
    const getSavedToken = async () => {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      console.log('data', data);
      setAuthState({ ...JSON.parse(data), isLoaded: true });
    };
    getSavedToken();
  }, [setAuthState]);

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.element,
};

export const useAuthContext = () => useContext(AuthContext);
