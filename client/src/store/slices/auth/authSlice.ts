import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthStateType {
  userData: any;
  isAuth: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthStateType = {
  userData: null,
  isAuth: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    //for signin
    signIn(state) {
      state.loading = true;
    },
    signInSuccess(state, action: PayloadAction<any>) {
      state.isAuth = true;
      state.userData = action.payload;
      state.loading = false;
    },
    signInFailure(state, action: PayloadAction<any>) {
      state.loading = false;
      state.isAuth = false;
      state.userData = null;
      state.error = action.payload;
    },
    // when user is logout
    signOut(state) {
      state.loading = false;
      state.isAuth = false;
      state.userData = null;
    },
    //for signup
    signUp(state) {
      state.loading = true;
    },
    signUpSuccess(state, action: PayloadAction<any>) {
      state.isAuth = true;
      state.userData = action.payload;
      state.loading = false;
    },
    signUpFailure(state, action: PayloadAction<any>) {
      state.loading = false;
      state.isAuth = false;
      state.userData = null;
      state.error = action.payload;
    },
  },
});

export const {
  signIn,
  signInSuccess,
  signInFailure,
  signOut,
  signUp,
  signUpSuccess,
  signUpFailure,
} = authSlice.actions;

export default authSlice.reducer;
