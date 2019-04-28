import 'sanitize.css'

import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Switch, Route } from 'react-router'

import ChatList from './views/ChatList'
import GlobalStyle from './globalStyles'

const Root = () => (
  <React.Fragment>
    <GlobalStyle />
    <BrowserRouter>
      <Switch>
        <Route path='/' component={ChatList} />
      </Switch>
    </BrowserRouter>
  </React.Fragment>
)

export default Root
