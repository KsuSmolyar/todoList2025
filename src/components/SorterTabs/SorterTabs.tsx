import classNames from "classnames";
import styles from "./SorterTabs.module.css";
import type { ISorterTabsProps } from "./types";

export const SorterTabs = <T extends React.ReactNode,>({
    items, 
    sortType,
    setSortType
}: ISorterTabsProps<T>) => {

    return (
        <div className={styles.sorter}>
            {items.map((item, index) => {
                return (
                    <button 
                        key={index}
                        className={classNames(styles.sorterBtn, `${sortType === item.type ? styles.focused : "" }`)}
                        onClick={()=> setSortType(item.type)}
                    >
                        {item.title}
                    </button>
                )
            })}
        </div>
    )
}
