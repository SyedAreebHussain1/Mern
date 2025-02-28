import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PostTodoType {
  data: any;
  loading: boolean;
  error: string | null;
}

const initialState: PostTodoType = {
  data: null,
  loading: false,
  error: null,
};

const postTodoSlice = createSlice({
  name: "postTodoSlice",
  initialState,
  reducers: {
    postTodo(state) {
      state.loading = true;
    },
    postTodoSuccess(state, action: PayloadAction<any>) {
      state.data = action.payload;
      state.loading = false;
    },
    postTodoFailure(state, action: PayloadAction<any>) {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    },
  },
});

export const { postTodo, postTodoSuccess, postTodoFailure } =
  postTodoSlice.actions;

export default postTodoSlice.reducer;
