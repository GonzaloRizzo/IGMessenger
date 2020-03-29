/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IgApiClient } from 'instagram-private-api';

interface DoLoginArgs {
  username: string;
  password: string;
}

export const doLogin = createAsyncThunk(
  'igState/login',
  async ({ username, password }: DoLoginArgs, thunkAPI) => {
    const igClient = thunkAPI.extra.igClient as IgApiClient;

    await igClient.state.generateDevice(username);
    const res = await igClient.account.login(username, password);
    return res;
  }
);

export const selectIsLogged = state => state.igState.userInfo !== null;

const igStateSlice = createSlice({
  name: 'igState',
  initialState: {
    state: null,
    userInfo: null
  },
  reducers: {
    setState(state, action) {
      state.state = action.payload;
    }
  },
  extraReducers: builder =>
    builder.addCase(doLogin.fulfilled, (state, action) => {
      state.userInfo = action.payload;
    })
});

const { actions, reducer } = igStateSlice;
export const { setState } = actions;
export default reducer;
