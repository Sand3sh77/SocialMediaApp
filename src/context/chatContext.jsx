import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./authContext";
import { io } from "socket.io-client";
import { SocketApi } from "../api/Api";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
    const [chatId, setChatId] = useState(false);
    const [recepientId, setRecepientId] = useState(false);
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const [callApi, setCallApi] = useState(true);

    useEffect(() => {
        const newSocket = io(SocketApi);
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

    // SEND MESSAGE
    useEffect(() => {
        if (socket === null) return;

        socket.emit("sendMessage", { ...newMessage, recepientId });

    }, [newMessage]);

    // UPDATE/RECEIVE MESSAGE
    useEffect(() => {
        if (socket === null) return;

        socket.on("getMessage", res => {
            setCallApi(!callApi);

            if (chatId !== res.chatId) return;

            setMessages((prev) => [res, ...prev]);
        });

        return () => {
            socket.off("getMessage");
        }

    }, [socket, chatId]);

    return (
        <ChatContext.Provider value={{ chatId, setChatId, recepientId, setRecepientId, onlineUsers, setOnlineUsers, messages, setMessages, newMessage, setNewMessage, callApi, setCallApi }}>
            {children}
        </ChatContext.Provider>
    );
}