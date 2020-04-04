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
  const messages = useSelector(selectMessages);
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
        itemCount={messages.length}
        loadMoreItems={() => dispatch(fetchThreadMessages({ threadId }))}
        renderItem={({ index, ref }) => (
          <Message message={messages[index]} ref={ref} />
        )}
      />
    </div>
  );
}

interface MessageProps {
  message: MessageItem;
}

// eslint-disable-next-line react/display-name
const Message = React.forwardRef<any, MessageProps>(({ message }, ref) => (
  <div ref={ref}>
    <b>{message.item_type}:</b> {message.text}
  </div>
));

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
