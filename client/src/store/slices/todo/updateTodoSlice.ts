import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UpdateTodoType {
  data: any;
  loading: boolean;
  error: string | null;
}

const initialState: UpdateTodoType = {
  data: null,
  loading: false,
  error: null,
};

const updateTodoSlice = createSlice({
  name: "updateTodoSlice",
  initialState,
  reducers: {
    updateTodo(state) {
      state.loading = true;
    },
    updateTodoSuccess(state, action: PayloadAction<any>) {
      state.data = action.payload;
      state.loading = false;
    },
    updateTodoFailure(state, action: PayloadAction<any>) {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    },
  },
});

export const { updateTodo, updateTodoSuccess, updateTodoFailure } =
  updateTodoSlice.actions;

export default updateTodoSlice.reducer;
