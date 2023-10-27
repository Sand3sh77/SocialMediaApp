import { useContext } from "react";
import "./chat.scss";
import { ChatContext } from "../../context/chatContext";

const Chat = () => {
    const { chatId, setChatId } = useContext(ChatContext);

    return (
        <div className="chat-container">
            {chatId}
        </div>
    )
}

export default Chat;