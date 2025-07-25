export const todoCategories = {
    work: "work",
    study: "study",
    home: "home",
    all: "all"
} as const;

export type TodoCategoriesType = keyof typeof todoCategories;

export const todoFilters = {
    Show_all: "Show_all",
    Completed: "Completed",
    Not_completed: "Not_completed"
} as const;

export type TodoFilterType = keyof typeof todoFilters;

export const todoSorter = {
    none: "none",
    asc: "asc",
    desc: "desc",
    deadline: "deadline"
} as const;

export type TodoSorterType = keyof typeof todoSorter;
