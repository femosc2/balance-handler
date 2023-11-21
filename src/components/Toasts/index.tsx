import {
  StyledToast,
  StyledToastTitle,
  StyledToastsContainer,
} from "./Toasts.styles";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { removeToast } from "./redux/actions";
import { Toast } from "@/interfaces";
import { IStore } from "@/store";

const Toasts = () => {
  const toasts = useSelector((state: IStore) => state.toasts);
  const dispatch = useDispatch();

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (toasts.length > 0) {
        const currentTime = Date.now();
        const toastsToRemove = toasts.filter(
          (toast: Toast) => currentTime - toast.time > 5000
        );

        toastsToRemove.forEach((toast: Toast) => {
          dispatch(removeToast(toast.id));
        });
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [toasts]);

  const deleteToast = (id: string) => {
    dispatch(removeToast(id));
  };
  return (
    <StyledToastsContainer>
      {toasts.length > 0 &&
        toasts.map((toast) => {
          return (
            <StyledToast
              status={toast.status}
              onClick={() => deleteToast(toast.id)}
            >
              <StyledToastTitle>
                <strong>{toast.header}!</strong>
              </StyledToastTitle>
              <div>{toast.body}</div>
            </StyledToast>
          );
        })}
    </StyledToastsContainer>
  );
};

export default Toasts;
