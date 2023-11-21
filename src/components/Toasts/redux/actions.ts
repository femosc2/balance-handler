import { Toast } from "@/interfaces";

export const SET_TOASTS = "SET_TOASTS";
export const REMOVE_TOAST = "REMOVE_TOAST";
export const ADD_TOAST = "ADD_TOAST";

export type ToastActions =
  | { type: typeof SET_TOASTS; toasts: Toast[] }
  | { type: typeof REMOVE_TOAST; toastId: string }
  | { type: typeof ADD_TOAST; toast: Toast };

export const setToasts = (toasts: Toast[]) => ({
  toasts,
  type: SET_TOASTS,
});

export const removeToast = (toastId: string) => ({
  type: REMOVE_TOAST,
  toastId,
});

export const addToast = (toast: Toast) => ({
  type: ADD_TOAST,
  toast,
});
