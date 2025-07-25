export interface IDropdownProps<T> {
    label: T,
    items: T[],
    onSelectItem?: (arg0:T) => void
}
