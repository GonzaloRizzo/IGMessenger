/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'RootTypes';
import { push } from 'connected-react-router';

import {
  fetchThreads,
  selectAllThreads,
  ThreadItem
} from '../store/features/threads/threadsSlice';
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
              <UserButton
                ref={ref}
                key={index}
                thread={threads[index]}
                onClick={() => {
                  dispatch(push(`/thread/${threads[index].thread_id}`));
                }}
              />
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
  onClick: (thread_id: string) => void;
}
// eslint-disable-next-line react/display-name, @typescript-eslint/no-explicit-any
const UserButton = React.forwardRef<any, UserButtonArgs>(
  ({ thread, onClick }, ref) => {
    return (
      <div ref={ref} style={{ margin: '10px 0' }}>
        <button type="button" onClick={() => onClick(thread.thread_id)}>
          {thread.users[0].username}
        </button>
      </div>
    );
  }
);
