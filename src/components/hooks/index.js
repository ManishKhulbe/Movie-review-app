import { useContext } from "react";
import { NotificationContext } from "../context/NotificationProvider";
import { ThemeContext } from "../context/themeProvider";
import { AuthContext } from "../context/AuthProvider";

export const useTheme =()=> useContext(ThemeContext)
export const useNotification =()=> useContext(NotificationContext)
export const useAuth =()=> useContext(AuthContext)
