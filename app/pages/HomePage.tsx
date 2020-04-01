/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'RootTypes';

import {
  fetchThreads,
  selectAllThreads,
  ThreadItem
} from '../store/features/threads/threadsSlice';
import {
  fetchThreadMessages,
  selectMessagesByThreadId
} from '../store/features/messages/messagesSlice';
import InfiniteFeed from '../components/InfiniteFeed';

export default function HomePage() {
  const dispatch = useDispatch();
  const threads: ThreadItem[] = useSelector((state: RootState) =>
    selectAllThreads(state.threads)
  );

  useEffect(() => {
    dispatch(fetchThreads());
  }, []);

  return (
    <div>
      <h1>Que anda lavanda?</h1>
      <div style={{ height: '90vh' }}>
        <InfiniteFeed
          itemCount={threads.length}
          renderItem={({ ref, index }) =>
            threads[index] ? (
              <UserButton ref={ref} key={index} thread={threads[index]} />
            ) : (
              <div ref={ref}>unknown</div>
            )
          }
          loadMoreItems={() => dispatch(fetchThreads())}
        />
      </div>
    </div>
  );
}

interface UserButtonArgs {
  thread: ThreadItem;
}
// eslint-disable-next-line react/display-name, @typescript-eslint/no-explicit-any
const UserButton = React.forwardRef<any, UserButtonArgs>(({ thread }, ref) => {
  const dispatch = useDispatch();
  const messages = useSelector(selectMessagesByThreadId(thread.thread_id));

  return (
    <div ref={ref} style={{ margin: '10px 0' }}>
      <button
        type="button"
        onClick={() => dispatch(fetchThreadMessages(thread.thread_id))}
      >
        {thread.users[0].username}- [{messages.length}]
      </button>
    </div>
  );
});
