import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { Formik } from 'formik';
import Button from './Button';
import colors from 'src/themes/colors';

const Form = ({ initialValues, submitTitle, children, onSubmit, validationSchema }) => {
  const handleSubmit = async (values, actions) => {
    if (onSubmit) {
      actions.setSubmitting(true);
      const result = await onSubmit(values, actions);
      actions.setSubmitting(false);
      if (result.isError) {
        actions.setStatus({ error: 'Something went wrong. Please try again' });
      }
      const { error } = result.payload;
      if (error) {
        actions.setStatus({ error });
      }
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      render={formikProps => (
        <View>
          {children}
          {(formikProps.status && formikProps.status.error) &&
            <Text style={s.error}>{formikProps.status.error}</Text>}
          <Button
            text={submitTitle}
            onPress={formikProps.handleSubmit}
            disabled={!formikProps.isValid}
            isLoading={formikProps.isSubmitting}
            style={s.submitButton}
          />
        </View>
      )}
    />
  );
};

Form.propTypes = {
  initialValues: PropTypes.object,
  submitTitle: PropTypes.string,
  onSubmit: PropTypes.func,
  children: PropTypes.node,
  validationSchema: PropTypes.object,
};

Form.defaultProps = {
  initialValues: {},
  submitTitle: 'Ok',
  validationSchema: null,
};

const s = StyleSheet.create({
  error: {
    color: colors.red,
  },
  submitButton: {
    marginTop: 15,
  },
});

export default Form;
