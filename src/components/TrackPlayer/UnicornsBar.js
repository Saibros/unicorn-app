import React, { useCallback } from 'react';
import { View, Animated, Text, StyleSheet } from 'react-native';
import { width } from 'src/themes/metrics';
import { useAnimation } from './hooks';

const UnicornBar = ({ isAnimating }) => {
  const animation = useAnimation(isAnimating);
  const unicornsArray = Array.from({ length: Math.round(width / 30) + 1 });

  const getUnicorns = useCallback(
    () => unicornsArray.map((_item, index) => (
      <View style={s.unicornContainer} key={index}>
        <Text style={s.text}>🦄</Text>
      </View>
    )
  ), []);

  return (
    <View style={s.container}>
      <Animated.View
        style={[s.textWrapper, { transform: [{ translateX: animation }] }]}>
        {getUnicorns()}
      </Animated.View>
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    height: 30,
    overflow: 'hidden',
  },
  textWrapper: {
    position: 'absolute',
    left: 0,
    top: 0,
    flexDirection: 'row',
  },
  text: { fontSize: 22 },
  unicornContainer: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UnicornBar;
