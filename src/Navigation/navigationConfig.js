import { StyleSheet } from 'react-native';
import colors from 'src/themes/colors';

const defaultHeaderConfig = () => ({
  headerStyle: s.headerStyle,
  headerTitleStyle: s.headerTitleStyle,
});

export const defaultCardConfig = {
  defaultNavigationOptions: defaultHeaderConfig,
  headerLayoutPreset: 'center',
  cardStyle: { backgroundColor: colors.background },
};

const s = StyleSheet.create({
  headerStyle: {
    borderBottomWidth: 0,
    elevation: 0,
    zIndex: 3,
    backgroundColor: colors.background,
  },
  headerTitleStyle: {
    fontWeight: '700',
    fontSize: 20,
    textAlign: 'center',
    color: colors.brand,
  },
});
