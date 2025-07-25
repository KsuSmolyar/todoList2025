export const themes = {
    light: "light",
    dark: "dark"
} as const;

export type ThemeModeType = keyof typeof themes;
