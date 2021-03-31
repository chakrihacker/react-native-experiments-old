import React from 'react';
import {View, StyleSheet} from 'react-native';
import MarketingView from './containers/MarketingView';

export const GradientIntroSlider = () => {
  return (
    <View style={styles.container}>
      <MarketingView />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
