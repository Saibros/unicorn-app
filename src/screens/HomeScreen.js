import React, { useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { useAuth } from 'src/lib/auth';
import TrackPlayer from 'src/components/TrackPlayer';
import Button from 'src/components/Button';
import RouteContainer from 'src/components/RouteContainer';
import colors from 'src/themes/colors';

export default () => {
  const { logout, name } = useAuth();
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <RouteContainer>
      <Text style={s.subtitle}>Welcome {name} to 🦄 paradise!</Text>
      <TrackPlayer />
      <Button style={s.button} text="Logout" onPress={logout} />
    </RouteContainer>
  );
};

const s = StyleSheet.create({
  subtitle: {
    textAlign: 'center',
    color: colors.brand,
    fontSize: 18,
    marginTop: 20,
  },
  button: {
    marginHorizontal: 20,
  },
});
