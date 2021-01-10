import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';

class GradientHelper extends Component {
  render() {
    const {style, color1, color2, color3, children} = this.props;
    return (
      <LinearGradient colors={[color1, color2, color3]} style={style}>
        {children}
      </LinearGradient>
    );
  }
}

export default GradientHelper;
