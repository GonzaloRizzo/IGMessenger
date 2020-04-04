/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import routes from '../shared/constants/routes.json';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ThreadPage from './pages/ThreadPage';
import { selectIsLogged } from '../shared/store/features/IgStateSlice';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLogged = useSelector(selectIsLogged);

  return (
    <Route
      {...rest}
      render={props =>
        isLogged === true ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default function Routes() {
  return (
    <Switch>
      <Route exact path={routes.LOGIN} component={LoginPage} />
      <PrivateRoute exact path={routes.HOME} component={HomePage} />
      <PrivateRoute exact path={routes.THREAD} component={ThreadPage} />
    </Switch>
  );
}
