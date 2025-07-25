import { useEffect, useState } from "react";
import styles from "./ThemeToggler.module.css";
import { getTheme } from "../../utils/getTheme";
import { themes, type ThemeModeType } from "../../types/themes";
import { THEME_KEY } from "../../constants";

export const ThemeToggler = () => {
    const [theme, setTheme] = useState<ThemeModeType>(getTheme)
    
    const handleThemeChange = () => {
        if(theme === themes.dark) setTheme(themes.light)
        if(theme === themes.light) setTheme(themes.dark)
    }
    
    useEffect(() => {
        document.documentElement.dataset.theme = theme
        localStorage.setItem(THEME_KEY, theme)
    },[theme])

    return (
        <label className={styles.themeToggler}>
            <input
                type="checkbox"
                name="themeToggler"
                onChange={handleThemeChange}
                checked={theme === themes.dark}
                className={styles.input}
            />
            <span className={styles.slider} />
            <span className={styles.wave}/>
        </label>
    )
}
