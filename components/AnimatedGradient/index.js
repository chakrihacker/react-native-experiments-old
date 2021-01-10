import React, {Component} from 'react';
import {StyleSheet, Animated} from 'react-native';
import GradientHelper from './gradient-helper';

const styles = StyleSheet.create({
  component: {
    flex: 1,
  },
});

const AnimatedGradientHelper = Animated.createAnimatedComponent(GradientHelper);

class AnimatedGradient extends Component {
  constructor(props) {
    super(props);

    const {colors} = props;
    this.state = {
      prevColors: colors,
      colors,
      tweener: new Animated.Value(0),
    };
  }

  static getDerivedStateFromProps(props, state) {
    const {colors: prevColors} = state;
    const {colors} = props;
    const tweener = new Animated.Value(0);
    return {
      prevColors,
      colors,
      tweener,
    };
  }

  componentDidUpdate() {
    const {tweener} = this.state;
    Animated.timing(tweener, {
      toValue: 1,
      useNativeDriver: false,
    }).start();
  }

  render() {
    const {tweener, prevColors, colors} = this.state;

    const {style, children} = this.props;

    const color1Interp = tweener.interpolate({
      inputRange: [0, 1],
      outputRange: [prevColors[0], colors[0]],
    });

    const color2Interp = tweener.interpolate({
      inputRange: [0, 1],
      outputRange: [prevColors[1], colors[1]],
    });

    const color3Interp = tweener.interpolate({
      inputRange: [0, 1],
      outputRange: [prevColors[2], colors[2]],
    });

    return (
      <AnimatedGradientHelper
        style={style || styles.component}
        color1={color1Interp}
        color2={color2Interp}
        color3={color3Interp}>
        {children}
      </AnimatedGradientHelper>
    );
  }
}

export default AnimatedGradient;
