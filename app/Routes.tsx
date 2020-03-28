import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import HomePage from './pages/HomePage';

export default function Routes() {
  return (
    <Switch>
      <Route path={routes.HOME} component={HomePage} />
    </Switch>
  );
}
