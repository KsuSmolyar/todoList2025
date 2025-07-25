import { useCallback, useState } from "react"

type UseToggleResult = {
  value: boolean;
  toggle: () => void;
  setValue: (val: boolean) => void;
};

export const useToggle = (initialValue = false): UseToggleResult  => {
    const [value, setValue] = useState(initialValue);

    const toggle = useCallback(() => {
        setValue(prev => !prev)
    },[])

    return {value, toggle, setValue}
}
