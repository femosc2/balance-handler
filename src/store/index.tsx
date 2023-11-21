import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { IToasts, toasts } from "../components/Toasts/redux/reducers";
import { api } from "@/utilities/http";

export interface IStore {
  toasts: IToasts;
}

const rootReducer = combineReducers({
  toasts,
  [api.reducerPath]: api.reducer, // Add the RTK Query reducer under its path
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware), // Add the RTK Query middleware
});

export default store;
