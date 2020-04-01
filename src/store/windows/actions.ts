export const WINDOW_ADD = "window/add";
export const WINDOW_SET_COLOR = "window/color/set";
export const WINDOW_REMOVE = "window/remove";

export const windowAdd = () => ({type: WINDOW_ADD});

export const windowRemove = () => ({type: WINDOW_REMOVE});

export const windowSetColor = (id: string, color: string) => ({type: WINDOW_SET_COLOR, id, color});
