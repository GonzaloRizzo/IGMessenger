import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Switch, Route } from 'react-router';

const Root = () => (
  <BrowserRouter >
    <Switch>
      <Route path="/" render={()=>"Hello World"}/>
    </Switch>
  </BrowserRouter>
);


export default Root
