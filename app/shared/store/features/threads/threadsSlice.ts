import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter
} from '@reduxjs/toolkit';
import { DirectInboxFeedResponseThreadsItem } from 'instagram-private-api';
import { schema, normalize } from 'normalizr';
import { plainToClassFromExist } from 'class-transformer';

import { messageEntity } from '../messages/messagesSlice';
import igApi from '../../services/igApi';

export type ThreadItem = DirectInboxFeedResponseThreadsItem;

export const threadEntity = new schema.Entity<ThreadItem>(
  'threads',
  {
    items: [messageEntity]
  },
  {
    idAttribute: 'thread_id'
  }
);

const threadsAdapter = createEntityAdapter<ThreadItem>({
  selectId: thread => thread.thread_id,
  sortComparer: (a, b) =>
    parseInt(b.last_activity_at, 10) - parseInt(a.last_activity_at, 10)
});

export const fetchThreads = createAsyncThunk(
  'threads/fetchThreads',
  async (_, { getState }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const state = getState() as any;
    const {
      threads: { inboxState }
    } = state;

    const inbox = plainToClassFromExist(igApi.feed.directInbox(), inboxState);
    const items = await inbox.items();
    const normalized = normalize(items, [threadEntity]);
    const { messages, threads } = normalized.entities;

    return {
      messages,
      threads,
      inboxState: inbox.toPlain()
    };
  }
);

const threadsSlice = createSlice({
  name: 'threads',
  initialState: threadsAdapter.getInitialState({
    inboxState: {}
  }),
  reducers: {},
  extraReducers: builder =>
    builder.addCase(fetchThreads.fulfilled, (state, action) => {
      const { inboxState, threads } = action.payload;
      threadsAdapter.upsertMany(state, threads);
      // eslint-disable-next-line no-param-reassign
      state.inboxState = inboxState;
    })
});

const { reducer } = threadsSlice;
export default reducer;

export const {
  selectAll: selectAllThreads,
  selectEntities: selectThreadEntities,
  selectById: selectThreadById
} = threadsAdapter.getSelectors();
