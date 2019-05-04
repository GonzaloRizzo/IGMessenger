import React from "react";
import styled from "styled-components";
import ChatItem from "./ChatList/ChatItem";
import { useIGMState } from "../context/IGMState";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

const ChatList = ({ threads, onChatClick }) => {
  return (
    <Container>
      {threads
        .map(chat => ({
          threadId: chat.thread_id,
          name: chat.thread_title,
          lastMessage:
            chat.last_permanent_item.text ||
            `<${chat.last_permanent_item.item_type}>`,
          photo: chat.users[0].profile_pic_url
        }))
        .map(thread => (
          <ChatItem
            key={thread.threadId}
            onClick={() => onChatClick(thread.threadId)}
            {...thread}
          />
        ))}
    </Container>
  );
};

const HeaderContainer = styled.div`
  width: 100%;
`;

const ChatListContainer = () => {
  const {
    threads,
    onLogin,
    onGetChats,
    onThreadClick,
  } = useIGMState()

  return (
    <>
      <HeaderContainer>
        <button type="button" onClick={onLogin}>
          Login
        </button>

        <button type="button" onClick={onGetChats}>
          Get Chats
        </button>
      </HeaderContainer>

      {/* TODO: Rename chats to threads */}
      <ChatList threads={threads} onChatClick={onThreadClick} />
    </>
  );
};

export default ChatListContainer;
