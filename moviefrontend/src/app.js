import React from "react";
import { RouterProvider } from "react-router-dom";
import { ContextProviders } from "./components/context";

import router from "./router";
import adminRouter from "./adminRouter";
import {useAuth} from "./components/hooks"

function App() {
  const {authInfo} = useAuth()
 
  const isAdmin = authInfo?.profile?.role === "admin"


  if(isAdmin) {
    return (
      <ContextProviders>
        <RouterProvider router={adminRouter} />
      </ContextProviders>
    )
  }

    return (
      <>
        <ContextProviders>
          <RouterProvider router={router} />
        </ContextProviders>
      </>
    );
  
}

export default App;
