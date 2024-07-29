import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Slice/slice'
import employeReducer from '../Slice/getEmployee'
import { thunk } from 'redux-thunk';

const store = configureStore({
  reducer: {
    user: userReducer,
    allemployee:employeReducer
   
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
