export interface ISorterTabsProps<T> {
    items: ISorterItem<T>[],
    sortType: T,
    setSortType: (arg0:T) => void
}

export interface ISorterItem<T> {
    title: string,
    type: T
}
