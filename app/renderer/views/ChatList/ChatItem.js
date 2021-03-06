import React from 'react'
import styled from 'styled-components'
import UserPhoto from '../../components/UserPhoto'


const ChatItem = ({ name, lastMessage, photo, onClick }) => {
  return (
    <ChatItem.Container onClick={onClick}>
      <ChatItem.Photo src={photo} />
      <ChatItem.Content>
        <ChatItem.MainInfo>{name}</ChatItem.MainInfo>
        <ChatItem.ExtraInfo>{lastMessage}</ChatItem.ExtraInfo>
      </ChatItem.Content>
    </ChatItem.Container>
  )
}

ChatItem.Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 75px;
  border-bottom: 1px solid #efefef;
  align-items: center;
  padding: 8px;
  user-select: none;
  flex-shrink: 0;
  overflow: hidden;

  &:hover {
    background-color: #f7f7f7;
    cursor: pointer;
  }
`

ChatItem.Photo = styled(UserPhoto).attrs({
  size: '50px'
})`
  margin-right: 8px;
`

ChatItem.Content = styled.div`
  display: flex;
  flex-direction: column;
`
ChatItem.InfoLine = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

ChatItem.MainInfo = styled(ChatItem.InfoLine)`
  font-weight: 600;
`

ChatItem.ExtraInfo = styled(ChatItem.InfoLine)`
  font-weight: 400;
  color: #999;
  font-size: 0.95em;
`

export default ChatItem
