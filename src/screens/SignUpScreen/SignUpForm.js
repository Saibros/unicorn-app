import React from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import Form from 'src/components/Form';
import Input from 'src/components/Input';

const validationSchema = yup.object().shape({
  email: yup.string().label('Field').email().required(),
  password: yup.string().label('Password').required()
    .min(6, 'Password must be of minimum 6 characters length')
    .matches(/^[a-zA-Z0-9]*$/, 'Password must contain only alphanumeric'),
  name: yup.string().label('Name').required()
    .matches(/^[a-zA-Z]*$/, 'Name must contain only letters'),
});

const SignUpForm = ({ onSubmit }) => {
  return (
    <Form
      initialValues={{
        email: '',
        password: '',
        name: '',
      }}
      submitTitle="Register"
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Input name="email" label="Email" placeholder="Email" />
      <Input name="password" label="Password" type="password" placeholder="Password" />
      <Input name="name" label="Name" placeholder="Your name" />
    </Form>
  );
};

SignUpForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default SignUpForm;
