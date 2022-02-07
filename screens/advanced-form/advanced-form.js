import React from 'react';
import {useForm} from 'react-hook-form';
import {Button, View} from 'react-native';
import {getDefaultValues} from './helpers';
import {TextInputField} from './text-field';

export const AdvancedFormBase = ({schema}) => {
  const defaultValues = getDefaultValues(schema);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({defaultValues});

  console.log({errors});

  const onSubmit = data => {
    console.log({data});
  };

  return (
    <View style={{paddingHorizontal: 20}}>
      {schema.map(
        ({name, label, componentType, required, placeHolder = ''}) => {
          return (
            // TODO: add components to array
            <TextInputField
              key={name}
              name={name}
              control={control}
              label={label}
              required={required}
              placeHolder={placeHolder}
            />
          );
        },
      )}
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};
