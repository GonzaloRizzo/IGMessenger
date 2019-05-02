import React from 'react'
import styled from 'styled-components'

const ChatItem = message => {
  const Component = ChatItem.messageComponents[message.item_type] || ChatItem.messageComponents.debug
  return (
    <ChatItem.Container>
      <Component {...message} />
    </ChatItem.Container>
  )
}

ChatItem.DebugMessage = ({ item_type }) => <b>{item_type}</b>
ChatItem.TextMessage = ({ text }) => text
ChatItem.ActionLogMessage = ({ action_log: { description }}) => description

ChatItem.messageComponents = {
  debug: ChatItem.DebugMessage,
  text: ChatItem.TextMessage,
  action_log: ChatItem.ActionLogMessage,
}

ChatItem.Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 40px;
  border-bottom: 1px solid #efefef;
  align-items: center;
  padding: 8px;
  user-select: none;
  flex-shrink:0;

  &:hover {
    background-color: #f7f7f7;
    cursor: pointer;
  }
`

export default ChatItem
