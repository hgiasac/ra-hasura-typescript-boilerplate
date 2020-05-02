export enum Theme {
  Light = "Light",
  Dark = "Dark",
}

export type ConfigState = {
  readonly theme: Theme
};

export const CHANGE_THEME = "CHANGE_THEME";

export type ChangeThemeAction = {
  readonly type: typeof CHANGE_THEME
  readonly payload: Theme
};

export type ConfigAction
  = ChangeThemeAction;
