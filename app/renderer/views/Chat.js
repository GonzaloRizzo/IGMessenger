import React from "react";
import styled from "styled-components";
import useReactRouter from "use-react-router";
import MessageItem from "./Chat/MessageItem";
import { useIGMState } from "../context/IGMState";

const Container = styled.div`
  display: flex;
  flex-direction: column-reverse;
  overflow-y: auto;
  width: 100%;
  padding: 0 15px;
`;

const Chat = ({ messages, currentUserId }) => {
  return (
    <Container>
      {messages
        .filter(m => m.item_type !== "action_log")
        .map(message => (
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

const ChatContainers = () => {
  const {
    threadMessages,
    user,
    onHomeClick,
    onGetMoreMessages,
    onLogin
  } = useIGMState();
  const { match } = useReactRouter();
  const { threadId } = match.params;
  
  React.useEffect(()=>{
    onGetMoreMessages(threadId)
  }, [])

  return (
    <>
      <HeaderContainer>
        <button type="button" onClick={onLogin}>
          Login
        </button>

        <button type="button" onClick={onHomeClick}>
          Home
        </button>

        <button type="button" onClick={()=>onGetMoreMessages(threadId)}>
          Get Messages
        </button>
      </HeaderContainer>

      <Chat messages={Object.values(threadMessages[threadId] || {})} currentUserId={user.pk} />
    </>
  );
};

export default ChatContainers;
