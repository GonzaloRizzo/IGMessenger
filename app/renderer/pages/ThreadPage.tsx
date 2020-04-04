import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';

import {
  makeSelectMessagesByThreadId,
  fetchThreadMessages,
  sendMessage,
  MessageItem
} from '../../shared/store/features/messages/messagesSlice';
import InfiniteFeed from '../components/InfiniteFeed';

export default function ThreadPage() {
  const { threadId } = useParams();

  const selectMessages = React.useMemo(
    () => makeSelectMessagesByThreadId(threadId),
    [threadId]
  );
  const { messages, threadState } = useSelector(selectMessages);
  const { moreAvailable, isLoading } = threadState;
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchThreadMessages({ threadId }));
  }, []);

  return (
    <div style={{ height: '80vh' }}>
      <h1>{threadId}</h1>
      <MessageInput
        onSend={text => dispatch(sendMessage({ threadId, text }))}
      />
      <InfiniteFeed
        hasMoreItems={moreAvailable}
        isLoadingItems={isLoading}
        reversed
        renderLoadingIndicator={() => 'loading'}
        itemCount={messages.length}
        loadMoreItems={async () => {
          await dispatch(fetchThreadMessages({ threadId }));
        }}
        renderItem={({ index, ref }) => (
          <Message index={index} message={messages[index]} ref={ref} />
        )}
      />
    </div>
  );
}

interface MessageProps {
  message: MessageItem;
  index: number;
}

// eslint-disable-next-line react/display-name
const Message = React.forwardRef<any, MessageProps>(
  ({ message, index }, ref) => (
    <div ref={ref}>
      {index} - <b>{message.item_type}:</b> {message.text}
    </div>
  )
);

interface MessageInputProps {
  onSend(text: string);
}

const MessageInput = ({ onSend }: MessageInputProps) => {
  const [text, setText] = React.useState('');

  return (
    <input
      type="text"
      value={text}
      onKeyDown={e => e.key === 'Enter' && onSend(text).then(() => setText(''))}
      onChange={e => setText(e.target.value)}
    />
  );
};
