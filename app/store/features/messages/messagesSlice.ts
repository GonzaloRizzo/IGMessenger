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

export const sendMessage = createAsyncThunk<any, SendMessageProps>(
  'messages/sendMessage',
  ({ threadId, text }) =>
    igApi.entity.directThread(threadId).broadcastText(text)
);

export const fetchThreadMessages = createAsyncThunk(
  'messages/fetchThreadMessages',
  async (threadId: string, { getState }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const state = getState() as any;
    const threadEntities = state.threads.entities;
    const threadData = threadEntities[threadId];
    const threadState = state.messages.threadState[threadId] || {};

    const thread = igApi.feed.directThread(threadData);
    const threadEntity = plainToClassFromExist(thread, threadState); // TODO: Add seq_id somehow;
    const items = await threadEntity.items();
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

const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState({
    threadState: {}
  }),
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(fetchThreadMessages.fulfilled, (state, action) => {
        const { messages, threadState } = action.payload;
        const threadId = action.meta.arg;
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
