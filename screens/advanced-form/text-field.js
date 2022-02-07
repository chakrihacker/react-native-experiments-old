import React from 'react';
import {Controller} from 'react-hook-form';
import {TextInput} from 'react-native';
import {FormField} from './form-field';

export const TextInputField = ({
  name,
  label,
  required,
  control,
  placeHolder,
}) => {
  return (
    <FormField label={label} required={required}>
      <Controller
        control={control}
        rules={{
          required: 'Name is required',
          minLength: {
            value: 3,
            message: 'Name must be at least 3 characters',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => {
          return (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder={placeHolder}
              placeholderTextColor={'grey'}
              style={{borderWidth: 1, padding: 10}}
            />
          );
        }}
        name={name}
      />
    </FormField>
  );
};
