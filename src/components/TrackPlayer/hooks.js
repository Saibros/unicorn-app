import { useEffect, useCallback, useRef } from 'react';
import { Animated, Easing } from 'react-native';

export const useAnimation = (isAnimating) => {
  let animation = useRef(new Animated.Value(0)).current;

  const animate = useCallback(() => {
    Animated.loop(
      Animated.timing(animation, {
        toValue: -30,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
        delay: 0,
      }),
    ).start();
  }, [animation]);

  useEffect(() => {
    if (!isAnimating) {
      Animated.timing(animation).stop();
      animation.setValue(0);
    } else {
      animate();
    }
  }, [isAnimating]);

  return animation;
};
