import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  TouchableNativeFeedback,
  Platform,
  StyleSheet,
} from 'react-native';
import colors from 'src/themes/colors';

const AndroidButton = ({ style, ...props }: AndroidButtonTypes) => (
  <View style={[s.androidButtonWrapper, style]}>
    <TouchableNativeFeedback {...props} />
  </View>
);

const ButtonComponent = Platform.OS === 'ios' ? TouchableOpacity : AndroidButton;

const Button = ({
  text,
  style,
  onPress,
  isLoading,
  disabled,
  isLight,
}: ButtonTypes) => (
  <ButtonComponent
    style={[
      s.mainWrapper,
      isLight && s.mainWrapperLight,
      disabled && s.disabledWrapper,
      style,
    ]}
    onPress={onPress}
    disabled={disabled || isLoading}
  >
    <View style={s.textWrapper}>
      <>
        {isLoading ? (
          <ActivityIndicator
            style={s.leftIcon}
            color={isLight ? colors.brand : colors.white}
          />
        ) : null}
        <Text
          style={[
            s.text,
            disabled && s.disabledText,
            isLight && s.textLight,
          ]}
        >
          {text}
        </Text>
      </>
    </View>
  </ButtonComponent>
);

Button.defaultProps = {
  theme: 'primary',
};

const s = StyleSheet.create({
  androidButtonWrapper: {
    overflow: 'hidden',
  },
  mainWrapper: {
    backgroundColor: colors.brand,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: colors.brand,
    height: 50,
  },
  mainWrapperLight: {
    backgroundColor: colors.white,
  },
  textWrapper: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    color: colors.white,
  },
  textLight: {
    color: colors.brand,
  },
  disabledWrapper: {
    opacity: 0.5,
  },
  leftIcon: {
    left: 20,
    position: 'absolute',
  },
});

export default Button;
