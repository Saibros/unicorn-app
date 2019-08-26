import {
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';

import LoadingScreen from 'src/screens/LoadingScreen';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { defaultCardConfig } from './navigationConfig';

const Navigation = createAppContainer(createSwitchNavigator(
  {
    Loading: LoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Loading',
    ...defaultCardConfig,
  },
));

export default Navigation;
