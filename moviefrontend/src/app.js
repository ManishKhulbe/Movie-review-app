import React from "react";
import { RouterProvider } from "react-router-dom";
import { ContextProviders } from "./components/context";

import router from "./router";

function App() {
  return (
    <>
      <ContextProviders>
        <RouterProvider router={router} />
      </ContextProviders>
    </>
  );
}

export default App;
