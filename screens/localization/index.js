import React, {useEffect, useState} from 'react';
import {StyleSheet, Text as BaseText, Button, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import i18n from 'i18n-js';
import {setI18nConfig, translate} from './locale';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useForceUpdate} from '../../hooks/use-force-update';

const Row = ({children, style, ...props}) => {
  const baseStyle = {flexDirection: i18n.isRTL ? 'row-reverse' : 'row'};
  return (
    <View style={[baseStyle, style]} {...props}>
      {children}
    </View>
  );
};

const Column = ({children, style, ...props}) => {
  const baseStyle = {
    flexDirection: i18n.isRTL ? 'column-reverse' : 'column',
  };
  return (
    <View style={[baseStyle, style]} {...props}>
      {children}
    </View>
  );
};

const Text = ({children, style, ...props}) => {
  const baseStyle = {writingDirection: i18n.isRTL ? 'rtl' : 'ltr'};

  return (
    <BaseText style={[baseStyle, style]} {...props}>
      {children}
    </BaseText>
  );
};

export const Localization = () => {
  const forceUpdate = useForceUpdate();

  const setLanguage = async () => {
    try {
      const selectedLanguage = await AsyncStorage.getItem('language');
      if (selectedLanguage === null) {
        setI18nConfig();
      } else {
        setI18nConfig(selectedLanguage);
      }
      forceUpdate();
    } catch (error) {
      setI18nConfig('en');
    }
  };

  useEffect(() => {
    // set language based on async storage
    setLanguage();
    // set language based on device locale
    // setI18nConfig()
    // AsyncStorage.removeItem('language');
  }, []);

  const updateLanguage = async language => {
    try {
      await AsyncStorage.setItem('language', language);
      setI18nConfig(language);
      forceUpdate();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <Text
        style={
          styles.text
        }>{`Selected Language: ${i18n.currentLocale()}`}</Text>
      <Button title={'English'} onPress={() => updateLanguage('en')} />
      {/* <Button title={'हिंदी'} onPress={() => updateLanguage('hi')} /> */}
      {/* <Button title={'తెలుగు'} onPress={() => updateLanguage('te')} /> */}
      <Button title={'Arabic'} onPress={() => updateLanguage('ar')} />
      <Column style={styles.languageBox}>
        <Text style={styles.text}>{translate('welcome')}</Text>
        <Text style={styles.text}>{translate('hello')}</Text>
        <Text style={styles.text}>{translate('goodbye')}</Text>
      </Column>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  languageBox: {
    alignSelf: 'stretch',
  },
  text: {
    color: '#000',
  },
});
