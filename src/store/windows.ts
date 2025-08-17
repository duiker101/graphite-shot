import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";
import {RootState} from "./reducer";

interface CodeWindow {
	color: string;
	image?: string;
	scaling: number;
	shadow?: string;
	id: string;
}

let windowIdIndex = 0;

export interface WindowsState {
	windows: {[id: string]: CodeWindow};
	selected: string;
}

const initialState: WindowsState = {
	windows: {
		"0": {
			color: "#263238",
			shadow: "10px 10px 20px #00000066",
			id: "0",
			scaling: 1 / window.devicePixelRatio,
		},
	},
	selected: "0",
};

const slice = createSlice({
	name: "windows",
	initialState,
	reducers: {
		addWindow(state) {
			const newId = (++windowIdIndex).toString();
			state.windows[newId] = {
				id: newId,
				color: "#263238",
				shadow: "10px 10px 20px #00000066",
				scaling: 1 / window.devicePixelRatio,
			};
			state.selected = newId;
		},
		removeWindow(state, action: PayloadAction<string>) {
			delete state.windows[action.payload];
			state.selected = Object.values(state.windows)[0].id;
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
		setWindowShadow(
			state,
			{payload: {id, shadow}}: PayloadAction<{id: string; shadow: string}>
		) {
			state.windows[id].shadow = shadow;
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
	setWindowShadow,
	setWindowScaling,
} = slice.actions;

export default slice.reducer;

export function useWindowState(selector: (state: WindowsState) => any) {
	return useSelector((s: RootState) => selector(s.windows));
}

export const useWindows = (): {[id: string]: CodeWindow} => {
	return useWindowState((s) => s.windows);
};

export const useWindow = (id: string): CodeWindow => {
	return useWindowState((s) => s.windows[id] ?? null);
};

export const useSelectedWindow = (): CodeWindow => {
	const {windows, selected} = useWindowState((s) => s);
	return windows[selected];
};
