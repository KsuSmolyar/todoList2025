import type { ButtonHTMLAttributes, ReactNode } from "react"

export type IButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string,
    onClick?: () => void,
    variant?: ButtonVariant,
    label?: ReactNode,
    iconLeft?: ReactNode,
    iconRight?: ReactNode,
    disabled?: boolean,
    loading?: boolean
}


export const buttonVariants = {
    primary: "primary",
    secondary: "secondary"
} as const;

export type ButtonVariant = keyof typeof buttonVariants;
