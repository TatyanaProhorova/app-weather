import {createContext, Dispatch, SetStateAction} from "react";

interface ThemeContextValue {
    value: 'dark' | 'light';
    changeValue: Dispatch<SetStateAction<"dark" | "light">>;
}

export const ThemeContext = createContext<ThemeContextValue>({
    value: 'dark',
    changeValue: () => {},
});
