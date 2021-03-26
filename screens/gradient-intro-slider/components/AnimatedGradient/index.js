import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import useDeepCompareEffect from 'use-deep-compare-effect';

const AnimatedGradientHelper = Animated.createAnimatedComponent(LinearGradient);

const AnimatedGradient = ({style, colors, children}) => {
  const [prevColors, setPrevColors] = useState(colors);
  const [nextColors, setNextColors] = useState(colors);
  const tweener = useSharedValue(0);

  useDeepCompareEffect(() => {
    setPrevColors(nextColors);
    setNextColors(colors);
    tweener.value = 0;
  }, [colors]);

  useDeepCompareEffect(() => {
    tweener.value = withTiming(1, {
      duration: 700,
      easing: Easing.quad,
    });
  }, [prevColors, nextColors]);

  const color1 = useDerivedValue(() => {
    return interpolateColor(
      tweener.value,
      [0, 1],
      [prevColors[0], nextColors[0]],
      'RGB',
    );
  });

  const color2 = useDerivedValue(() => {
    return interpolateColor(
      tweener.value,
      [0, 1],
      [prevColors[1], nextColors[1]],
      'RGB',
    );
  });

  const color3 = useDerivedValue(() => {
    return interpolateColor(
      tweener.value,
      [0, 1],
      [prevColors[2], nextColors[2]],
      'RGB',
    );
  });

  const colorProps = useAnimatedProps(() => {
    return {
      colors: [color1.value, color2.value, color3.value],
    };
  });

  return (
    <AnimatedGradientHelper style={style} animatedProps={colorProps}>
      {children}
    </AnimatedGradientHelper>
  );
};

export default AnimatedGradient;
