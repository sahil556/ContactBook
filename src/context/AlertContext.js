import { createContext, useState } from "react"
import React from "react";

export const AlertContext = createContext()

export function AlertProvider(props) {
    const [alert, setAlert] = useState(null);
    const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

    return (
        <AlertContext.Provider value={{ showAlert, alert}}>
            {props.children}
        </AlertContext.Provider>
    )
}