import { createSlice } from '@reduxjs/toolkit';

export type EmployeeState = any;

const initialState: EmployeeState = null;

export const adminSlice = createSlice({
  name: 'admin',
  initialState: initialState,
  reducers: {
    employeeDetail: (state, action) => {
      state = action.payload;

      return state;
    },
  },
});

export const { employeeDetail } = adminSlice.actions;

export default adminSlice.reducer;
