import { THEME_KEY } from "../constants";
import { themes, type ThemeModeType } from "../types/themes"

export const getTheme = () => {
    if(typeof window === 'undefined') return themes.dark;

    const theme = window?.localStorage?.getItem(THEME_KEY) as ThemeModeType;

    if(Object.values(themes).includes(theme)) return theme;

    const userMedia = window.matchMedia('(prefers-color-scheme: light)');

    if(userMedia.matches) return themes.light

    return themes.dark
}
