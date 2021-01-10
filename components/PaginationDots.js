import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';

const PaginationDots = ({count, activeIndex}) => {
  const paginationDotViews = useRef([...Array(count).keys()]);

  return (
    <View style={styles.container}>
      {paginationDotViews.current.map((dot) => {
        const isActive = dot === activeIndex;
        return (
          <View
            key={dot}
            style={[
              styles.dotConainer,
              {
                backgroundColor: isActive ? '#fff' : '#e0e0e0',
                opacity: isActive ? 1 : 0.8,
              },
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dotConainer: {
    marginHorizontal: 5,
    width: 8,
    height: 8,
    borderRadius: 20,
  },
});

export default PaginationDots;
