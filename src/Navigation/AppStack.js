import { createStackNavigator } from 'react-navigation';

import HomeScreen from 'src/screens/HomeScreen';
import { defaultCardConfig } from './navigationConfig';

const AppStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: () => ({
        title: 'Unicorn',
      }),
    },
  },
  defaultCardConfig,
);

export default AppStack;
