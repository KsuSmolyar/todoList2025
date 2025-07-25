import { createContext, useContext } from "react";
import type { TodoItem, TodoListContextValue } from "./types";

export const initialTodoListState: TodoItem[] = [];

export const TodoListContext = createContext<TodoListContextValue>({
    savedStore: initialTodoListState, dispatch: () => {}
})

export const useTodoListContext = () => {
    const context = useContext(TodoListContext);
    if(!context) throw new Error("TodoList использоать совместно с TodoListContext");

    return context;
}
