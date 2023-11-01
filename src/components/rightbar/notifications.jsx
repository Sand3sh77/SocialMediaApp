import React, { useContext, useEffect, useState } from 'react'
import './notifications.scss';
import Api from '../../api/Api';
import { AuthContext } from '../../context/authContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import { ProfileSvg } from '../../assets/svg/svg';
import moment from 'moment';
import { Link } from 'react-router-dom';

const Notifications = ({ limit }) => {
    const { currentUser } = useContext(AuthContext);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const nurl = `${Api}api/functions/other/notifications?id=${currentUser.id}&limit=${limit}`;
        if (currentUser) {
            const handleNotifications = async () => {
                try {
                    const resp = await axios.get(nurl);
                    if (resp.data.status === 200) {
                        setNotifications(resp.data.data);
                    }
                    else {
                        toast.error(resp.data.message);
                    }
                }
                catch (error) {
                    console.error("Error:", error);
                }
            }
            handleNotifications();
        }
    }, [])
    return (
        <div className="notiItem">
            <span>Latest Activities</span>
            {notifications[0] != null ?
                <>
                    {
                        notifications.map((noti) => {
                            return (
                                <Link to={`/profile/${noti.userId}`} style={{ textDecoration: 'none', color: 'inherit' }} key={noti.id}>
                                    <div className="nuser">
                                        <div className="userInfo">
                                            {noti.profilePic ?
                                                <>
                                                    {
                                                        noti.profilePic.split('/')[0] === 'api' ?
                                                            <img
                                                                src={Api + noti.profilePic}
                                                                alt=""
                                                                className=""
                                                            />
                                                            :
                                                            <img
                                                                src={noti.profilePic}
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
                                            <p>
                                                <span>{noti.name}</span> {noti.notification}
                                            </p>
                                        </div>
                                        <span>
                                            {moment.utc(noti.createdAt).local().fromNow()
                                                .replace('a few seconds', 'a sec')
                                                .replace('a minute', '1 min')
                                                .replace(/minutes?/, 'min')
                                                .replace(/hours?/, 'h')
                                                .replace(/days?/, 'd')
                                                .replace(/months?/, 'mo')
                                                .replace(/years?/, 'y')}
                                        </span>
                                    </div>
                                </Link>
                            );
                        })
                    }
                </> :
                <div className="noUsersFollowed">
                    No recent activities
                </div>
            }
        </div>
    )
}

export default Notifications