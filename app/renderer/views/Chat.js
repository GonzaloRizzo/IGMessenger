import React from 'react';
import styled from 'styled-components';
import useReactRouter from 'use-react-router';
import { useIGMState } from '../context/IGMState';
import InfiniteFeed from '../components/InfiniteFeed';
import MessageItem from './Chat/MessageItem';
import ChatHeader from './Chat/ChatHeader';

const Chat = ({
  onBackClick,
  loadMoreItems,
  messages,
  currentUserId,
  threadUser
}) => {
  return (
    <Chat.Container>
      <ChatHeader
        onBackClick={onBackClick}
        username={threadUser.username}
        userPicURL={threadUser.profile_pic_url}
      />
      <Chat.Feed>
        <InfiniteFeed
          reversed
          loadMoreItems={loadMoreItems}
          itemCount={messages.length}
          renderItem={({ ref, index }) => (
            <MessageItem
              ref={ref}
              {...messages[index]}
              sentByCurrentUser={messages[index].user_id === currentUserId}
            />
          )}
        />
      </Chat.Feed>
    </Chat.Container>
  );
};

Chat.Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

Chat.Feed = styled.div`
  flex-grow: 1;
`;

const ChatContainers = () => {
  const {
    threads,
    threadMessages,
    user,
    onGetMoreMessages,
    onHomeClick
  } = useIGMState();
  const { match } = useReactRouter();
  const { threadId } = match.params;

  React.useEffect(() => {
    onGetMoreMessages(threadId);
  }, []);

  const thread = threads.find(t => t.thread_id === threadId);
  const threadUser = thread.users[0];

  return (
    <Chat
      onBackClick={onHomeClick}
      loadMoreItems={() => onGetMoreMessages(threadId)}
      messages={Object.values(threadMessages[threadId] || {}).filter(
        m => m.item_type !== 'action_log'
      )}
      currentUserId={user.pk}
      threadUser={threadUser}
    />
  );
};

export default ChatContainers;
