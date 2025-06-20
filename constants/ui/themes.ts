import { createContext } from 'react'
import { ThemeContextType } from "../../providers/ThemeProvider/types";

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);