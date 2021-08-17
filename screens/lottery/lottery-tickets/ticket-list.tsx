import React, {useState, FC} from 'react';
import {View, ViewStyle, StyleSheet, Dimensions} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {BOUNDS} from '..';
import {Ticket, TicketState} from './ticket';

const {width: WINDOW_WIDTH, height: WINDOW_HEIGHT} = Dimensions.get('window');

const SCREEN_HEADER_HEIGHT = 50;

const MAX_VISIBLE_TICKETS = 3;
export const TICKET_EXPANDED_HEADER_HEIGHT = 50;
export const TICKET_SHRINKED_HEADER_HEIGHT = 10;

const ticketsExpandedHeight =
  MAX_VISIBLE_TICKETS * TICKET_EXPANDED_HEADER_HEIGHT;
const ticketsShrinkedHeight =
  MAX_VISIBLE_TICKETS * TICKET_SHRINKED_HEADER_HEIGHT;

const tickets = [
  {
    city: 'Dubai',
    name: 'Lucky 7',
    color: '#abcabc',
    isWinningLottery: false,
  },
  {
    city: 'London',
    name: 'Pick 3',
    color: '#004f18',
    isWinningLottery: true,
  },
  {
    city: 'Paris',
    name: 'Mega million',
    color: '#5e1acc',
    isWinningLottery: false,
  },
  {
    city: 'Hyderabad',
    name: 'Lucky 5',
    color: '#ffc107',
    isWinningLottery: false,
  },
];

const container: ViewStyle = {
  position: 'absolute',
  alignItems: 'center',
};

const ticketsContainer: ViewStyle = {
  alignItems: 'center',
  left: WINDOW_WIDTH / 2,
};

interface TicketsListProps {
  clampedScrollY: Animated.SharedValue<number>;
  onTicketPress: ({
    state,
    isWinningLottery,
  }: {
    state: TicketState;
    isWinningLottery: boolean;
  }) => void;
}

export const TicketsList: FC<TicketsListProps> = props => {
  // hold translateY for tickets list container
  const ticketsListY = useSharedValue(0);
  // block scrolling when ticket is open, or when tickets are on top
  const [touchBlockingView, setTouchBlockingView] = useState(false);
  // disable pan gesture when ticket is open
  const [isTicketFocused, setIsTicketFocused] = useState(false);

  const handleTicketPress = ({state, isWinningLottery}) => {
    props.onTicketPress({state, isWinningLottery});
    if (state === TicketState.OPENING) {
      setTouchBlockingView(true);
      setIsTicketFocused(true);
      // if tickets list is on top move it to the bottom, so the opening ticket will stay in center instead of going top
      ticketsListY.value = withSpring(0, {damping: 15});
    } else if (state === TicketState.CLOSING) {
      setTouchBlockingView(false);
      setIsTicketFocused(false);
    }
  };

  /**
   * Moved tickets list to top or bottom
   * */
  const handlePanGesture = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {prevY?: number}
  >({
    onStart: (event, ctx) => {
      ctx.prevY = ticketsListY.value;
    },
    onActive: (event, ctx) => {
      ticketsListY.value = event.translationY + ctx.prevY;
    },
    onEnd: event => {
      const {velocityY} = event;
      if (velocityY > 0) {
        ticketsListY.value = withSpring(0, {
          damping: 15,
        });
        runOnJS(setTouchBlockingView)(false);
      } else {
        ticketsListY.value = withSpring(
          -WINDOW_HEIGHT + ticketsExpandedHeight + SCREEN_HEADER_HEIGHT,
          {
            damping: 15,
          },
        );
        runOnJS(setTouchBlockingView)(true);
      }
    },
  });

  const ticketsAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: ticketsListY.value,
        },
      ],
    };
  });

  /**
   * Interpolated tickets expanded and shrinked at bottom
   * */
  const ticketsScrollStyle = useAnimatedStyle(() => {
    const dy = interpolate(
      props.clampedScrollY.value,
      [BOUNDS.min, BOUNDS.max],
      [
        WINDOW_HEIGHT - ticketsExpandedHeight,
        WINDOW_HEIGHT - ticketsShrinkedHeight,
      ],
      Extrapolate.CLAMP,
    );
    return {
      transform: [
        {
          translateY: dy,
        },
      ],
    };
  });

  return (
    <>
      {touchBlockingView && <View style={StyleSheet.absoluteFillObject} />}
      <Animated.View style={[container, ticketsScrollStyle]}>
        <Animated.View>
          <PanGestureHandler
            onGestureEvent={handlePanGesture}
            enabled={!isTicketFocused}>
            <Animated.View style={[ticketsContainer, ticketsAnimatedStyle]}>
              {tickets.map((ticket, index) => {
                return (
                  <Ticket
                    key={index}
                    index={index}
                    ticket={ticket}
                    clampedScrollY={props.clampedScrollY}
                    onPress={handleTicketPress}
                  />
                );
              })}
            </Animated.View>
          </PanGestureHandler>
        </Animated.View>
      </Animated.View>
    </>
  );
};
