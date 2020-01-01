import { CHANGE_THEME, IChangeThemeAction, Theme } from "./types";

export function changeTheme(theme: Theme): IChangeThemeAction {
  return {
    type: CHANGE_THEME,
    payload: theme,
  };
}
