// expenseListSlice.js
import { createSlice } from '@reduxjs/toolkit';

const expenseListSlice = createSlice({
  name: 'expenseList',
  initialState: {
    data: [],
    error: null,
    loading: true,
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
      state.error = null;
      state.loading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.data = [];
      state.loading = false;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    deleteExpense: (state, action) => {
        // Modify state to remove the deleted expense
        state.data = state.data.filter(expense => expense.id !== action.payload);
      },
  },
});

export const { setData, setError, setLoading , deleteExpense} = expenseListSlice.actions;
export default expenseListSlice.reducer;
