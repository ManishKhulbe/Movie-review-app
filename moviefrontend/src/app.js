import React from "react";
import { RouterProvider } from "react-router-dom";
import ThemeProvider from "./components/context/themeProvider";
import router from "./router";


function App() {
  return <>
  <ThemeProvider>
  <RouterProvider router ={router}/>
  </ThemeProvider>
  </>
}

export default App;
