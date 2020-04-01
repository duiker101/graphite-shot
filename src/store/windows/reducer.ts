import {CodeWindow} from "./types";
import {WINDOW_ADD, WINDOW_SET_COLOR, WINDOW_REMOVE} from "./actions";

export interface WindowsState {
    windows: { [id: string]: CodeWindow },
    selected: number
}

let windowIdIndex = 0

const initialState: WindowsState = {
    windows: {[windowIdIndex]: {color: "#263238"}},
    selected: 0
};

export default (state = initialState, action: any) => {
    switch (action.type) {
        case WINDOW_ADD: {
            const newid = ++windowIdIndex;
            return {...state, windows: {...state.windows, [++windowIdIndex]: {color: "#263238"}}, selected: newid};
        }

        case WINDOW_REMOVE: {
            const newWindows = Object.fromEntries(Object.entries(state.windows).filter(([id, _]) => id !== action.id))
            return {
                ...state,
                windows: {...newWindows},
                selected: state.selected === action.id ? 0 : state.selected
            };
        }
        case WINDOW_SET_COLOR: {
            const draft = state.windows[action.id];
            draft.color = action.color;
            return {...state, windows: {...state.windows, [action.id]: draft}};
        }
        default: {
            return {...state};
        }
    }
};
