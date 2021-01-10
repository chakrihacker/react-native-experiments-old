import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import TextSlide from './TextSlide';

const {width} = Dimensions.get('window');

const Slide1 = ({isActive}) => {
  return (
    <View style={styles.container}>
      <TextSlide isActive={isActive} />
      <View style={styles.textContainer}>
        <Text style={styles.professionalText}>
          Professionally written content
        </Text>
        <Text style={styles.tailoredText}>tailored to your industry</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
  },
  textContainer: {
    paddingHorizontal: width * 0.15,
    paddingVertical: width * 0.1,
    alignItems: 'center',
  },
  professionalText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  tailoredText: {
    color: '#fff',
    fontSize: 20,
  },
});

export default Slide1;
