import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";
import {RootState} from "./reducer";

interface CodeWindow {
	color: string;
	image?: string;
	scaling: number;
	id: string;
}

let windowIdIndex = 0;

export interface WindowsState {
	windows: {[id: string]: CodeWindow};
	selected: string;
}

const initialState: WindowsState = {
	windows: {
		"0": {color: "#263238", id: "0", scaling: 1 / window.devicePixelRatio},
	},
	selected: "0",
};

const slice = createSlice({
	name: "windows",
	initialState,
	reducers: {
		addWindow(state) {
			const newId = ++windowIdIndex;
			state.windows[newId] = {
				id: newId.toString(),
				color: "#263238",
				scaling: 1 / window.devicePixelRatio,
			};
		},
		removeWindow(state, action: PayloadAction<string>) {
			delete state.windows[action.payload];
		},
		setWindowImage(
			state,
			{payload: {id, image}}: PayloadAction<{id: string; image: string}>
		) {
			state.windows[id].image = image;
		},
		setWindowColor(
			state,
			{payload: {id, color}}: PayloadAction<{id: string; color: string}>
		) {
			state.windows[id].color = color;
		},
		setWindowScaling(
			state,
			{payload: {id, scale}}: PayloadAction<{id: string; scale: number}>
		) {
			state.windows[id].scaling = scale;
		},
		selectWindow(state, action: PayloadAction<string>) {
			state.selected = action.payload;
		},
	},
});

export const {
	addWindow,
	removeWindow,
	setWindowColor,
	setWindowImage,
	selectWindow,
	setWindowScaling,
} = slice.actions;

export default slice.reducer;

export function useWindowState(selector: (state: WindowsState) => any) {
	return useSelector((s: RootState) => selector(s.windows));
}

export const useWindows = (): {[id: string]: CodeWindow} => {
	return useWindowState(s => s.windows);
};

export const useWindow = (id: string): CodeWindow => {
	return useWindowState(s => s.windows[id] ?? null);
};
