import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AdvancedFormBase} from './advanced-form';

const schema = [
  {
    name: 'name',
    label: 'Name',
    componentType: 'text',
    required: true,
    placeHolder: 'Enter your name',
  },
  // {
  //   name: 'class',
  //   label: 'Class',
  //   componentType: 'select',
  //   options: [
  //     { value: 'ranger', label: 'Ranger' },
  //     { value: 'wizard', label: 'Wizard' },
  //   ],
  // },
];

export const AdvancedForm = () => {
  return (
    <SafeAreaView>
      <AdvancedFormBase schema={schema} />
    </SafeAreaView>
  );
};
