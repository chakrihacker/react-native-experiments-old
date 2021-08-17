import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ParamListBase} from '@react-navigation/native';
import {Headline, Text} from 'react-native-paper';
import {NativeStackNavigationProp} from 'react-native-screens/native-stack';
import {TicketsList} from './lottery-tickets/ticket-list';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {clamp} from './utils/animated-utils';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TicketState} from './lottery-tickets/ticket';
import Confetti from './components/Confetti';

const LotteriesList = new Array(25).fill(0).map((_, i) => i + 1);

export const BOUNDS = {
  min: 0,
  max: 100,
};

export interface LotteryScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
  name: string;
}

export const LotteryScreen: React.FunctionComponent<LotteryScreenProps> = _props => {
  const [showConfetti, setShowConfetti] = useState(false);
  const stopConfettiAnimation = useSharedValue(false);
  // ignore handling on scroll when ticket is in open state
  const ignoreOnScroll = useSharedValue(false);
  // clamp value based on scrolling
  const diffClampScrollY = useSharedValue(0);

  const handleScroll = useAnimatedScrollHandler<{prevY?: number}>({
    onBeginDrag: (event, ctx) => {
      ctx.prevY = event.contentOffset.y;
    },
    onScroll: (event, ctx) => {
      const {value: ignored} = ignoreOnScroll;
      if (!ignored) {
        let {y} = event.contentOffset;
        if (y < BOUNDS.min) {
          y = BOUNDS.min;
        }
        const diffY = y - (ctx?.prevY ?? 0);
        diffClampScrollY.value = clamp(
          diffClampScrollY.value + diffY,
          BOUNDS.min,
          BOUNDS.max,
        );
        ctx.prevY = y;
      }
    },
    onMomentumEnd: () => {
      ignoreOnScroll.value = false;
    },
  });

  const handleTicketPress = ({state, isWinningLottery}) => {
    if (state === TicketState.OPENING) {
      ignoreOnScroll.value = true;
      diffClampScrollY.value = withTiming(BOUNDS.max);
    } else if (state === TicketState.CLOSING) {
      ignoreOnScroll.value = false;
      diffClampScrollY.value = withTiming(BOUNDS.min);
    } else if (state === TicketState.OPENED) {
      if (isWinningLottery) {
        setShowConfetti(true);
      }
    } else if (state === TicketState.CLOSED) {
      if (showConfetti) {
        stopConfettiAnimation.value = true;
      }
    }
  };

  const handleConfettiAnimationFinished = () => {
    setShowConfetti(false);
    stopConfettiAnimation.value = false;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Headline style={styles.header}>{'Lottery App'}</Headline>
      <Animated.ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
        {LotteriesList.map(lottery => (
          <View key={lottery} style={styles.lottery}>
            <Text style={styles.ticketText}>{`Lottery - #${lottery}`}</Text>
          </View>
        ))}
      </Animated.ScrollView>
      <TicketsList
        clampedScrollY={diffClampScrollY}
        onTicketPress={handleTicketPress}
      />
      {showConfetti && (
        <Confetti
          shouldStopAnimation={stopConfettiAnimation}
          onAnimationFinished={handleConfettiAnimationFinished}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    textAlign: 'center',
  },
  lottery: {
    height: 50,
    flex: 1,
    alignItems: 'center',
  },
  ticketText: {},
  introductionText: {
    fontSize: 25,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
    alignSelf: 'center',
  },
});
