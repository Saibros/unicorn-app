import React from 'react';
import { StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const KeyboardScrollView = ({ children }) => (
  <KeyboardAwareScrollView
    enableOnAndroid
    style={s.scrollView}
    keyboardShouldPersistTaps="handled"
  >
  {children}
  </KeyboardAwareScrollView>);

const s = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
});

export default KeyboardScrollView;
