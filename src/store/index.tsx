import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { IToasts, toasts } from "../components/Toasts/redux/reducers";

export interface IStore {
  toasts: IToasts;
}

export const reducers = combineReducers({
  toasts,
});

const reduxStore = createStore(
  reducers,
  composeWithDevTools(applyMiddleware())
);

export default reduxStore;
