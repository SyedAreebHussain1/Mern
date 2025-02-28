import { Store, combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth/authSlice";
import updateTodoSlice from "./slices/todo/updateTodoSlice";
import postTodoSlice from "./slices/todo/postTodoSlice";
import deleteTodoSlice from "./slices/todo/deleteTodoSlice";
import getTodoSlice from "./slices/todo/getTodoSlice";

// Root slices is a combination of all slices
const rootSlices = combineReducers({
  user: authSlice,
  updateTodo: updateTodoSlice,
  postTodo: postTodoSlice,
  deleteTodo: deleteTodoSlice,
  getTodo: getTodoSlice,
});

//middleware is used to serialize the data
export const store: Store = configureStore({
  middleware: (serialData) =>
    serialData({
      serializableCheck: false,
    }),
  reducer: rootSlices,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
