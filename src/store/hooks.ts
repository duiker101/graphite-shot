import {useSelector} from "react-redux";
import {RootState} from "./index";
import {WindowsState} from "./windows/reducer";

export function useRootState(selector: (state: RootState) => any) {
    return useSelector((s: RootState) => selector(s));
}

export function useWindowState(selector: (state: WindowsState) => any) {
    return useSelector((s: RootState) => selector(s.windows));
}
