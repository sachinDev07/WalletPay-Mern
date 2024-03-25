import { createContext, useContext } from "react";

interface ThemeContextArgs {
  themeMode: string;
  darkTheme: () => void;
  lightTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextArgs>({
  themeMode: "light",
  darkTheme: () => {},
  lightTheme: () => {},
});

export const ThemeProvider = ThemeContext.Provider;

export default function useTheme() {
  return useContext(ThemeContext);
}
