import AsyncStorage from '@react-native-community/async-storage';

import { MOCK_STORAGE_KEY } from './constants';

const delay = (value, ms = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms, value));

const getUser = async (email) => {
  const data = await AsyncStorage.getItem(MOCK_STORAGE_KEY);
  const users = JSON.parse(data) || [];
  return Promise.resolve(users.find(u => u.email === email));
};

export const mockApiCall = async (endpoint, data) => {
  switch (endpoint) {
    case 'auth/login':
      const loginUser = await getUser(data.email);
      const { name, password } = loginUser || {};
      return delay({
        token: loginUser ? 'testToken123' : null,
        name,
        error: data.password !== password ?
          'Invalid email or password' : null,
      });
    case 'auth/signup':
      const signupUser = await getUser(data.email);
      if (signupUser) {
        return delay({
          token: null,
          name: null,
          error: 'An account with this email already exists.',
        });
      }
      const mockData = await AsyncStorage.getItem(MOCK_STORAGE_KEY);
      const users = JSON.parse(mockData) || [];
      await AsyncStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(users.concat({
        email: data.email,
        password: data.password,
        name: data.name,
      })));
      return delay({ token: 'testToken123', name: data.name });
    default:
      return delay({});
  }
};
