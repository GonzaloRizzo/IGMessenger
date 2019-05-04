import React from "react";
import styled from "styled-components";
import useReactRouter from "use-react-router";
import MessageItem from "./Chat/MessageItem";
import { useIGMState } from "../context/IGMState";

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

const useCurrentThreadId = threadId => {
  const { setCurrentThread } = useIGMState();

  React.useEffect(() => {
    setCurrentThread(threadId);
    return () => {
      if (!threadId) {
        setCurrentThread(threadId);
      }
    };
  }, [threadId]);
};

const ChatContainers = () => {
  const {
    messages,
    user,
    onHomeClick,
    onGetMoreMessages,
    onLogin
  } = useIGMState();
  const { match } = useReactRouter();
  const { threadId } = match.params;

  useCurrentThreadId(threadId);

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
