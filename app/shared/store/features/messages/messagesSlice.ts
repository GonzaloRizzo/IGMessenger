/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import { schema, normalize } from 'normalizr';
import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  createSelector
} from '@reduxjs/toolkit';
import {
  DirectThreadFeedResponseItemsItem,
  DirectInboxFeedResponseItemsItem
} from 'instagram-private-api';
import { plainToClassFromExist } from 'class-transformer';

import igApi from '../../services/igApi';

export type MessageItem = DirectThreadFeedResponseItemsItem &
  DirectInboxFeedResponseItemsItem & {
    threadId: string;
  };

const messagesAdapter = createEntityAdapter<MessageItem>({
  selectId: message => message.item_id,
  sortComparer: (a, b) => parseInt(b.timestamp, 10) - parseInt(a.timestamp, 10)
});

export const messageEntity = new schema.Entity<MessageItem>(
  'messages',
  {},
  {
    idAttribute: 'item_id'
  }
);

interface SendMessageProps {
  threadId: string;
  text: string;
}

interface FetchThreadMessagesProps {
  threadId: string;
  rewind?: boolean;
}

export const fetchThreadMessages = createAsyncThunk(
  'messages/fetchThreadMessages',
  async (
    { threadId, rewind = false }: FetchThreadMessagesProps,
    { getState }
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const state = getState() as any;
    const threadEntities = state.threads.entities;
    const threadData = threadEntities[threadId];

    let thread;
    if (rewind) {
      thread = igApi.feed.directThread({
        thread_id: threadData.thread_id,
        oldest_cursor: undefined
      });
    } else {
      const threadState = state.messages.threadState[threadId] || {};
      thread = igApi.feed.directThread(threadData);
      thread = plainToClassFromExist(thread, threadState); // TODO: Add seq_id somehow;
    }
    const items = await thread.items();
    const newItems = items.map(item => ({
      ...item,
      threadId
    }));
    const normalized = normalize(newItems, [messageEntity]);
    const { messages } = normalized.entities;

    return {
      messages,
      threadState: thread.toPlain()
    };
  }
);

export const sendMessage = createAsyncThunk<any, SendMessageProps>(
  'messages/sendMessage',
  async ({ threadId, text }, { dispatch }) => {
    await igApi.entity.directThread(threadId).broadcastText(text);
    await dispatch(fetchThreadMessages({ threadId, rewind: true }));
  }
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState({
    threadState: {}
  }),
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(fetchThreadMessages.fulfilled, (state, action) => {
        const { messages = [], threadState } = action.payload;
        const { threadId } = action.meta.arg;
        messagesAdapter.upsertMany(state, messages);
        state.threadState[threadId] = threadState;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {})
});

export const { selectAll: selectAllMessages } = messagesAdapter.getSelectors(
  (state: any) => state.messages
);

export const makeSelectMessagesByThreadId = (threadId: string) => {
  return createSelector(selectAllMessages, messages =>
    messages.filter(e => e.threadId === threadId)
  );
};

const { reducer } = messagesSlice;
export default reducer;
