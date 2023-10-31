import { useContext, useEffect, useState } from "react";
import "./chat.scss";
import { ChatContext } from "../../context/chatContext";
import axios from "axios";
import Api, { ChatApi } from "../../api/Api";
import { AuthContext } from "../../context/authContext";
import { CrossOutlineSvg, ProfileSvg } from "../../assets/svg/svg";
import { Link } from "react-router-dom";
import InputEmoji from "react-input-emoji";
import SendIcon from '@mui/icons-material/Send';
import toast from "react-hot-toast";
import moment from "moment";

const Chat = () => {
    const { chatId, setChatId, recepientId, onlineUsers, messages, setMessages, newMessage, setNewMessage } = useContext(ChatContext);
    const { currentUser } = useContext(AuthContext);
    const [recepientInfo, setRecepientInfo] = useState(null);

    const [text, setText] = useState("");

    useEffect(() => {
        const findChat = async () => {
            const url = `${ChatApi}chats/find/${currentUser?.id}/${recepientId}`;
            try {
                const resp = await axios.get(url, {
                    headers: {
                        "Content-Type": "multipart/form-data", "Accept": "application/json",
                    }
                })
                if (resp.status === 200) {
                    setRecepientInfo(resp.data[0]);
                }
                else {
                    toast.error(resp.data.message);
                }
            }
            catch (error) {
                console.error("Error:", error);
            }

        }
        findChat();
        const getMessages = async () => {
            const url = `${ChatApi}messages/${chatId}`;
            try {
                const resp = await axios.get(url, {
                    headers: {
                        "Content-Type": "multipart/form-data", "Accept": "application/json",
                    }
                })
                if (resp.status === 200) {
                    setMessages(resp.data);
                }
                else {
                    toast.error(resp.data.message);
                }
            }
            catch (error) {
                console.error("Error:", error);
            }
        }
        getMessages();

    }, [chatId])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = `${ChatApi}messages`;
        try {
            const resp = await axios.post(url, { chatId, senderId: currentUser.id, text }, {
                headers: {
                    "Content-Type": "application/json",
                }
            })
            if (resp.status === 200) {
                setText('');
                setNewMessage(resp.data);
                setMessages([resp.data, ...messages])
            }
            else {
                toast.error(resp.data.message);
            }
        }
        catch (error) {
            console.error("Error:", error);
        }
    }
    return (
        <div className="chat-container">
            <div className="top">
                <div>
                    {recepientInfo?.recepient_data[0].profilePic ?
                        <>
                            {
                                recepientInfo?.recepient_data[0].profilePic.split('/')[0] === 'api' ?
                                    <img
                                        src={Api + recepientInfo?.recepient_data[0].profilePic}
                                        alt=""
                                        className=""
                                    />
                                    :
                                    <img
                                        src={recepientInfo?.recepient_data[0].profilePic}
                                        alt=""
                                        className=""
                                    />
                            }
                        </>
                        :
                        <>
                            <div className="">
                                <ProfileSvg />
                            </div>
                        </>
                    }
                    {onlineUsers.some((user) => user?.userId == recepientId) ?
                        <div className="online" /> : ""}
                    <Link to={`/profile/${recepientId}`} style={{ textDecoration: 'none', color: 'inherit' }} >
                        <span>{recepientInfo?.recepient_data[0]?.name}</span>
                    </Link>
                </div>
                <div className="cross" onClick={() => setChatId(null)}><CrossOutlineSvg /></div>
            </div>
            <div className="middle">
                {messages.length > 0 ?
                    <>
                        {messages?.map((message) => {
                            return (
                                <div key={message._id} className={message.senderId == currentUser.id ? "ownMessage message" : "otherMessage message"}>
                                    {message.senderId != currentUser.id ?
                                        <div style={{ display: "flex", gap: "0.3rem" }}>
                                            {recepientInfo?.recepient_data[0].profilePic ?
                                                <>
                                                    {
                                                        recepientInfo?.recepient_data[0].profilePic.split('/')[0] === 'api' ?
                                                            <img
                                                                src={Api + recepientInfo?.recepient_data[0].profilePic}
                                                                alt=""
                                                                className=""
                                                            />
                                                            :
                                                            <img
                                                                src={recepientInfo?.recepient_data[0].profilePic}
                                                                alt=""
                                                                className=""
                                                            />
                                                    }
                                                </>
                                                :
                                                <>
                                                    <div style={{ display: "flex", alignItems: "center" }}>
                                                        <ProfileSvg />
                                                    </div>
                                                </>
                                            }
                                            {onlineUsers.some((user) => user?.userId == recepientId) ?
                                                <div className="online" /> : ""}
                                            <span >
                                                {message.text}
                                                <div className="timestamp">{moment.utc(message.createdAt).local().calendar()}
                                                </div>
                                            </span>
                                        </div>
                                        : <span >
                                            {message.text}
                                            <div className="timestamp" style={{ color: "rgba(231, 223, 223)" }}>{moment.utc(message.createdAt).local().calendar()}
                                            </div>
                                        </span>}
                                </div>
                            );
                        })}
                    </>
                    : <div className="empty"> No messages available.</div>
                }
            </div>
            <div className="bottom">
                <form onSubmit={handleSubmit}>
                    <InputEmoji
                        value={text}
                        onChange={setText}
                        placeholder="Type a message"
                    />
                    <button type="submit" className="submit"><SendIcon /></button>
                </form>
            </div>
        </div>
    )
}

export default Chat;