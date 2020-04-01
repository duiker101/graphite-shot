import {useWindowState} from "../hooks";
import {CodeWindow} from "./types";

export const useWindows = (): { [id: string]: CodeWindow } => {
    return useWindowState(s => s.windows)
}

export const useWindow = (id: string): CodeWindow => {
    return useWindowState(s => s.windows[id] ?? null)
}
