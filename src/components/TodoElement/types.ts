import type { TodoCategoriesType } from "../../types/todo";

export interface ITodoElementProps {
    completed: boolean,
    text: string,
    id: number,
    deadline: string | null,
    category: TodoCategoriesType
}
