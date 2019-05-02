import 'sanitize.css'

import React from 'react'
import { HashRouter } from 'react-router-dom'
import { Switch, Route } from 'react-router'
import StateProvider from './components/StateProvider'

import ChatList from './views/ChatList'
import Chat from './views/Chat'
import GlobalStyle from './globalStyles'

const Root = () => (
  <React.Fragment>
    <GlobalStyle />
    <HashRouter>
      <Switch>
        <Route
          exact
          path='/'
          render={() => (
            <StateProvider injected={injected => <ChatList {...injected} />} />
          )}
        />
        <Route
          exact
          path='/thread/:threadId/'
          render={() => (
            <StateProvider injected={injected => <Chat {...injected} />} />
          )}
        />
      </Switch>
    </HashRouter>
  </React.Fragment>
)

export default Root
