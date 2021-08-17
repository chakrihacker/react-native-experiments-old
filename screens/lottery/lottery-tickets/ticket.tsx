import React, {FC} from 'react';
import {ViewStyle, Dimensions, View} from 'react-native';
import {
  HandlerStateChangeEvent,
  State,
  TapGestureHandler,
  TapGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import {Text} from 'react-native-paper';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {BOUNDS} from '..';
import {
  TICKET_EXPANDED_HEADER_HEIGHT,
  TICKET_SHRINKED_HEADER_HEIGHT,
} from './ticket-list';

const {width: WINDOW_WIDTH, height: WINDOW_HEIGHT} = Dimensions.get('window');

export enum TicketState {
  OPENED,
  OPENING,
  CLOSED,
  CLOSING,
}

interface Ticket {
  city: string;
  name: string;
  color: string;
  isWinningLottery: boolean;
}

interface TicketPressParams {
  state: TicketState;
  isWinningLottery: boolean;
}

interface TicketProps {
  index: number;
  ticket: Ticket;
  clampedScrollY: Animated.SharedValue<number>;
  onPress: (ticketPressParams: TicketPressParams) => void;
}

const {width} = Dimensions.get('window');

const container: ViewStyle = {
  position: 'absolute',
};

const TICKET_HEIGHT = 400;

const ticketContainer: ViewStyle = {
  height: TICKET_HEIGHT,
  width: width * 0.8,
  padding: 10,
  justifyContent: 'space-between',
  flexDirection: 'row',
};

export const Ticket: FC<TicketProps> = props => {
  const translateY = useSharedValue(0);

  const handleTapGesture = (
    event: HandlerStateChangeEvent<TapGestureHandlerEventPayload>,
  ) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      handleTicketPress();
    }
  };

  const handleTicketPress = () => {
    const isWinningLottery = props.ticket.isWinningLottery;
    if (translateY.value < 0) {
      props.onPress({state: TicketState.CLOSING, isWinningLottery});
      translateY.value = withSpring(
        0,
        {
          damping: 15,
        },
        isFinished => {
          if (isFinished) {
            runOnJS(props.onPress)({
              state: TicketState.CLOSED,
              isWinningLottery,
            });
          }
        },
      );
    } else {
      props.onPress({state: TicketState.OPENING, isWinningLottery});
      const dy = props.index * 10;
      translateY.value = withSpring(
        -WINDOW_HEIGHT - dy + TICKET_HEIGHT / 4,
        {
          damping: 15,
        },
        isFinished => {
          if (isFinished) {
            runOnJS(props.onPress)({
              state: TicketState.OPENED,
              isWinningLottery,
            });
          }
        },
      );
    }
  };

  const ticketStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  const ticketScrollY = useAnimatedStyle(() => {
    const offsetY = interpolate(
      props.clampedScrollY.value,
      [BOUNDS.min, BOUNDS.max],
      [TICKET_EXPANDED_HEADER_HEIGHT, TICKET_SHRINKED_HEADER_HEIGHT],
      Extrapolate.CLAMP,
    );

    return {
      transform: [
        {
          translateY: props.index * offsetY,
        },
      ],
    };
  });

  return (
    <Animated.View style={[container, ticketScrollY]}>
      <Animated.View style={ticketStyle}>
        <TapGestureHandler onHandlerStateChange={handleTapGesture}>
          <View
            style={[
              ticketContainer,
              {
                backgroundColor: props.ticket.color,
              },
            ]}>
            <View>
              <Text>{props.ticket.city}</Text>
              <Text>{props.ticket.name}</Text>
            </View>
            {props.ticket.isWinningLottery && <Text>WON: $2</Text>}
          </View>
        </TapGestureHandler>
      </Animated.View>
    </Animated.View>
  );
};
