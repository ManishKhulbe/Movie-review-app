import React from "react";
import { AuthProvider } from "./AuthProvider";
import NotificationProvider from "../context/NotificationProvider";
import ThemeProvider from "../context/themeProvider";
import SearchProvider from "./SearchProvider";
import MovieProvider from "./MovieProvider";

export const ContextProviders = ({ children }) => {
  return (
    <NotificationProvider>
      <SearchProvider>
        <MovieProvider>
          <AuthProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </AuthProvider>
        </MovieProvider>
      </SearchProvider>
    </NotificationProvider>
  );
};
