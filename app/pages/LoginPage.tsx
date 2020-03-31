/* eslint-disable react/prop-types */
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

import { doLogin } from '../store/features/IgStateSlice';

export default function LoginPage() {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        username: 'grizzo.exe',
        password: '9YtVgTdnAM9kZV7r',
        rememberMe: false
      }}
      onSubmit={async ({ username, password }) => {
        await dispatch(doLogin({ username, password }));
        await dispatch(push('/'));
      }}
    >
      {() => (
        <Form>
          <Field type="text" name="username" />
          <ErrorMessage name="username" component="div" />
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="div" />

          <button type="submit">Login</button>
        </Form>
      )}
    </Formik>
  );
}
