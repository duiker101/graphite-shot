import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import {combineReducers} from "redux";
import windows, {WindowsState} from "./windows/reducer";

export interface RootState {
    windows: WindowsState;
}

const rootReducer = combineReducers<RootState>({
    windows,
});

const middleware = applyMiddleware(thunkMiddleware);

const Index = createStore(rootReducer, composeWithDevTools(middleware));

export default Index;
