import classNames from "classnames";
import { TODO_CATEGORY, TODO_FILTER_KEY, TODO_SORTER_KEY } from "../../constants";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useTodoListContext } from "../../store/todoList/context";
import { todoCategories, todoFilters, todoSorter, type TodoCategoriesType, type TodoFilterType, type TodoSorterType } from "../../types/todo";
import { Dropdown } from "../Dropdown";
import { SorterTabs } from "../SorterTabs";
import { TodoElement } from "../TodoElement";
import { TodoPanel } from "../TodoPanel";
import { getFilteredList } from "./getFilteredList";
import { categoriesList, filters, sorterTabs } from "./mock";
import styles from "./TodoList.module.css";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import type { DroppableProvided, DraggableStateSnapshot, DraggableProvided, DropResult } from "@hello-pangea/dnd";
import { reorderTodo } from "../../store/todoList/actions";
import type { TodoItem } from "../../store/todoList/types";
import { Button } from "../UI/Button";
import { requestNotificationPermission } from "../../utils/requestNotificationPermission";
import { useEffect } from "react";

export const TodoList = () => {
    const {savedStore, dispatch} = useTodoListContext();
    const [filter, setFilter] = useLocalStorage<TodoFilterType>(TODO_FILTER_KEY,todoFilters.Show_all);
    const [sortType, setSortType] = useLocalStorage<TodoSorterType>(TODO_SORTER_KEY,todoSorter.none);
    const [savedCategory, setSavedCategory] = useLocalStorage<TodoCategoriesType>(TODO_CATEGORY, todoCategories.all)

    const filteredTodoList = getFilteredList({savedStore, filter, sortType, category: savedCategory});

    const isSortable = 
    filter === todoFilters.Show_all &&
    sortType === todoSorter.none &&
    savedCategory === todoCategories.all;

    const displayedList = isSortable ? savedStore : filteredTodoList;

    const handleDragEnd = (result: DropResult) => {
        const { destination, source } = result;

        if (!destination) return;
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const updatedList = Array.from(savedStore);
        const [movedItem] = updatedList.splice(source.index, 1);
        updatedList.splice(destination.index, 0, movedItem);

        dispatch(reorderTodo(updatedList));
    }

    const handlePermissionClick = () => {
        requestNotificationPermission()
    }

    useEffect(() => {
        if (!("Notification" in window)) return;
        if (Notification.permission !== "granted") return;

        const timeouts: number[] = [];

        savedStore.forEach(todo => {
            if (!todo.deadline || todo.completed) return;

            const deadlineTime = new Date(todo.deadline).getTime();
            const now = Date.now();
            const fiveMinutesBefore = deadlineTime - 5 * 60 * 1000;
            const delay = fiveMinutesBefore - now;

            if (delay > 0) {
                const timeout = setTimeout(() => {
                    new Notification("⏰ Напоминание", {
                        body: `${todo.text} — дедлайн через 5 минут!`,
                    });
                }, delay);

                timeouts.push(timeout);
            }
    });

    return () => {
        timeouts.forEach(clearTimeout);
    };
}, [savedStore]);
    
    return (
        <div className={styles.list}>
            <TodoPanel/>
            <div className={styles.dropdownContainer}>
                 <Dropdown<TodoFilterType>
                    label={filter} 
                    items={filters} 
                    onSelectItem={setFilter}
                />
                <Dropdown<TodoCategoriesType>
                    label={savedCategory} 
                    items={categoriesList} 
                    onSelectItem={setSavedCategory}
                />
            </div>
            <SorterTabs items={sorterTabs} sortType={sortType} setSortType={setSortType}/>
            <Button label="Разрешить уведомления о истечение дедлайна" onClick={handlePermissionClick}/>
            
           { isSortable && !!displayedList.length &&
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="todoList">
                        {(provided: DroppableProvided) => (
                            <ul 
                                className={classNames(styles.todoList,  styles.dropped)}
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {displayedList.map((todo, index) => {
                                    return (
                                        <Draggable key={todo.id.toString()} draggableId={todo.id.toString()} index={index}>
                                            {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                                                <li
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className={classNames(styles.todoItem, `${snapshot.isDragging ? styles.dragging : ""}`)}
                                                    title="Перетащите для сортировки"
                                                >
                                                    <TodoElement 
                                                        key={todo.id}
                                                        id={todo.id} 
                                                        completed={todo.completed} 
                                                        deadline={todo.deadline} 
                                                        text={todo.text}
                                                        category={todo.category}
                                                    />
                                                </li>
                                                )}
                                        </Draggable>
                                    )
                                })}
                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>
           }

           {!isSortable && !!displayedList.length && (
            <ul className={styles.todoList}>
                {displayedList.map((todoEl: TodoItem) => {
                    return (
                        <TodoElement 
                            key={todoEl.id}
                            id={todoEl.id} 
                            completed={todoEl.completed} 
                            deadline={todoEl.deadline} 
                            text={todoEl.text}
                            category={todoEl.category}
                        />
                    )
                })}
            </ul>
           )

           }
            {/* {displayedList.map((todoEl: TodoItem) => {
                return (
                    <TodoElement 
                        key={todoEl.id}
                        id={todoEl.id} 
                        completed={todoEl.completed} 
                        deadline={todoEl.deadline} 
                        text={todoEl.text}
                        category={todoEl.category}
                    />
                )
            })} */}
        </div>
    )
}
