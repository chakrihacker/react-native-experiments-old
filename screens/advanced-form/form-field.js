import React from 'react';
import {View, Text} from 'react-native';

export const FormField = ({id, label, children, required}) => {
  // TODO: add error logic
  return (
    <View id={id}>
      <Text>{`${label} ${required && '*'}`}</Text>
      {children}
    </View>
  );
};
