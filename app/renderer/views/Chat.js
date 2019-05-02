import React from "react";
import styled from "styled-components";
import MessageItem from "./Chat/MessageItem";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  width: 100%;
`;

const Chat = ({ messages }) => {
  return (
    <Container>
      {messages.map(message => (
        <MessageItem key={message.item_id} {...message} />
      ))}
    </Container>
  );
};

const HeaderContainer = styled.div`
  width: 100%;
`;

const ChatContainers = ({ messages, onHomeClick, onGetMoreMessages, onLogin }) => {
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

      <Chat messages={messages} />
    </>
  );
};

export default ChatContainers;
