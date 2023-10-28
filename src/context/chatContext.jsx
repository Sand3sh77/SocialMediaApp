import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./authContext";
import { io } from "socket.io-client";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
    const [chatId, setChatId] = useState(false);
    const [recepientId, setRecepientId] = useState(false);
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const newSocket = io("http://localhost:3000");
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        }

    }, [currentUser])

    // ADD ONLINE USERS
    useEffect(() => {
        if (socket === null) return;
        socket.emit("addNewUser", currentUser?.id);
        socket.on("getOnlineUsers", (res) => {
            setOnlineUsers(res);
        })

        return () => {
            socket.off("getOnlineUsers");
        }
    }, [socket]);

    return (
        <ChatContext.Provider value={{ chatId, setChatId, recepientId, setRecepientId, onlineUsers, setOnlineUsers }}>
            {children}
        </ChatContext.Provider>
    );
}