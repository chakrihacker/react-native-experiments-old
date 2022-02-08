import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Blur,
  BlurMask,
  Canvas,
  Circle,
  Group,
  Paint,
  Rect,
} from '@shopify/react-native-skia';

const SkiaExample = () => {
  const width = 128;
  const height = 128;
  const r = 108;
  return (
    <SafeAreaView style={styles.container}>
      <Canvas style={StyleSheet.absoluteFillObject}>
        <Paint opacity={0.4}>
          <BlurMask sigma={20} />
          {/* <Blur sigmaX={20} sigmaY={20} mode={'repeat'} /> */}
        </Paint>
        <Rect height={100} width={100} x={0} y={0} color={'#ccc'} />
        {/* <Circle cx={r} cy={r} r={r} color="cyan" /> */}
        {/* <Circle cx={width + r} cy={r} r={r} color="magenta" /> */}
        {/* <Circle cx={width / 2 + r} cy={height + r} r={r} color="yellow" /> */}
      </Canvas>
      <Text>{'Hello World'}</Text>
    </SafeAreaView>
  );
};

export default SkiaExample;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  canvas: StyleSheet.absoluteFillObject,
});
