import React, {useEffect, useRef} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

// TODO
// Add this config
// 1. Add number of ripples
// 2. Make ripple full width
// 3. space between ripple
// 5. duration of ripple

const PulseItem = ({index, color, width}) => {
  const circleRadius = useSharedValue(0);

  useEffect(() => {
    circleRadius.value = withDelay(
      1250 * index,
      withRepeat(
        withTiming(width, {
          duration: 5000,
          easing: Easing.ease,
        }),
        -1,
        false,
        (finished) => {
          circleRadius.value = 0;
        },
      ),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const circleSizeAnimation = useAnimatedStyle(() => {
    const circleOpacity = interpolate(
      circleRadius.value,
      [0, width],
      [0.2, 0],
      Extrapolate.CLAMP,
    );
    return {
      width: circleRadius.value,
      height: circleRadius.value,
      borderRadius: circleRadius.value * 2,
      opacity: circleOpacity,
    };
  });

  return (
    <Animated.View
      key={index}
      style={[styles.pulse, {backgroundColor: color}, circleSizeAnimation]}
    />
  );
};

const Pulsator = ({count = 2, width, duration, color = '#fff'}) => {
  // const circleRadius = useSharedValue(0);
  const pulseArray = useRef([...Array(count).keys()]);

  return (
    <View style={styles.pulseContainer}>
      <Image
        source={require('../../../assets/Logo.png')}
        style={styles.logo}
        resizeMode={'contain'}
      />
      {pulseArray.current.map((_, index) => {
        return (
          <PulseItem key={index} index={index} color={color} width={width} />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  pulseContainer: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
  },
  pulse: {
    position: 'absolute',
    backgroundColor: 'tomato',
  },
});

export default Pulsator;
