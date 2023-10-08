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
import { CrossOutlineSvg, CrossSvg, EditSolid, ProfileSvg, TickSvg } from '../../assets/svg/svg';
import { AuthContext } from '../../context/authContext';
import toast from 'react-hot-toast';
import Api from '../../api/Api';
import useFollow from '../../hooks/useFollow';
import { useQueryClient } from 'react-query';

const Profile = () => {
    const [userInfo, setUserInfo] = useState({});
    const { currentUser, setCurrentUser, userToken, setUserToken } = useContext(AuthContext);
    const queryClient = useQueryClient();
    const [modal, setModal] = useState({ edit: false, profile: false, cover: false });
    const [file, setFile] = useState(null);

    const [isUser, setIsUser] = useState('');
    const [isFollowed, setIsFollowed] = useState('');

    const params = useParams();
    const url = `${Api}api/functions/other/profile`;

    useEffect(() => {
        window.scrollTo(0, 0);
        if (currentUser) {
            const userDetails = async () => {
                try {
                    const resp = await axios.post(url, { id: params.id, currentUserId: currentUser.id }, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            "Accept": "application/json",
                        }
                    })
                    if (resp.data.status === 200) {
                        const userData = resp.data.data[0];
                        queryClient.invalidateQueries('posts');
                        setUserInfo(userData);
                        if (currentUser.id === userData.id) {
                            setIsUser(true);
                        } else {
                            setIsUser(false);
                        }
                        setIsFollowed(resp.data.data[0].isFollowed);
                    }
                }
                catch (error) {
                    console.error("Error:", error);
                }
            }
            userDetails();
        }
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
                if (resp.data.status === 200) {
                    toast.success(resp.data.message);
                    setUserToken(false);
                }
                else {
                    toast.error(resp.data.message);
                }
            }
            catch (error) {
                console.error("Error:", error);
            }
        }
        logout();
    }

    // FOLLOW / UNFOLLOW API CALL
    const handleFollow = () => {
        useFollow(currentUser.id, userInfo.id, isFollowed);
        setIsFollowed(!isFollowed);
    };

    // PROFILE/COVER PIC UPDATE API CALL
    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = `${Api}api/functions/other/uploadImage`;
        let currentImg = "null";
        if (e.target[2].id === "profile") {
            currentImg = currentUser.profilePic;
        } else if (e.target[2].id === "cover") {
            currentImg = currentUser.coverPic;
        }

        try {
            const resp = await axios.post(url, { id: currentUser.id, file: file, location: e.target[2].id, currentImage: currentImg }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            if (resp.data.status === 200) {
                toast.success(resp.data.message);

                if (e.target[2].id === 'profile') {
                    setCurrentUser({ ...currentUser, profilePic: resp.data.location });
                } else if (e.target[2].id === 'cover') {
                    setCurrentUser({ ...currentUser, coverPic: resp.data.location });
                }

                setModal({ edit: false, profile: false, cover: false });
                setFile(null);
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
        <div className="profile">
            <div className="images">
                <img
                    src={userInfo.coverPic ? Api + userInfo.coverPic : "https://images.pexels.com/photos/7135121/pexels-photo-7135121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                    alt=""
                    className="cover"
                />
                <div className='coverEdit' onClick={() => setModal({ ...modal, cover: true })}><EditSolid /></div>
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
                <div className='edit' onClick={() => setModal({ ...modal, profile: true })}><EditSolid /></div>
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
                        {!isUser ?
                            <>
                                {isFollowed ?
                                    <button style={{ backgroundColor: '#fd253a' }} onClick={handleFollow}>Unfollow</button>
                                    :
                                    <button style={{ backgroundColor: '#5271ff' }} onClick={handleFollow}>Follow</button>
                                }
                            </>
                            :
                            <div className='buttons'>
                                <button style={{ backgroundColor: '#5271ff' }} onClick={() => setModal({ ...modal, edit: true })}>Edit</button>
                                <button style={{ backgroundColor: '#fd253a' }} onClick={handleLogout}>Log Out</button>
                            </div>
                        }
                        {modal.cover || modal.edit || modal.profile ?
                            <div className='modal'>
                                <div className='blur' onClick={() => setModal({ edit: false, profile: false, cover: false })}></div>

                                {modal.profile &&
                                    <div className='items'>
                                        <h1>Profile</h1>
                                        <label htmlFor='profile'>
                                            Add Profile Picture
                                        </label>
                                        <div className='cprofilePic'>
                                            {file ?
                                                <img src={URL.createObjectURL(file)} />
                                                :
                                                <label htmlFor='profile'>
                                                    <h1 style={{ textAlign: 'center' }}>+</h1>
                                                    <h3>Insert Image Here</h3>
                                                </label>
                                            }
                                        </div>
                                        <form onSubmit={handleSubmit}>
                                            {file &&
                                                <div className='buttons'>
                                                    <button onClick={() => setFile(null)}><CrossOutlineSvg /></button>
                                                    <button type='submit'><TickSvg /></button>
                                                </div>
                                            }
                                            <input
                                                type="file"
                                                id="profile"
                                                name='profile'
                                                style={{ display: "none" }}
                                                accept="image/png, image/jpeg,image/jpg,image/webp"
                                                onChange={(e) => setFile(e.target.files[0])}
                                            />
                                        </form>
                                    </div>
                                }
                                {modal.cover &&
                                    <div className='items'>
                                        <h1>Cover</h1>
                                        <label htmlFor='cover'>
                                            Add Cover Picture
                                        </label>
                                        <div className='cprofilePic'>
                                            {file ?
                                                <img src={URL.createObjectURL(file)} />
                                                :
                                                <label htmlFor='cover'>
                                                    <h1 style={{ textAlign: 'center' }}>+</h1>
                                                    <h3>Insert Image Here</h3>
                                                </label>
                                            }
                                        </div>
                                        <form onSubmit={handleSubmit}>
                                            {file &&
                                                <div className='buttons'>
                                                    <button onClick={() => setFile(null)}><CrossOutlineSvg /></button>
                                                    <button type='submit'><TickSvg /></button>
                                                </div>
                                            }
                                            <input
                                                type="file"
                                                id="cover"
                                                name='cover'
                                                style={{ display: "none" }}
                                                accept="image/png, image/jpeg,image/jpg,image/webp"
                                                onChange={(e) => setFile(e.target.files[0])}
                                            />
                                        </form>
                                    </div>
                                }
                                {modal.edit &&
                                    <div className='items'>
                                        <h1>Edit</h1>
                                        Edit
                                    </div>
                                }

                            </div>
                            : ''
                        }
                    </div>
                    <div className="right">
                        <EmailOutlinedIcon />
                        <MoreVertIcon />
                    </div>
                </div>
            </div>
            <Posts calledFrom={'profile'} paramsId={params.id} />
        </div >
    )
}

export default Profile