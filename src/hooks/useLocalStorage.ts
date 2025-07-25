import { useEffect, useState } from "react";

export const useLocalStorage = <T>(key: string, initialValue: T) => {
    // const initFn = () => {
    //     const data = localStorage.getItem(key);
    //     return data ? JSON.parse(data) : initialValue
    // }

    // const [value, setValue] = useState(initFn);

    // useEffect(() => {
    //     localStorage.setItem(key, JSON.stringify(value))
    // },[key,value])

    // return [value, setValue] as const;
        const initFn = () => {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : initialValue;
        } catch (err) {
            console.warn(`Ошибка чтения из LS по ключу ${key}:`, err);
            return initialValue
        }
    }

    const [value, setValue] = useState(initFn);

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value))
        } catch (err) {
            console.warn(`Ошибка при записи в LS по ключу ${key}:`, err)
        }
    },[key, value])

    return [value, setValue] as const;
}



















export const useLs = <T,>(key: string, initialValue: T) => {
    const initFn = () => {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : initialValue;
        } catch (err) {
            console.warn(`Ошибка чтения из LS по ключу ${key}:`, err);
            return initialValue
        }
    }

    const [value, setValue] = useState(initFn);

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value))
        } catch (err) {
            console.warn(`Ошибка при записи в LS по ключу ${key}:`, err)
        }
    },[key, value])

    return [value, setValue] as const;
}
