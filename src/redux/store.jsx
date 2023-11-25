// store.js
import { configureStore } from '@reduxjs/toolkit';
import expenseListReducer from '../redux/expenseListSlice';

const store = configureStore({
  reducer: {
    expenseList: expenseListReducer,
  },
});

export default store;
