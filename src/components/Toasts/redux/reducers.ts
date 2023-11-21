import { Toast } from '@/interfaces';
import { SET_TOASTS, REMOVE_TOAST, ADD_TOAST, ToastActions } from './actions';

export type IToasts = Toast[];

const initialToastState: IToasts = [];

export const toasts = (state: IToasts = initialToastState, action: ToastActions) => {
  let updatedToasts: Toast[]; // Declare the variable outside the switch statement

  switch (action.type) {
    case SET_TOASTS:
      return [
        ...state,
      ];
    case REMOVE_TOAST:
      updatedToasts = state.filter((toast) => toast.id !== action.toastId);
      return [...updatedToasts];
    case ADD_TOAST:
      return [...state, action.toast];
    default:
      return state;
  }
};