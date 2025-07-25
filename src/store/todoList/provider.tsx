import { useEffect, useReducer } from "react";
import { initialTodoListState, TodoListContext } from "./context";
import { todoActions, type ITodoListProviderProps, type TodoActionTypes, type TodoItem } from "./types";
import { TODO_LIST_KEY } from "../../constants";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const reducer  = (state: TodoItem[], action: TodoActionTypes) => {
    switch(action.type) {
        case todoActions.addTodo: 
            return [
                ...state,
                action.payload
            ]
        case todoActions.removeTodo: {
            const filtered = state.filter((todo: TodoItem) => todo.id !== action.payload)
            return filtered;
        }
        case todoActions.changeCompleted: {
            const newState = state.map((todo: TodoItem) => {
                return todo.id === action.payload ?
                {...todo,completed: !todo.completed} 
                : todo
            })
            return newState
        }
        case todoActions.editTodo: {
            const newState = state.map((todo) => {
                return todo.id === action.payload.id ?
                action.payload 
                : todo
            })
            return newState
        }
        case todoActions.reorderTodo:
            return action.payload
    }
}

export const TodoListContextProvider = ({children}: ITodoListProviderProps) => {
    const initState = (): TodoItem[] => {
        const data = localStorage.getItem(TODO_LIST_KEY);
        return data ? JSON.parse(data) : initialTodoListState;
    }
    const [store, dispatch] = useReducer(reducer, initialTodoListState, initState);
    const [savedStore, setSavedStore] = useLocalStorage(TODO_LIST_KEY, store);

    useEffect(() => {
        setSavedStore(store)
    },[setSavedStore, store])

    return (
        <TodoListContext.Provider value={{savedStore, dispatch}}>
            {children}
        </TodoListContext.Provider>
    )
}
