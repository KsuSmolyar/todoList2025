import { todoCategories, todoFilters, todoSorter, type TodoCategoriesType, type TodoFilterType, type TodoSorterType } from "../../types/todo";
import type { ISorterItem } from "../SorterTabs/types";

export const filters: TodoFilterType[] = [todoFilters.Show_all, todoFilters.Completed, todoFilters.Not_completed];
export const sorterTabs: ISorterItem<TodoSorterType>[] = [
    {title: "Без сортировки", type: todoSorter.none},
    {title: "A → Z", type: todoSorter.asc},
    {title: "Z → A", type: todoSorter.desc},
    {title: "По дедлайну ↑", type: todoSorter.deadline}
];

export const categoriesList:TodoCategoriesType[] = [todoCategories.all, todoCategories.home, todoCategories.work, todoCategories.study];
