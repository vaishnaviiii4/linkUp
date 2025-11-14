import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  signinReducer,
  MeetReducer,
  MessageReducer,
} from "./Reducers/UserReducer";

const middleware = [thunk];

const RootReducer = combineReducers({
  user: signinReducer,
  MeetReducer,
  messages: MessageReducer,
});

const Store = createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default Store;
