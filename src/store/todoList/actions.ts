import { todoActions, type TodoItem } from "./types"

export const addTodo = (todo: TodoItem) => {
    return ({
        type: todoActions.addTodo,
        payload: todo
    })
}

export const removeTodo = (id: number) => {
    return ({
        type: todoActions.removeTodo,
        payload: id
    })
}


export const changeCompleted = (id: number) => {
    return ({
        type: todoActions.changeCompleted,
        payload: id
    })
}

export const editTodo = (todo: TodoItem) => {
    return ({
        type: todoActions.editTodo,
        payload: todo
    })
}

export const reorderTodo = (todoList: TodoItem[]) => {
    return ({
        type: todoActions.reorderTodo,
        payload: todoList,
    })
}
