import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GetTodoType {
  data: any;
  loading: boolean;
  error: string | null;
}

const initialState: GetTodoType = {
  data: null,
  loading: false,
  error: null,
};

const getTodoSlice = createSlice({
  name: "getTodoSlice",
  initialState,
  reducers: {
    getTodo(state) {
      state.loading = true;
    },
    getTodoSuccess(state, action: PayloadAction<any>) {
      state.data = action.payload;
      state.loading = false;
    },
    getTodoFailure(state, action: PayloadAction<any>) {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    },
  },
});

export const { getTodo, getTodoSuccess, getTodoFailure } = getTodoSlice.actions;

export default getTodoSlice.reducer;
