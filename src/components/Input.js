import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import { Field } from 'formik';
import colors from 'src/themes/colors';

const Input = ({ name, label, type, placeholder }) => {
  const getStyleName = (field, form) =>
    form.touched[field.name] && form.errors[field.name] ? s.invalid : null;

  return (
    <Field
      name={name}
      render={({ field, form, ...fieldProps }) => (
        <>
          <TextInput
            placeholder={placeholder}
            secureTextEntry={type === 'password'}
            style={[s.input, getStyleName(field, form)]}
            onChangeText={form.handleChange(name)}
            onBlur={form.handleBlur(name)}
          />
          <Text style={s.error}>
            {form.touched[name] && form.errors[name]}
          </Text>
        </>
      )}
    />
  );
};

Input.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
};

Input.defaultProps = {
  type: 'text',
};

const s = StyleSheet.create({
  error: {
    color: colors.red,
    fontSize: 11,
    lineHeight: 14,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.brandLight,
    borderRadius: 5,
    padding: 14,
    backgroundColor: colors.white,
  },
  invalid: {
    borderColor: colors.red,
  },
});

export default Input;
