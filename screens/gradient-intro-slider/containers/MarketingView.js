import React, {useState} from 'react';
import {View, Dimensions, StyleSheet, ScrollView} from 'react-native';
import AccountButtons from '../components/AccountButtons';
import AnimatedGradient from '../components/AnimatedGradient';
import PaginationDots from '../components/PaginationDots';
import Pulsator from './Pulsator';
import ReUsableSlide from './ReUsableSlide';
import Slide1 from './Slide1';

const {width} = Dimensions.get('window');

const orangeish = ['#C166FF', '#F78158', '#EE532B'];
const purplish = ['#EE2BE5', '#6F58F7', '#26099A'];
const acquaish = ['#4FD986', '#359BBB', '#2B50A7'];
const blueish = ['#66DAFF', '#5161CB', '#3D22B3'];

const marketingColors = [orangeish, purplish, acquaish, blueish];

const MarketingView = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScrollEnd = (event) => {
    const index = Math.floor(event.nativeEvent.contentOffset.x) / width;
    setActiveIndex(index);
  };
  return (
    <View style={styles.container}>
      <AnimatedGradient
        colors={marketingColors[activeIndex]}
        style={styles.linearGradient}>
        <View style={styles.pulseContainer}>
          <Pulsator count={5} duration={2000} width={width} />
        </View>
        <View style={styles.middleContainer}>
          <ScrollView
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleScrollEnd}
            contentContainerStyle={styles.scrollViewContainer}>
            <Slide1 isActive={activeIndex === 0} />
            <ReUsableSlide
              image={require('../../../assets/marketSlide1.png')}
              text1={'Email NewsLetters '}
              text2={'sent on your behalf to your network.'}
            />
            <ReUsableSlide
              image={require('../../../assets/marketSlide2.png')}
              text1={'A Branded Website, '}
              text2={'designed to capture visitors.'}
            />
            <ReUsableSlide
              image={require('../../../assets/marketSlide3.png')}
              text1={'Click-Worthy social posts'}
              text2={'to increase engagement'}
            />
          </ScrollView>
          <PaginationDots count={4} activeIndex={activeIndex} />
        </View>
        <View style={styles.bottomContainer}>
          <AccountButtons />
        </View>
      </AnimatedGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
  },
  pulseContainer: {
    flex: 1,
  },
  middleContainer: {
    flex: 2,
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  scrollView: {
    flex: 1,
  },
  bottomContainer: {
    flex: 0.5,
  },
});

export default MarketingView;
