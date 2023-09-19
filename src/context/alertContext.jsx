import { createContext, useContext, useState } from "react";

export const AlertContext = createContext();

export const AlertContextProvider = ({ children }) => {
    const [alert, setAlert] = useState(false);

    return (
        <AlertContext.Provider value={{ alert, setAlert }}>
            {children}
        </AlertContext.Provider>
    );
}