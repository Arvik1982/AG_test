import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { regResponse } from '../../Types/Types';

const regSlice = createSlice({
  name: 'reg',
  initialState: {
    email: '',
    password1: '',
    password2: '',
    regResponseUser: {
      token: '',
    },
  },
  reducers: {
    setUserMail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setUserPass1(state, action: PayloadAction<string>) {
      state.password1 = action.payload;
    },
    setUserPass2(state, action: PayloadAction<string>) {
      state.password2 = action.payload;
    },

    setRegResponseUser(state, action: PayloadAction<regResponse>) {
      state.regResponseUser = action.payload;
    },
  },
});

export const { setUserMail, setUserPass1, setUserPass2, setRegResponseUser } = regSlice.actions;

export default regSlice.reducer;
