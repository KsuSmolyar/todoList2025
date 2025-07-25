import type { ReactNode } from "react";
import type { TodoCategoriesType } from "../../types/todo";

export interface TodoItem {
    id: number,
    text: string,
    completed: boolean,
    category: TodoCategoriesType,
    deadline: string | null;
}


export const todoActions = {
    addTodo: "addTodo",
    removeTodo: "removeTodo",
    editTodo: "editTodo",
    changeCompleted: "changeCompleted",
    reorderTodo: "reorderTodo"
} as const;

export type TodoActionTypes = 
{type: typeof todoActions.addTodo, payload: TodoItem} |
{type: typeof todoActions.removeTodo, payload: number} |
{type: typeof todoActions.changeCompleted, payload: number} |
{type: typeof todoActions.editTodo, payload: TodoItem} |
{type: typeof todoActions.reorderTodo, payload: TodoItem[]}


export type TodoListContextValue = {
    savedStore: TodoItem[],
    dispatch: React.Dispatch<TodoActionTypes>
}


export interface ITodoListProviderProps {
    children: ReactNode
}
