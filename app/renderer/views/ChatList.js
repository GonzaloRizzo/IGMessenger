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

const ChatListContainer = () => {
  const {
    threads,
    onGetChats,
    onThreadClick,
  } = useIGMState()

  React.useEffect(() => {
    onGetChats()
  }, []);

  // TODO: Rename chats to threads
  return (
      <ChatList threads={threads} onChatClick={onThreadClick} />
  );
};

export default ChatListContainer;
