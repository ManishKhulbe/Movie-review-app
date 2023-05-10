/* eslint-disable*/
import React, { createContext, useState } from "react";

export const NotificationContext = createContext();
const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState("");
  const [classes, setClasses] = useState("");
let timeOutId;
  const updateNotification = (type, value) => {
    if(timeOutId) clearTimeout(timeOutId)
    switch (type) {
      case "error":
        setClasses("bg-red-500");
        break;
      case "success":
        setClasses("bg-green-500");
        break;
      case "warning":
        setClasses("bg-orange-500");
        break;
      default:
        setClasses("bg-green-500");
    }

    setNotification(value)
    timeOutId = setTimeout(()=>{
        setNotification('')
    },3000)
  };
  return (
    <NotificationContext.Provider value={{ updateNotification }}>
      {children}
     {notification && <div className="fixed left-1/2 -translate-x-1/2 top-24 rounded  ">
        <div
          className={
            classes + " bounce-custom shadow-md shadow-gray-400 "
          }
        >
          <p className="text-white px-4 py-2 font-semibold ">{notification}</p>
        </div>
      </div>}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
