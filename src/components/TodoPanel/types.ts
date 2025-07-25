import type { TodoCategoriesType } from "../../types/todo";

export interface ITodoPanelProps {
    category: TodoCategoriesType,
    setCategory: (arg:TodoCategoriesType) => void
}
