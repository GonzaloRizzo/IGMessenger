import React from 'react'
import styled from 'styled-components'
import queryString from 'query-string'
import useReactRouter from 'use-react-router'
import useInputValue from '@rehooks/input-value'

import { useIGMState } from '../context/IGMState'

export const Login = ({ onLogin }) => {
  const { location, history } = useReactRouter()
  const username = useInputValue(process.env.IG_USERNAME)
  const password = useInputValue(process.env.IG_PASSWORD)
  const [error, setError] = React.useState(null)
  const [loading, setLoading] = React.useState(false)

  const onLoginClick = async () => {
    if (!username.value || !password.value) {
      return
    }
    setLoading(true)
    try {
      await onLogin(username.value, password.value)
      const nextUrl = queryString.parse(location.search).next || '/'
      history.push(nextUrl)
    } catch (e) {
      if (e.response) {
        setError(e.response.body.message)
        setLoading(false)
      } else {
        throw e
      }
    }
  }
  return (
    <Login.Container>
      <Login.FormContainer>
        <Login.Title>IG Messenger</Login.Title>
        <Login.Input placeholder='Login' {...username} />
        <Login.Input placeholder='Password' type='password' {...password} />
        <Login.ErrorMessage>{error}</Login.ErrorMessage>
        <Login.Button
          value={loading ? 'Loading...' : 'Login'}
          disabled={loading}
          onClick={onLoginClick}
        />
      </Login.FormContainer>
    </Login.Container>
  )
}
Login.Title = styled.h1`
  @import url("https://fonts.googleapis.com/css?family=Pacifico");
  font-family: "Pacifico", cursive;
  text-align: center;
`
Login.Input = styled.input`
  width: 100%;
  background: #fafafa;
  border: 1px #f1f1f1 solid;
  border-radius: 3px;
  padding: 8px 10px;
`
Login.Button = styled(Login.Input).attrs({
  type: 'button'
})`
  background: #3798f0;
  color: white;
  font-weight: bold;
  &:disabled {
    background-color: #99c9f5;
  }
`
Login.ErrorMessage = styled.div`
  color: #dd326f;
  text-align: center;

`
Login.Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 80vh;
  justify-content: center;

  ${Login.Input}, ${Login.ErrorMessage} {
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }

  ${Login.Title} {
    margin-bottom: 25px;
  }
`
Login.FormContainer = styled.div`
  max-width: 350px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin: 0 25px;
`
const LoginContainer = () => {
  const { onLogin } = useIGMState()
  return <Login onLogin={onLogin} />
}
export default LoginContainer
