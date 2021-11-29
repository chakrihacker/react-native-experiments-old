/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {GradientIntroSlider} from './screens/gradient-intro-slider';
import {HomeScreen} from './screens/home-screen';
import {UseCallBackScreen} from './screens/use-call-back';
import {LotteryScreen} from './screens/lottery';
import {Localization} from './screens/localization';

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const App = () => {
  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name={'HomeScreen'} component={HomeScreen} />
          <Stack.Screen name={'IntroSlider'} component={GradientIntroSlider} />
          <Stack.Screen
            name={'UseCallBackScreen'}
            component={UseCallBackScreen}
          />
          <Stack.Screen
            name={'LotteryTicketAnimationScreen'}
            component={LotteryScreen}
          />
          <Stack.Screen name={'I18n'} component={Localization} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
