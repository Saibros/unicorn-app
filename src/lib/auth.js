import { useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import alert from 'react-native-simple-alert';
import TrackPlayer from 'react-native-track-player';
import { useNavigation } from './nav';
import { useApi } from './api';
import { useAuthContext } from './context';
import { STORAGE_KEY } from './constants';

export const useAuth = () => {
  const navigation = useNavigation();
  const { authState, setAuthState } = useAuthContext();
  const [loginState, callLogin] = useApi('auth/login');
  const [signupState, callSignup] = useApi('auth/signup');

  const login = async ({ email, password }) => {
    const result = await callLogin({ data: { email, password } });
    if (!result.isError && !result.payload.error) {
      const { token, name } = result.payload;
      if (token) {
        setAuthState({ token, name, isLoaded: true });
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ token, name }));
        navigation.navigate('App');
      }
    }
    return Promise.resolve(result);
  };

  const logout = async () => {
    setAuthState({ token: null, name: null, isLoaded: true });
    await TrackPlayer.pause();
    await TrackPlayer.seekTo(0);
    await AsyncStorage.removeItem(STORAGE_KEY);
    alert.show('Logged out', 'You got logged out!');
    navigation.navigate('Auth');
  };

  const signup = async ({ email, password, name }) => {
    const result = await callSignup({ data: { email, password, name } });
    if (!result.isError && !result.payload.error) {
      const { token } = result.payload;
      if (token) {
        setAuthState({ token, name, isLoaded: true });
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ token, name }));
        navigation.navigate('App');
      }
    }
    return Promise.resolve(result);
  };

  return {
    login,
    loginState,
    logout,
    signup,
    signupState,
    isAuthenticated: !!authState.token,
    isLoaded: authState.isLoaded,
    name: authState.name,
  };
};

export const useAuthEffect = () => {
  const { isAuthenticated, isLoaded } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    if (isLoaded) {
      navigation.navigate(isAuthenticated ? 'App' : 'Auth');
    }
  }, [isLoaded, isAuthenticated]);
};
