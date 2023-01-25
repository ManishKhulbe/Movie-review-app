import React from "react";
import { RouterProvider } from "react-router-dom";
import NotificationProvider from "./components/context/NotificationProvider";
import ThemeProvider from "./components/context/themeProvider";
import router from "./router";

function App() {
  return (
    <>
      <NotificationProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </NotificationProvider>
    </>
  );
}

export default App;
