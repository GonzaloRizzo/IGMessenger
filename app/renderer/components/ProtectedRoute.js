import React from 'react'
import { Route, Redirect } from 'react-router'
import queryString from 'query-string'

import { useIGMState } from '../context/IGMState'

const ProtectedRoute = ({ component: Component, render, ...routeProps }) => {
  const { user } = useIGMState()
  return (
    <Route
      {...routeProps}
      render={props => {
        if (!user) {
          return (
            <Redirect
              to={{
                pathname: '/login',
                search: queryString.stringify({
                  next: '/'
                })
              }}
            />
          )
        }
        if (Component) {
          return <Component {...props} />
        }
        if (render) {
          return render(props)
        }
        return null
      }}
    />
  )
}

export default ProtectedRoute
