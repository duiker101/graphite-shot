import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit";

import rootReducer, {RootState} from "./reducer";

const store = configureStore({
	reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;

export type AppThunk<T> = ThunkAction<T, RootState, unknown, Action<string>>;

export default store;
