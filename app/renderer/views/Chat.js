import React from "react";
import styled from "styled-components";
import MessageItem from "./Chat/MessageItem";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  width: 100%;
  padding: 0 15px;
`;

const Chat = ({ messages, currentUserId }) => {
  return (
    <Container>
      {messages.filter(m => m.item_type !== 'action_log').map(message => (
        <MessageItem
          key={message.item_id}
          sentByCurrentUser={message.user_id === currentUserId}
          {...message}
        />
      ))}
    </Container>
  );
};

const HeaderContainer = styled.div`
  width: 100%;
`;

const ChatContainers = ({
  messages,
  user,
  onHomeClick,
  onGetMoreMessages,
  onLogin
}) => {
  return (
    <>
      <HeaderContainer>
        <button type="button" onClick={onLogin}>
          Login
        </button>

        <button type="button" onClick={onHomeClick}>
          Home
        </button>

        <button type="button" onClick={onGetMoreMessages}>
          Get Messages
        </button>
      </HeaderContainer>

      <Chat messages={messages} currentUserId={user.pk} />
    </>
  );
};

export default ChatContainers;
