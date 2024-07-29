import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  employee: null,
  loading: false,
  error: null,
};

const EmployeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    getEmployeeRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getEmployeeSuccess: (state, action) => {
      state.loading = false;
      state.employee = action.payload;
    },
    getEmployeeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getEmployeeRequest, getEmployeeSuccess, getEmployeeFailure } = EmployeeSlice.actions;
export default EmployeeSlice.reducer;
