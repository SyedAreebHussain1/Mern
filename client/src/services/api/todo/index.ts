import { del, get, getError, patch, post } from "../../../utils/baseApi";
import { AppDispatch } from "../../../store/store";
import { ENDPOINT } from "../../../utils/constant/apiEndPoints";
import { successMessage } from "../../../utils/message";
import {
  postTodo,
  postTodoSuccess,
  postTodoFailure,
} from "../../../store/slices/todo/postTodoSlice";
import {
  updateTodo,
  updateTodoSuccess,
  updateTodoFailure,
} from "../../../store/slices/todo/updateTodoSlice";
import {
  deleteTodo,
  deleteTodoSuccess,
  deleteTodoFailure,
} from "../../../store/slices/todo/deleteTodoSlice";
import {
  getTodo,
  getTodoSuccess,
  getTodoFailure,
} from "../../../store/slices/todo/getTodoSlice";

export const postTodoApi = async (
  dispatch: AppDispatch,
  body: {
    title: string;
    deadline: string;
    description: string;
  },
  onSuccess: () => void
) => {
  dispatch(postTodo());
  try {
    const response = await post<any>(ENDPOINT.todos.todo, body);
    dispatch(postTodoSuccess(response));
    successMessage(response?.message);
    onSuccess();
  } catch (err) {
    getError(err);
    dispatch(postTodoFailure("Error"));
  }
};

export const getTodoApi = async (dispatch: AppDispatch) => {
  dispatch(getTodo());
  try {
    const response = await get<any>(ENDPOINT.todos.todo);
    dispatch(getTodoSuccess(response?.data));
  } catch (err) {
    getError(err);
    dispatch(getTodoFailure("Error"));
  }
};
export const deleteTodoApi = async (dispatch: AppDispatch, id: string) => {
  dispatch(deleteTodo());
  try {
    const response = await del<any>(`${ENDPOINT.todos.todo}/${id}`);
    dispatch(deleteTodoSuccess(response));
    successMessage(response?.message);
  } catch (err) {
    getError(err);
    dispatch(deleteTodoFailure("Error"));
  }
};

export const updateTodoApi = async (
  dispatch: AppDispatch,
  body: {
    title: string;
    deadline: string | null;
    description: string;
  },
  id: string,
  onSuccess: () => void
) => {
  dispatch(updateTodo());
  try {
    const response = await patch<any>(`${ENDPOINT.todos.todo}/${id}`, body);
    dispatch(updateTodoSuccess(response));
    onSuccess();
    successMessage(response?.message);
  } catch (err) {
    getError(err);
    dispatch(updateTodoFailure("Error"));
  }
};
