import React from 'react';
import {Image, Dimensions, StyleSheet, Text, View} from 'react-native';

const {width} = Dimensions.get('window');

const ReUsableSlide = ({image, text1, text2}) => {
  return (
    <View style={styles.container}>
      <Image source={image} resizeMode={'contain'} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.textView}>
          <Text style={styles.professionalText}>{text1}</Text>
          <Text style={styles.tailoredText}>{text2}</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: width,
  },
  image: {
    height: 250,
  },
  textContainer: {
    paddingHorizontal: width * 0.15,
    alignItems: 'center',
    paddingVertical: width * 0.1,
  },
  textView: {
    textAlign: 'center',
    flexDirection: 'row',
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

export default ReUsableSlide;
