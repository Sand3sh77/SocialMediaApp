import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    // const navigate= useNavigate();
    const [userToken, setUserToken] = useState(
        JSON.parse(localStorage.getItem('token')) || 'invalid'
    );

    const [currentUser, setCurrentUser] = useState({
        loginStatus: true,
    });

    useEffect(() => {
        localStorage.setItem("token", JSON.stringify(userToken));

        // TOKEN CHECK API
        const url = "http://localhost/social/api/authentication/token.php";
        const checkToken = async () => {
            try {
                const resp = await axios.post(url, { token: userToken }, {
                    headers: {
                        "Content-Type": "multipart/form-data", "Accept": "application/json",
                    }
                })

                if (resp.data.status === 200) {
                    const data = resp.data.data[0];
                    setCurrentUser({
                        ...data, loginStatus: true
                    });
                    // navigate("/");
                    console.log(document.location);
                    if(document.location.pathname ==='/') return;

                    document.location.replace("/");
                }
                else {
                    setCurrentUser({
                        loginStatus: false,
                    });
                }
            }
            catch (error) {
                console.error("Error:", error);
            }
        }
        checkToken();
    }, [userToken]);

    return (
        <AuthContext.Provider value={{ currentUser,userToken, setUserToken,setCurrentUser }}>
            {children}
        </AuthContext.Provider>
    );
}