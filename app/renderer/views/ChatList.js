import React from 'react'
import styled from 'styled-components'

import ChatItem from './ChatList/ChatItem'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const ChatList = ({ chats }) => {
  return (
    <Container>
      {chats.map(chat => (
        <ChatItem {...chat} />
      ))}
    </Container>
  )
}

const ChatListContainer = () => {
  const chats = [
    {
      name: 'Franco Correa',
      lastMessage: 'Mira esto bo',
      photo:
        'https://instagram.fmvd4-1.fna.fbcdn.net/vp/3a400dee00fe9a7669322200d6a0f946/5D69E918/t51.2885-19/s150x150/13768113_1656635494659895_849635158_a.jpg?_nc_ht=instagram.fmvd4-1.fna.fbcdn.net'
    },
    {
      name: 'Minu',
      lastMessage: 'Photo',
      photo:
        'https://instagram.fmvd4-1.fna.fbcdn.net/vp/19609c568c7d2b0597ca5e93d88649ad/5D5F265E/t51.2885-19/s150x150/45999082_1159053614249461_1932875148809994240_n.jpg?_nc_ht=instagram.fmvd4-1.fna.fbcdn.net'
    },
    {
      name: 'Maite',
      lastMessage: 'jajaja',
      photo:
        'https://instagram.fmvd4-1.fna.fbcdn.net/vp/8c548f7a2efa7d4874a2d5dad892e962/5D51F2A1/t51.2885-19/s150x150/57085389_1999403050186791_4541947367426883584_n.jpg?_nc_ht=instagram.fmvd4-1.fna.fbcdn.net'
    },
    {
      name: 'Santiago Rizzo',
      lastMessage: 'Photo',
      photo:
        'https://instagram.fmvd4-1.fna.fbcdn.net/vp/f0263ba38bf6014fa9394c0115f349ee/5D58BBA2/t51.2885-19/s150x150/21373524_1569319386461444_2836016551075774464_a.jpg?_nc_ht=instagram.fmvd4-1.fna.fbcdn.net'
    }
  ]

  return <ChatList chats={chats} />
}

export default ChatListContainer
