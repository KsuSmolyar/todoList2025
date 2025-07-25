import classNames from "classnames";
import styles from "./Button.module.css";
import { buttonVariants, type IButtonProps } from "./types";
import { memo } from "react";

export const Button = memo(({
    className,
    onClick,
    variant = "primary",
    label,
    iconLeft,
    iconRight,
    disabled = false,
    loading = false
}: IButtonProps) => {
    return (
        <button 
            className={classNames(styles.button, className,
                {
                    [styles.secondary]: variant=== buttonVariants.secondary,
                    [styles.primary]: variant === buttonVariants.primary

                }
            )}
            onClick={onClick}
            disabled={disabled || loading}
        >
            {!!iconLeft && <span>{iconLeft}</span>}
            {label}
            {!!iconRight && <span>{iconRight}</span>}
        </button>
    )
});
