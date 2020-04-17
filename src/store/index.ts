import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit";

import rootReducer, {RootState} from "./reducer";

const store = configureStore({
	reducer: rootReducer,
});

if (process.env.NODE_ENV === "development" && module.hot) {
	module.hot.accept("./reducer", () => {
		const newRootReducer = require("./reducer").default;
		store.replaceReducer(newRootReducer);
	});
}

export type AppDispatch = typeof store.dispatch;

export type AppThunk<T> = ThunkAction<T, RootState, unknown, Action<string>>;

export default store;
