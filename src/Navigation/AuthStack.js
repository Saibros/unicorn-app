import { createStackNavigator } from 'react-navigation';

import SignUpScreen from 'src/screens/SignUpScreen';
import LoginScreen from 'src/screens/LoginScreen';
import { defaultCardConfig } from './navigationConfig';

const AuthStack = createStackNavigator(
  {
    SignUp: {
      screen: SignUpScreen,
      navigationOptions: () => ({
        title: 'Unicorn',
        headerBackTitle: 'Back',
      }),
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: () => ({
        title: 'Unicorn',
      }),
    },
  },
  defaultCardConfig,
);

export default AuthStack;
