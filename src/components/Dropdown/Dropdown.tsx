import { useRef, useState } from "react";
import styles from "./Dropdown.module.css";
import type { IDropdownProps } from "./types";
import classNames from "classnames";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useToggle } from "../../hooks/useToggle";

export const Dropdown = <T extends React.ReactNode,>({
    label, 
    items,
    onSelectItem
}: IDropdownProps<T>) => {
    const [labelValue, setLabelValue] = useState<T>(label);
    const {value: open, toggle: toggleOpen, setValue: setOpen} = useToggle(false)
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
    const containerRef = useRef<HTMLDivElement | null>(null)
    
    const handleToggleClick = () => {
       toggleOpen()
    }

    const handleSelectClick = (text: T) => {
        setLabelValue(text);
        setOpen(false);
        onSelectItem?.(text)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        switch(e.key) {
            case "ArrowDown": {
                e.preventDefault();
                setOpen(true);
                setHighlightedIndex(prev => (prev + 1) % items.length);
                break;
            }
            case "ArrowUp": {
                e.preventDefault();
                setOpen(true);
                setHighlightedIndex(prev => (prev - 1 + items.length) % items.length);
                break;
            }

            case "Enter": {
                if(open && highlightedIndex >= 0) {
                    onSelectItem?.(items[highlightedIndex])
                    setLabelValue(items[highlightedIndex])
                    setOpen(false)
                } else {
                    setOpen(true)
                }
                break;
            }

            case "Escape": {
                setOpen(false);
                setHighlightedIndex(-1);
                break;
            }
        }
    }

    useClickOutside(containerRef, () => {
        setOpen(false);
        setHighlightedIndex(-1);
    })
    
    return (
        <div 
            ref={containerRef}
            tabIndex={0}
            role="combobox"
            aria-expanded={open}
            aria-haspopup="listbox"
            className={styles.dropdown}
            onKeyDown={handleKeyDown}
            aria-activedescendant={highlightedIndex >= 0 ? `option-${highlightedIndex}` : undefined}
        >
            <button
                onClick={(e) => {
                    if (e.detail === 0) return;
                    handleToggleClick()
                }}
                className={styles.openBtn}
            >
                {labelValue}
                <span className={classNames(styles.chevron, open ? styles.rotated : "")}>▼</span>
            </button>
            <ul 
                className={classNames(styles.body, open ? styles.isOpen : "")}
                role="listbox"
            >
                {items.map((item, index) => {
                    return (
                        <li 
                            key={index}
                            id={`option-${index}`}
                            role="option"
                            onClick={() => handleSelectClick(item)}
                            className={classNames(styles.item, `${index === highlightedIndex ? styles.highlighted : ''}`)}
                            onMouseEnter={() => setHighlightedIndex(index)}
                        >
                            {item}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
