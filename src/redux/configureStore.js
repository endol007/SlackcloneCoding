import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

import userSlice from "./modules/userSlice";
import channelSlice from "./modules/channelSlice";
import dmSlice from "./modules/dmSlice";

export const history = createBrowserHistory();

const reducer = combineReducers({
  user: userSlice.reducer,
  channel: channelSlice.reducer,
  dm: dmSlice.reducer,
  router: connectRouter(history),
});

const middlewares = [];

const env = process.env.NODE_ENV;

// if (env === "development") {     //개발환경에서 로거
//   const { logger } = require("redux-logger");
//   middlewares.push(logger);
// }

export const store = configureStore({
  reducer,
  middleware: [...middlewares, ...getDefaultMiddleware()],
  devTools: env !== "production",
});
