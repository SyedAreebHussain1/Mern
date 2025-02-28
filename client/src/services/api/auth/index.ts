import { getError, post } from "../../../utils/baseApi";
import { AppDispatch } from "../../../store/store";
import { ENDPOINT } from "../../../utils/constant/apiEndPoints";
import { successMessage } from "../../../utils/message";
import { setInStorage } from "../../../utils/storage";
import {
  signIn,
  signInSuccess,
  signInFailure,
  signOut,
  signUp,
  signUpSuccess,
  signUpFailure,
} from "../../../store/slices/auth/authSlice";

export const signUpApi = async (
  dispatch: AppDispatch,
  body: {
    name: string;
    email: string;
    password: string;
  },
  onSuccess: () => void
) => {
  dispatch(signUp());
  try {
    const response = await post<any>(ENDPOINT.auth.signup, body);
    const user = { ...response?.data };
    dispatch(signUpSuccess(user));
    onSuccess();
  } catch (err) {
    getError(err);
    dispatch(signUpFailure("Error"));
  }
};

export const signInApi = async (
  dispatch: AppDispatch,
  body: {
    email: string;
    password: string;
  }
) => {
  dispatch(signIn());
  try {
    const response = await post<any>(ENDPOINT.auth.signin, body);
    const token = response?.token;
    const user = { ...response };
    setInStorage("token", token);
    dispatch(signInSuccess(user));
    successMessage(response?.message);
  } catch (err) {
    getError(err);
    dispatch(signInFailure("Error"));
  }
};

export const signOutUser = async (dispatch: AppDispatch) => {
  dispatch(signOut());
  localStorage.clear();
  window.location.reload();
};
