import type { TodoItem } from "../../store/todoList/types";
import { todoCategories, todoFilters, todoSorter, type TodoCategoriesType, type TodoFilterType, type TodoSorterType } from "../../types/todo";

interface IGetFilteredListArgs {
    filter: TodoFilterType,
    savedStore: TodoItem[],
    sortType: TodoSorterType,
    category: TodoCategoriesType
}

export const getFilteredList = ({
    filter, 
    savedStore, 
    sortType,
    category
}: IGetFilteredListArgs) => {
        let list = savedStore;

        switch(filter) {
            case todoFilters.Completed: {
                list = list.filter((item) => item.completed);
                break;
            }
            case todoFilters.Not_completed: {
                list = list.filter((item) => !item.completed);
                break;
            }
        }

        switch(sortType) {
            case todoSorter.asc: {
                list = [...list].sort((a,b) => a.text.localeCompare(b.text));
                break;
            }
            case todoSorter.desc: {
                list = [...list].sort((a, b) => b.text.localeCompare(a.text));
                break;
            }
            case todoSorter.deadline: {
                list = [...list].sort((a, b) => {
                    if (!a.deadline) return 1;
                    if (!b.deadline) return -1;
                    return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
                });
                break;
            }
        }

       if(category !== todoCategories.all) {
            list = list.filter((item) => item.category === category)
       }

        return list;
    }
