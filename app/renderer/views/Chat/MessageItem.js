import React from 'react'
import styled, { css } from 'styled-components'

import MediaShareMessage from './MediaShareMessage'

const ChatItem = props => {
  const { item_type, sentByCurrentUser } = props
  const Component =
    ChatItem.messageComponents[item_type] || ChatItem.messageComponents.debug
  return (
    <ChatItem.Container
      sentByCurrentUser={sentByCurrentUser}
    >
      <Component {...props} />
    </ChatItem.Container>
  )
}

ChatItem.DebugMessage = ({ item_type }) => <b>{item_type}</b>
ChatItem.TextMessage = ({ text }) => text
ChatItem.ActionLogMessage = ({ action_log: { description } }) => description
ChatItem.MediaShareMessage = MediaShareMessage

ChatItem.messageComponents = {
  debug: ChatItem.DebugMessage,
  text: ChatItem.TextMessage,
  action_log: ChatItem.ActionLogMessage,
  media_share: ChatItem.MediaShareMessage
}

ChatItem.Container = styled.div`
  flex-direction: row;
  border: 1px solid #efefef;
  border-radius: 20px;
  padding: 10px 12px;
  margin: 5px;
  max-width: 500px;

  ${props =>
    props.sentByCurrentUser
      ? css`
          align-self: flex-end;
          background-color: #efefef;
          margin-left: 25px;
        `
      : css`
          margin-right: 25px;
          background-color: white;
          align-self: flex-start;
        `}
`

export default ChatItem
