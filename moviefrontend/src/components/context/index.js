import React from "react";
import { AuthProvider } from "./AuthProvider";
import NotificationProvider from "../context/NotificationProvider";
import ThemeProvider from "../context/themeProvider";
import SearchProvider from "./SearchProvider";

export const ContextProviders = ({ children }) => {
  return (
    <NotificationProvider>
      <SearchProvider>
        <AuthProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </AuthProvider>
      </SearchProvider>
    </NotificationProvider>
  );
};
