import React, { createContext, useEffect } from "react";

export const ThemeContext = createContext();
const darkTheme = "dark";
const defaultTheme = "light";
export default function ThemeProvider({ children }) {
  const toggleTheme = () => {
    const OldTheme = getTheme("theme");
    const newTheme = OldTheme === defaultTheme ? darkTheme : defaultTheme;
    updateTheme(newTheme , OldTheme);
  };

  useEffect(() => {
    const theme = getTheme("theme");
    if (!theme) updateTheme(defaultTheme);
    else updateTheme(theme);
  }, []);
  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

const getTheme = (value) => {
  return localStorage.getItem('theme');
};
const updateTheme = (newTheme , themeToRemove) => {
    if (themeToRemove) document.documentElement.classList.remove(themeToRemove)
   document.documentElement.classList.add(newTheme);
  return localStorage.setItem("theme", newTheme);
};
