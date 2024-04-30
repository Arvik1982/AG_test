import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    userData: {},
    appError: '',
  },
  reducers: {
    setAppErr(state, action: PayloadAction<string>) {
      state.appError = action.payload;
    },

    setUserData(state, action: PayloadAction<{}>) {
      state.userData = action.payload;
    },
  },
});

export const { setUserData, setAppErr } = appSlice.actions;

export default appSlice.reducer;
