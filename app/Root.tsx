import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import Routes from './Routes';

const Root = () => (
  <MemoryRouter>
    <Routes />
  </MemoryRouter>
);

export default hot(Root);
