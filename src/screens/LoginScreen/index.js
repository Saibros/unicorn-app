import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useAuth } from 'src/lib/auth';
import KeyboardScrollView from 'src/components/KeyboardScrollView';
import RouteContainer from 'src/components/RouteContainer';
import colors from 'src/themes/colors';
import LoginForm from './LoginForm';

export default () => {
  const { login } = useAuth();
  const handleLogin = (values, actions) => login(values);
  return (
    <RouteContainer style={s.container}>
      <KeyboardScrollView>
        <Text style={s.title}>Log in</Text>
        <LoginForm onSubmit={handleLogin} />
      </KeyboardScrollView>
    </RouteContainer>
  );
};

const s = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flexGrow: 1,
  },
  title: {
    textAlign: 'center',
    color: colors.brand,
    fontSize: 30,
    fontWeight: '700',
    marginTop: 30,
    marginBottom: 30,
  },
});
