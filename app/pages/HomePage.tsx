import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'RootTypes';

import {
  fetchThreads,
  selectAllThreads,
  ThreadItem
} from '../store/features/threads/threadsSlice';

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
        <div key={thread.thread_id}>{thread.users[0].username}</div>
      ))}
    </div>
  );
}
