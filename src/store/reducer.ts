import {combineReducers} from "@reduxjs/toolkit";
import windows from "./windows";
import {useSelector} from "react-redux";

const rootReducer = combineReducers({windows});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

export function useRootState(selector: (state: RootState) => any) {
	return useSelector((s: RootState) => selector(s));
}
