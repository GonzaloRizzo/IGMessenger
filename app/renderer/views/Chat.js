import React from 'react';
import useReactRouter from 'use-react-router';
import { useIGMState } from '../context/IGMState';
import InfiniteFeed from '../components/InfiniteFeed';
import MessageItem from './Chat/MessageItem';

const Chat = ({ loadMoreItems, messages, currentUserId }) => {
  return (
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
  );
};

const ChatContainers = () => {
  const { threadMessages, user, onGetMoreMessages } = useIGMState();
  const { match } = useReactRouter();
  const { threadId } = match.params;

  React.useEffect(() => {
    onGetMoreMessages(threadId);
  }, []);

  return (
    <Chat
      loadMoreItems={() => onGetMoreMessages(threadId)}
      messages={Object.values(threadMessages[threadId] || {}).filter(
        m => m.item_type !== 'action_log'
      )}
      currentUserId={user.pk}
    />
  );
};

export default ChatContainers;
