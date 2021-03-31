import React from 'react';
import {Button, ScrollView} from 'react-native';

export const HomeScreen = ({navigation}) => {
  return (
    <ScrollView>
      <Button
        title={'1. IntroSlider'}
        onPress={() => navigation.navigate('IntroSlider')}
      />
      <Button
        title={'2. UseCallBackScreen'}
        onPress={() => navigation.navigate('UseCallBackScreen')}
      />
    </ScrollView>
  );
};
