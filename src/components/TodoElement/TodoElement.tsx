import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { changeCompleted, editTodo, removeTodo } from "../../store/todoList/actions";
import { useTodoListContext } from "../../store/todoList/context";
import styles from "./TodoElement.module.css";
import type { ITodoElementProps } from "./types";
import type { TodoItem } from "../../store/todoList/types";
import classNames from "classnames";
import { format, isBefore } from "date-fns";
import { Button } from "../UI/Button";

export const TodoElement = ({completed, text, id, deadline, category}: ITodoElementProps) => {
    const {dispatch} = useTodoListContext();
    const [editedVal, setEditedVal] = useState(text);
    const [isVisible, setIsVisible] = useState(false);
    const editInputRef = useRef<HTMLInputElement>(null);

    const isOverdue = deadline && isBefore(new Date(deadline), new Date()) && !completed;

    const handleRemoveTodo = (id: number) => {
        dispatch(removeTodo(id))
    }

    const handleChangeCompleted = (id: number) => {
        dispatch(changeCompleted(id));
    }

    const handleClickOnEdit = () => {
        setIsVisible(true);
    }

    const handleChangeTodo = (e: ChangeEvent<HTMLInputElement>) => {
        setEditedVal(e.target.value)
    }

    const handleEditTodo = () => {
        const newTodo:TodoItem = {
            id,
            category,
            completed,
            deadline,
            text: editedVal
        }
        dispatch(editTodo(newTodo))
        setIsVisible(false);
    }

    useEffect(() => {
        if(editInputRef.current && isVisible) {
            console.log("FOCUS")
            editInputRef.current.focus()
        }
    },[isVisible])

    return (
        <div className={classNames(styles.todoEl, styles[`category-${category}`], `${isOverdue ? styles.overdue : ""}`)}>
            <div className={classNames(styles.textBlock, isVisible ? styles.textInvisible : "")}>
                <input
                type="checkbox"
                checked={completed}
                onChange={() => handleChangeCompleted(id)}
                />
                <span>{text}</span>
                {!!deadline && (
                    <div className="deadline">
                        ⏰ {format(new Date(deadline), "dd.MM.yyyy HH:mm")}
                    </div>
                )}
                <Button 
                    aria-label="Редактировать задачу"
                    onClick={handleClickOnEdit} 
                    className={styles.editBtn}
                    label={"✏️"}
                />  
                
            </div>
            <div className={classNames(styles.editBlock, isVisible ? styles.editVisible : "")}>
                <input
                    ref={editInputRef}
                    onChange={handleChangeTodo}
                    value={editedVal}
                    name="editTodo"
                />
                <Button 
                    aria-label="Сохранить изменения"
                    onClick={handleEditTodo} 
                    className={styles.approveBtn}
                    label={"✅"}
                />  
            </div>
            <Button 
                aria-label="Удалить задачу"
                onClick={() => handleRemoveTodo(id)} 
                className={styles.removeBtn}
                label={"❌"}
            />  
        </div>
    )
}
