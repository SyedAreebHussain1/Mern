import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DeleteTodoType {
  data: any;
  loading: boolean;
  error: string | null;
}

const initialState: DeleteTodoType = {
  data: null,
  loading: false,
  error: null,
};

const deleteTodoSlice = createSlice({
  name: "deleteTodoSlice",
  initialState,
  reducers: {
    deleteTodo(state) {
      state.loading = true;
    },
    deleteTodoSuccess(state, action: PayloadAction<any>) {
      state.data = action.payload;
      state.loading = false;
    },
    deleteTodoFailure(state, action: PayloadAction<any>) {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    },
  },
});

export const { deleteTodo, deleteTodoSuccess, deleteTodoFailure } =
  deleteTodoSlice.actions;

export default deleteTodoSlice.reducer;
