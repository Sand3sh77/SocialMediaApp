import { useContext, useEffect, useState } from "react";
import "./chats.scss";
import { AuthContext } from "../../context/authContext";
import toast from "react-hot-toast";
import Api, { ChatApi } from "../../api/Api";
import axios from "axios";
import { ProfileSvg } from "../../assets/svg/svg";
import { Link } from "react-router-dom";

const Chats = () => {
    const { currentUser } = useContext(AuthContext);
    const [chats, setChats] = useState([]);
    const [suggestedChats, setSuggestedChats] = useState([]);
    const [callApi, setCallApi] = useState(true);

    useEffect(() => {
        if (currentUser) {
            const url = `${ChatApi}chats/${currentUser?.id}`;
            const getUserChats = async () => {
                try {
                    const resp = await axios.get(url, {
                        headers: {
                            "Content-Type": "multipart/form-data", "Accept": "application/json",
                        }
                    })
                    if (resp.status === 200) {
                        setChats(resp.data.resp);
                        setSuggestedChats(resp.data.suggestedChatUsers);
                    }
                    else {
                        toast.error(resp.data.message);
                    }
                } catch (error) {
                    console.error("Error:", error);
                }
            }
            getUserChats();
        }
    }, [currentUser, callApi])

    const handleClick = async (firstId) => {
        const url = `${ChatApi}chats`;
        try {
            const resp = await axios.post(url, { firstId: firstId, secondId: JSON.parse(currentUser.id) }, {
                headers: {
                    "Content-Type": "application/json",
                }
            })
            if (resp.status === 200) {
                setCallApi(!callApi);
            }
            else {
                toast.error(resp.data.message);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <div className='chats-container'>
            <h2>Chats</h2>
            <h4>Create Chat</h4>
            <div className="suggestionArea">
                {suggestedChats.map((schat) => {
                    return (
                        <div className="items sitems" key={schat.id} onClick={() => handleClick(schat.id)}>
                            {schat.profilePic ?
                                <>
                                    {
                                        schat.profilePic.split('/')[0] === 'api' ?
                                            <img
                                                src={Api + schat.profilePic}
                                                alt=""
                                                className=""
                                            />
                                            :
                                            <img
                                                src={schat.profilePic}
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
                            <span>{schat.name}</span>
                        </div>
                    );
                })}
            </div>
            <h4>All Chats</h4>
            {chats != [] ?
                <>
                    {
                        chats.map((chat) => {
                            return (
                                <div className="items" key={chat.user_data.id}>
                                    {chat.user_data.profilePic ?
                                        <>
                                            {
                                                chat.user_data.profilePic.split('/')[0] === 'api' ?
                                                    <img
                                                        src={Api + chat.user_data.profilePic}
                                                        alt=""
                                                        className=""
                                                    />
                                                    :
                                                    <img
                                                        src={chat.user_data.profilePic}
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
                                    <div>
                                        <Link to={`/profile/${chat.user_data.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            {chat.user_data.name}<br />
                                        </Link>
                                        <span>Text Message</span>
                                    </div>
                                    <span className="timestamp">24 hr ago</span>
                                </div>
                            );
                        })
                    }
                </>
                : <div className="empty">No chats available.</div>
            }

        </div>
    )
}


export default Chats