import 'sanitize.css'

import React from 'react'
import { HashRouter } from 'react-router-dom'
import { Switch, Route } from 'react-router'
import { StateProvider } from './context/IGMState'
import ProtectedRoute from './components/ProtectedRoute'

import ChatList from './views/ChatList'
import Chat from './views/Chat'
import Login from './views/Login'
import GlobalStyle from './globalStyles'

const Root = () => (
  <React.Fragment>
    <GlobalStyle />
    <HashRouter>
      <StateProvider>
        <Switch>
          <Route exact path="/login" component={Login}/>
          <ProtectedRoute exact path='/' component={ChatList} />
          <ProtectedRoute exact path='/thread/:threadId/' component={Chat} />
        </Switch>
      </StateProvider>
    </HashRouter>
  </React.Fragment>
)

export default Root
