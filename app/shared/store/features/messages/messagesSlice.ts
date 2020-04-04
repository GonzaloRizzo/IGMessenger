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

interface ThreadState {
  isLoading: boolean;
  moreAvailable: boolean;
  cursor?: string;
}

const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState<{
    threadState: Record<string, ThreadState>;
  }>({
    threadState: {}
  }),
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(fetchThreadMessages.pending, (state, action) => {
        const { threadId } = action.meta.arg;
        if (!state.threadState[threadId]) {
          state.threadState[threadId] = {
            isLoading: true,
            moreAvailable: true
          };
        } else {
          state.threadState[threadId].isLoading = true;
        }
      })
      .addCase(fetchThreadMessages.fulfilled, (state, action) => {
        const { messages = [], threadState } = action.payload;
        const { threadId } = action.meta.arg;

        messagesAdapter.upsertMany(state, messages);

        const { cursor, moreAvailable } = threadState;
        state.threadState[threadId] = {
          isLoading: false,
          cursor,
          moreAvailable
        };
      })
      .addCase(sendMessage.fulfilled, (state, action) => {})
});

export const { selectAll: selectAllMessages } = messagesAdapter.getSelectors(
  (state: any) => state.messages
);

export const makeSelectMessagesByThreadId = (threadId: string) => {
  const selectThreadData = (state): ThreadState =>
    state.messages.threadState?.[threadId] || {
      isLoading: false,
      moreAvailable: true
    };

  return createSelector(
    selectAllMessages,
    selectThreadData,
    (messages, threadState) => ({
      messages: messages.filter(e => e.threadId === threadId),
      threadState
    })
  );
};

const { reducer } = messagesSlice;
export default reducer;
