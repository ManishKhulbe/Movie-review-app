import React from "react";
import { AuthProvider } from "./AuthProvider";
import NotificationProvider from "../context/NotificationProvider";
import ThemeProvider from "../context/themeProvider";

export const ContextProviders = ({ children }) => {
  return (
    <NotificationProvider>
      <AuthProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </AuthProvider>
    </NotificationProvider>
  );
};
