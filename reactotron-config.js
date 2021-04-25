import Reactotron from 'reactotron-react-native';
import ReactotronFlipper from 'reactotron-react-native/dist/flipper';
import AsyncStorage from '@react-native-community/async-storage';
// import {mst} from 'reactotron-mst';

// ignore some chatty `mobx-state-tree` actions
const RX = /postProcessSnapshot|@APPLY_SNAPSHOT/;

Reactotron.setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
  .configure({
    name: 'React Native Experiments',
    createSocket: path => new ReactotronFlipper(path),
  }) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  // .use(
  //   mst({
  //     filter: event => RX.test(event.name) === false,
  //   }),
  // ) // connect to mst
  .connect(); // let's connect!
