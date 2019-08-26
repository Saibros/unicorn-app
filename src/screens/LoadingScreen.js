import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import colors from 'src/themes/colors';
import { useAuthEffect } from 'src/lib/auth';

export default () => {
  useAuthEffect();
  return (
    <View style={s.container}>
      <ActivityIndicator size="large" color={colors.brand} />
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: colors.background,
  },
});
