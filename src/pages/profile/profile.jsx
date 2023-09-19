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
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Profile = () => {
    const params = useParams();
    const url = `http://localhost/social/api/functions/profile.php?id=${params.id}`;
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
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
            }
            catch (error) {
                console.error("Error:", error);
            }
        }
        userDetails();
    }, [])

    return (
        <div className="profile">
            <div className="images">
                <img
                    src={userInfo.coverPic}
                    alt=""
                    className="cover"
                />
                <img
                    src={userInfo.profilePic}
                    alt=""
                    className="profilePic"
                />
            </div>
            <div className="profileContainer">
                <div className="uInfo">
                    <div className="left">
                        <a href="http://facebook.com">
                            <FacebookTwoToneIcon fontSize="medium" />
                        </a>
                        <a href="http://facebook.com">
                            <InstagramIcon fontSize="medium" />
                        </a>
                        <a href="http://facebook.com">
                            <TwitterIcon fontSize="medium" />
                        </a>
                        <a href="http://facebook.com">
                            <LinkedInIcon fontSize="medium" />
                        </a>
                        <a href="http://facebook.com">
                            <PinterestIcon fontSize="medium" />
                        </a>
                    </div>
                    <div className="center">
                        <span className='name'>{userInfo.name}</span>
                        <div className="info">
                            <div className="item">
                                <PlaceIcon />
                                <span>{userInfo.city}</span>
                            </div>
                            <div className="item">
                                <LanguageIcon />
                                <span>{userInfo.website}</span>
                            </div>
                        </div>
                        <button>Follow</button>
                    </div>
                    <div className="right">
                        <EmailOutlinedIcon />
                        <MoreVertIcon />
                    </div>
                </div>
            </div>
            <Posts />
        </div>
    )
}

export default Profile