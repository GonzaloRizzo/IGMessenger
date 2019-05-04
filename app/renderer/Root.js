import 'sanitize.css'

import React from 'react'
import { HashRouter } from 'react-router-dom'
import { Switch, Route } from 'react-router'
import { StateProvider } from './context/IGMState'
import ProtectedRoute from './components/ProtectedRoute'

import ChatList from './views/ChatList'
import Chat from './views/Chat'
import GlobalStyle from './globalStyles'

const Root = () => (
  <React.Fragment>
    <GlobalStyle />
    <HashRouter>
      <StateProvider>
        <Switch>
          <Route exact path="/login" render={()=>"Y dale"}/>
          <Route exact path='/' component={ChatList} />
          <Route exact path='/thread/:threadId/' component={Chat} />
        </Switch>
      </StateProvider>
    </HashRouter>
  </React.Fragment>
)

export default Root
