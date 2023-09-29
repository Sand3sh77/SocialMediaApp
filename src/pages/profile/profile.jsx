import './profile.scss';
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from '../../components/posts/posts';
import { useContext, useEffect, useState } from 'react';
import axios, { Axios } from 'axios';
import { useParams } from 'react-router-dom';
import { ProfileSvg } from '../../assets/svg/svg';
import { AuthContext } from '../../context/authContext';
import toast from 'react-hot-toast';
import Api from '../../api/Api';

const Profile = () => {
    const [userInfo, setUserInfo] = useState({});
    const { currentUser, userToken, setUserToken, setCurrentUser } = useContext(AuthContext);

    const [isUser, setIsUser] = useState('');

    const params = useParams();
    const url = `${Api}api/functions/profile?id=${params.id}`;

    useEffect(() => {
        window.scrollTo(0, 0);
        const userDetails = async () => {
            try {
                const resp = await axios.get(url, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Accept": "application/json",
                    }
                })
                const userData = resp.data.data[0];
                setUserInfo(userData);
                if (currentUser.id === userData.id) {
                    setIsUser(true);
                } else {
                    setIsUser(false);
                }
            }
            catch (error) {
                console.error("Error:", error);
            }
        }
        userDetails();
    }, [params])



    // LOGOUT API CALL
    const handleLogout = async () => {
        const url = `${Api}api/authentication/logout`;
        const logout = async () => {
            try {
                const resp = await axios.post(url, { token: userToken }, {
                    headers: {
                        "Content-Type": "multipart/form-data", "Accept": "application/json",
                    }
                })
                toast.success(resp.data.message)
            }
            catch (error) {
                console.error("Error:", error);
            }
        }
        setUserToken('invalid');
        setCurrentUser({ loginStatus: false });
        logout();
    }

    return (
        <div className="profile">
            <div className="images">
                <img
                    src={userInfo.coverPic ? Api + userInfo.coverPic : "https://images.pexels.com/photos/7135121/pexels-photo-7135121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                    alt=""
                    className="cover"
                />
                {userInfo.profilePic ?
                    <img
                        src={Api + userInfo.profilePic}
                        alt=""
                        className="profilePic"
                    />
                    : <div className="profilePic svg">
                        <ProfileSvg />
                    </div>
                }
            </div>
            <div className="profileContainer">
                <div className="uInfo">
                    <div className="left">
                        <a href="https://facebook.com">
                            <FacebookTwoToneIcon fontSize="medium" />
                        </a>
                        <a href="https://facebook.com">
                            <InstagramIcon fontSize="medium" />
                        </a>
                        <a href="https://facebook.com">
                            <TwitterIcon fontSize="medium" />
                        </a>
                        <a href="https://facebook.com">
                            <LinkedInIcon fontSize="medium" />
                        </a>
                        <a href="https://facebook.com">
                            <PinterestIcon fontSize="medium" />
                        </a>
                    </div>
                    <div className="center">
                        <span className='name'>{userInfo.name}</span>
                        <div className="info">
                            {userInfo.city &&
                                <div className="item">
                                    <PlaceIcon />
                                    <span>{userInfo.city}</span>
                                </div>
                            }
                            {userInfo.website &&
                                <div className="item">
                                    <LanguageIcon />
                                    <span>{userInfo.website}</span>
                                </div>
                            }
                        </div>
                        {!isUser ? <button style={{ backgroundColor: '#5271ff' }}>Follow</button> : <button style={{ backgroundColor: '#fd253a' }} onClick={handleLogout}>Log Out</button>}
                    </div>
                    <div className="right">
                        <EmailOutlinedIcon />
                        <MoreVertIcon />
                    </div>
                </div>
            </div>
            <Posts calledFrom={'profile'} paramsId={params.id} />
        </div>
    )
}

export default Profile