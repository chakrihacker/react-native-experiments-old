import React, {useEffect, FC} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import Animated, {
  cancelAnimation,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import FastImage from 'react-native-fast-image';
import {
  generateRandomIndexArray,
  getRandomNumberBetweenRange,
} from '../utils/random';

const {width: WINDOW_WIDTH, height: WINDOW_HEIGHT} = Dimensions.get('window');

const ConfettiImage = require('../assets/confetti.png');

const NUM_CONFETTI = [...new Array(100)];
const COLORS = ['#f26645', '#ffc75c', '#7ac7a3', '#4dc2d9', '#94638c'];
const CONFETTI_SIZE = 16;
const ANIMATION_DURATION = 8000;
const X_BIRTH_PLACES = [0.1, 0.3, 0.5, 0.7, 0.9];
const TEN_PERCENT_WIDTH = WINDOW_WIDTH * 0.1;
const CONFETTI_SCALING = [0.2, 0.6, 1];
const BOUNDS_X_VELOCITY = {
  min: -WINDOW_WIDTH * 0.3,
  max: WINDOW_WIDTH * 0.3,
};
const BIRTH_TIME_RANDOM_DELAY_BOUNDS = {
  min: 50,
  max: 150,
};

const randomXBirthPlaceGenerator = generateRandomIndexArray(
  X_BIRTH_PLACES.length,
);

const styles = StyleSheet.create({
  confettiContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  confetti: {
    width: CONFETTI_SIZE,
    height: CONFETTI_SIZE,
  },
});

interface ConfettoProps {
  index: number;
  shouldStopAnimation: Animated.SharedValue<boolean>;
  onAnimationFinished: () => void;
}

const Confetto: FC<ConfettoProps> = ({
  index,
  shouldStopAnimation,
  onAnimationFinished,
}) => {
  // get random confetto color
  const tintColor = COLORS[getRandomNumberBetweenRange(0, COLORS.length - 1)];
  const randomWidth = getRandomNumberBetweenRange(
    -TEN_PERCENT_WIDTH,
    TEN_PERCENT_WIDTH,
  );
  const randomXPoint = randomXBirthPlaceGenerator.getRandomIndex();
  const birthPlaceX = X_BIRTH_PLACES[randomXPoint] * WINDOW_WIDTH + randomWidth;
  const x = useSharedValue(birthPlaceX);
  const y = useSharedValue(-60);
  const angle = useSharedValue(0);
  const random = Math.random();
  let scale = CONFETTI_SCALING[2];
  if (random < 0.1) {
    scale = CONFETTI_SCALING[1];
  } else if (random < 0.2) {
    scale = CONFETTI_SCALING[0];
  }

  // TODO: change to useMountEffect
  useEffect(() => {
    const xDisplacement = getRandomNumberBetweenRange(
      BOUNDS_X_VELOCITY.min,
      BOUNDS_X_VELOCITY.max,
    );
    const rotationDuration = getRandomNumberBetweenRange(
      ANIMATION_DURATION / 4,
      ANIMATION_DURATION / 2,
    );
    const timingX = withTiming(x.value + xDisplacement, {
      duration: ANIMATION_DURATION / 2,
    });
    const timingY = withTiming(
      WINDOW_HEIGHT + 60,
      {
        duration: ANIMATION_DURATION,
      },
      isFinished => {
        if (isFinished && shouldStopAnimation.value) {
          cancelAnimation(x);
          cancelAnimation(y);
          cancelAnimation(angle);
          if (index === NUM_CONFETTI.length - 1) {
            runOnJS(onAnimationFinished)();
          }
        }
      },
    );

    const timingAngle = withTiming(360, {
      duration: rotationDuration,
    });
    const BIRTH_TIME_RANDOMNESS = getRandomNumberBetweenRange(
      BIRTH_TIME_RANDOM_DELAY_BOUNDS.min,
      BIRTH_TIME_RANDOM_DELAY_BOUNDS.max,
    );

    x.value = withDelay(
      index * BIRTH_TIME_RANDOMNESS,
      withRepeat(timingX, -1, true),
    );
    y.value = withDelay(index * BIRTH_TIME_RANDOMNESS, withRepeat(timingY, -1));
    angle.value = withDelay(
      index * BIRTH_TIME_RANDOMNESS,
      withRepeat(timingAngle, -1),
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: x.value},
        {translateY: y.value},
        {rotateZ: `${angle.value}deg`},
        {scale: scale},
      ],
    };
  });

  return (
    <Animated.View style={[styles.confettiContainer, animatedStyle]}>
      <FastImage
        source={ConfettiImage}
        tintColor={tintColor}
        style={styles.confetti}
      />
    </Animated.View>
  );
};

interface ConfettiProps {
  shouldStopAnimation: Animated.SharedValue<boolean>;
  onAnimationFinished: () => void;
}

export default function Confetti(props: ConfettiProps) {
  return (
    <View pointerEvents={'none'} style={StyleSheet.absoluteFillObject}>
      {NUM_CONFETTI.map((_, index) => {
        return (
          <Confetto
            index={index}
            key={index}
            shouldStopAnimation={props.shouldStopAnimation}
            onAnimationFinished={props.onAnimationFinished}
          />
        );
      })}
    </View>
  );
}
