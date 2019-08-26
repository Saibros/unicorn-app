import React, { useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { useAuth } from 'src/lib/auth';
import { useNavigation } from 'src/lib/nav';
import KeyboardScrollView from 'src/components/KeyboardScrollView';
import RouteContainer from 'src/components/RouteContainer';
import SignUpForm from './SignUpForm';
import Button from 'src/components/Button';
import colors from 'src/themes/colors';

export default () => {
  const { signup } = useAuth();
  const { navigate } = useNavigation();
  const handleSignup = (values, actions) => signup(values);
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <RouteContainer style={s.container}>
      <KeyboardScrollView>
        <Text style={s.titleText}>Wanna join?</Text>
        <Text style={s.subtitleText}>Join Unicorn and check it for yourself</Text>
        <SignUpForm onSubmit={handleSignup} />
        <Text style={s.orText}>or</Text>
        <Button text="Login" isLight onPress={() => navigate('Login')} />
      </KeyboardScrollView>
    </RouteContainer>
  );
};

const s = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flexGrow: 1,
  },
  titleText: {
    textAlign: 'center',
    color: colors.brand,
    fontSize: 30,
    fontWeight: '700',
    marginTop: 30,
    marginBottom: 6,
  },
  subtitleText: {
    textAlign: 'center',
    color: colors.brand,
    fontSize: 12,
    marginBottom: 30,
  },
  orText: {
    color: colors.brand,
    fontSize: 12,
    textAlign: 'center',
    marginVertical: 14,
  },
});
