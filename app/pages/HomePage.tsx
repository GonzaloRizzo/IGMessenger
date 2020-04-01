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
      <button type="button" onClick={() => dispatch(fetchThreads())}>
        get more
      </button>
      {threads.map(thread => (
        <UserButton thread={thread} key={thread.thread_id} />
      ))}
    </div>
  );
}

interface UserButtonArgs {
  thread: ThreadItem;
}
export function UserButton({ thread }: UserButtonArgs) {
  const dispatch = useDispatch();
  const messages = useSelector(selectMessagesByThreadId(thread.thread_id));

  return (
    <button
      type="button"
      onClick={() => dispatch(fetchThreadMessages(thread.thread_id))}
    >
      {thread.users[0].username}- [{messages.length}]
    </button>
  );
}
