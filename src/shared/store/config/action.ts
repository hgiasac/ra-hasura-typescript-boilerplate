import { CHANGE_THEME, ChangeThemeAction, Theme } from "./types";

export function changeTheme(theme: Theme): ChangeThemeAction {
  return {
    type: CHANGE_THEME,
    payload: theme
  };
}
