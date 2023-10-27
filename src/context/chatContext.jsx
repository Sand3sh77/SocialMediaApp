import { createContext, useEffect, useState } from "react";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
    const [chatId, setChatId] = useState(user || false);

    return (
        <ChatContext.Provider value={{ chatId, setChatId }}>
            {children}
        </ChatContext.Provider>
    );
}