import { ThemeToggler } from "../ThemeToggler";
import styles from "./Header.module.css";

export const Header = () => {
    return (
        <header className={styles.header}>
            <p>📃 My TodoList</p>
            <ThemeToggler />
        </header>
    )
}
