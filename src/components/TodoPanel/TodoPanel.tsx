import { useState, type ChangeEvent } from "react";
import { todoCategories, type TodoCategoriesType } from "../../types/todo";
import styles from "./TodoPanel.module.css";
import DatePicker from "react-datepicker";
import { useTodoListContext } from "../../store/todoList/context";
import type { TodoItem } from "../../store/todoList/types";
import { addTodo } from "../../store/todoList/actions";


const categories = [todoCategories.work, todoCategories.study, todoCategories.home];
export const TodoPanel = () => {
    const [task, setTask] = useState("");
    const [category, setCategory] = useState<TodoCategoriesType>(todoCategories.work);
    const [deadline, setDeadline] = useState<Date | null>(null);
    const {dispatch} = useTodoListContext()

    const handleTaskChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTask(e.target.value);

    }

    const handleTaskKeyDown = (e: React.KeyboardEvent) => {
        if(e.key === "Enter") {
            handleAddTask()
        }
    }

    const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.target.value as TodoCategoriesType) 
    }

    const handleAddTask = () => {
        const newTodo:TodoItem = {
            id: Date.now(),
            category,
            completed: false,
            deadline: deadline ? deadline.toISOString() : null,
            text: task
        }

        dispatch(addTodo(newTodo));
        setTask("");
        setDeadline(null);
    }

    return (
        <div className={styles.panel}>
            <label>
                <span>Выберите категорию: </span>
                <select value={category} onChange={handleCategoryChange}>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>
            </label>

            <label>
                <span>Задача: </span>
                <input
                    value={task}
                    onChange={handleTaskChange}
                    onKeyDown={handleTaskKeyDown}
                />
            </label>
            <label>
                <span>Назначьте дедлайн: </span>
                <DatePicker
                    selected={deadline}
                    onChange={(date: Date | null) => setDeadline(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="Время"
                    dateFormat="Pp"
                    placeholderText="Выберите дату и время"
                />
            </label>
            <button
                onClick={handleAddTask}
                disabled={task === ""}
                className={styles.addBtn}
            >
                Добавить задачу
            </button>
        </div>
    )
}
