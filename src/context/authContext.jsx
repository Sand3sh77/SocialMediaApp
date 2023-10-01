import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Api from "../api/Api";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState('');

    const [userToken, setUserToken] = useState(JSON.parse(localStorage.getItem('token')) || false);

    useEffect(() => {
        // TOKEN CHECK API
        const url = `${Api}api/authentication/token`;
        const checkToken = async () => {
            try {
                const resp = await axios.post(url, { token: userToken }, {
                    headers: {
                        "Content-Type": "multipart/form-data", "Accept": "application/json",
                    }
                })

                if (resp.data.status === 200) {
                    const data = resp.data.data[0];
                    setCurrentUser(data);
                    localStorage.setItem("token", JSON.stringify(userToken));
                }
                else {
                    localStorage.setItem('token', false);
                    toast.error(resp.data.message);
                }
            }
            catch (error) {
                console.error("Error:", error);
            }
        }
        checkToken();
    }, [userToken]);

    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser, userToken,setUserToken }}>
            {children}
        </AuthContext.Provider>
    );
}
