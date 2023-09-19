import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(
        JSON.parse(localStorage.getItem('token')) || null
    );

    const login = (data) => {
        setUserToken(data.token);
    }
    useEffect(() => {
        localStorage.setItem("token", JSON.stringify(userToken));

        // TOKEN CHECK API
        const url="http://localhost/social/api/authentication/token.php";
        const checkToken=async()=>{
            try{
                const resp=await fetch(url,{
                    method:"POST",
                    body:JSON.stringify({token:userToken}),
                });
                if (!resp.ok) {
                    throw new Error('Network response was not ok');
                }
                const data=await resp.json();
            }
            catch(error){
                console.error("Error:",error);
            }
        }
        checkToken();
    }, [userToken]);


    const currentUser={
        loginStatus: true,
        id: 7,
        name: "Sandesh Subedi",
        img: "../src/assets/profile.jpg",
    };
    return (
        <AuthContext.Provider value={{ currentUser, login }}>
            {children}
        </AuthContext.Provider>
    );
}