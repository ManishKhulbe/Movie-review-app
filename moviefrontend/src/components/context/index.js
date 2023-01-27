import React from "react";
import { AuthProvider } from "./AuthProvider";
import NotificationProvider from "../context/NotificationProvider";
import ThemeProvider from "../context/themeProvider";

export const ContextProviders = ({ children }) => {
  return (
    <AuthProvider>
      <NotificationProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </NotificationProvider>
    </AuthProvider>
  );
};
