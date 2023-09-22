import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const DarkModeContext = createContext();

export const DarkModeContextProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(
        JSON.parse(localStorage.getItem('darkMode')) || false
    );

    const Toggle = () => {
        setDarkMode(!darkMode);
        toast.success("Theme changed sucessfully")
    }
    useEffect(() => {
        localStorage.setItem('darkMode', darkMode);
    }, [darkMode])
    return (
        <DarkModeContext.Provider value={{ darkMode, Toggle }}>
            {children}
        </DarkModeContext.Provider>
    );
}