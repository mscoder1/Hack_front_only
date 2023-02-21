import { combineReducers, configureStore } from "@reduxjs/toolkit";
import appReducer from "./app.reducer";

const rootReducer = combineReducers({
  app: appReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: import.meta.env.MODE !== "production",
});

export default store;

export type RootDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
