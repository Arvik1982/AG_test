import { configureStore } from '@reduxjs/toolkit';
import appSlice from '../store/slices/appSlice';
import regSlice from './slices/regSlice';

export default configureStore({
  reducer: {
    appRedux: appSlice,
    regRedux: regSlice,
  },
});
