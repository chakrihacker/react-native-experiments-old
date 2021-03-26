import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const marketingWords = [
  'Automotive',
  'Beauty & Spas',
  'Events & Entertainment',
  'Financial Advisors',
  'Food & Beverage',
  'Home Services',
  'Insurance',
  'Legal',
  'Mortgage',
  'Pet Services',
  'Promotional Products',
  'Real Estate',
  'Travel & Tourism',
  'Wellness',
];

const AnimatedText = ({word, index}) => {
  const transY = useSharedValue(250);

  useEffect(() => {
    transY.value = withDelay(
      index * 200,
      withRepeat(
        withTiming(-250, {
          duration: 3000,
          easing: Easing.ease,
        }),
        -1,
        false,
        (_) => {
          transY.value = 250;
        },
      ),
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      transY.value,
      [-125, 0, 125],
      [0.4, 1, 0.4],
      Extrapolate.CLAMP,
    );

    const opacity = interpolate(
      transY.value,
      [-125, 0, 125],
      [0, 1, 0],
      Extrapolate.CLAMP,
    );
    return {
      opacity,
      transform: [
        {
          translateY: transY.value,
        },
        {
          scale: scale,
        },
      ],
    };
  });

  return (
    <Animated.Text style={[styles.wordStyle, animatedStyle]}>
      {word}
    </Animated.Text>
  );
};

const TextSlide = ({isActive}) => {
  if (!isActive) {
    return <View style={styles.container} />;
  }
  return (
    <View style={styles.container}>
      {marketingWords.map((word, index) => {
        return <AnimatedText key={index} word={word} index={index} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  wordStyle: {
    position: 'absolute',
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TextSlide;
