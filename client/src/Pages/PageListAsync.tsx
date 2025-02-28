import { PageLoading } from "../components";
import LazySuspense from "./LazySuspense";

export const SignUpPage = LazySuspense(() => import("./AuthPage/signUp"), {
  fallback: <PageLoading fullPage />,
});
export const SignInPage = LazySuspense(() => import("./AuthPage/signIn"), {
  fallback: <PageLoading fullPage />,
});
export const TodoPage = LazySuspense(() => import("./TodoPage"), {
  fallback: <PageLoading fullPage />,
});
