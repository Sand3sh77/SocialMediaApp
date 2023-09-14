import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem('user')) || null
    );

    const login = () => {
        setCurrentUser(
            {
                loginStatus: true,
                id: 7,
                name: "Sandesh Subedi",
                img: "../src/assets/profile.jpg",
            }
        )
    }
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser])
    return (
        <AuthContext.Provider value={{ currentUser, login }}>
            {children}
        </AuthContext.Provider>
    );
}