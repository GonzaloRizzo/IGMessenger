import React from 'react'
import useReactRouter from 'use-react-router'

import * as api from '../../services/instagram'
import { log } from '../../utils'
import useDirectThread from './IGMState/useDirectThread'

window.client = api.client

export const IGMState = React.createContext({})

const useAppendableList = init => {
  const [list, setList] = React.useState(init || [])
  const appendList = newValues => setList([...list, ...newValues])

  return [list, setList, appendList]
}

const useFeed = feed => {
  const [items, setItems, appendItems] = useAppendableList()

  React.useEffect(() => setItems([]), [feed])

  const getMore = async () => {
    if (!feed) {
      return []
    }

    if (!feed.isMoreAvailable() && items.length > 0) {
      log('No more items available')
      return []
    }
    const newItems = await feed.items()
    log('Got more items')

    appendItems(newItems)
    return newItems
  }

  return [items, getMore]
}

const useInboxThread = () => {
  const [feed, setFeed] = React.useState(null)

  React.useEffect(() => {
    setFeed(api.client.feed.directInbox())
  }, [])

  return useFeed(feed)
}

export const StateProvider = ({ children }) => {
  const { history } = useReactRouter()
  const [threads, getMoreThreads] = useInboxThread()
  const [threadMessages, getMoreMessages] = useDirectThread()
  const [user, setUser] = React.useState(null)

  React.useEffect(() => {
    api.loadCookies()
  })

  const handleLogin = async (username, password) => {
    const newUser = await api.login(username, password)
    log('Did login')
    setUser(newUser)
  }

  const handleThreadClick = threadId => {
    log('Navigating to thread: ', threadId)

    return history.push(`/thread/${threadId}/`)
  }

  const handleHomeClick = () => history.push('/')

  const state = {
    threads,
    user,
    threadMessages,
    onGetMoreMessages: getMoreMessages,
    onLogin: handleLogin,
    onGetChats: getMoreThreads,
    onGetMoreThreads: getMoreThreads,
    onThreadClick: handleThreadClick,
    onHomeClick: handleHomeClick
  }

  window.state = state

  return <IGMState.Provider value={state}>{children}</IGMState.Provider>
}

export const useIGMState = () => React.useContext(IGMState)

export default IGMState
