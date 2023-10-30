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
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { CrossOutlineSvg, CrossSvg, EditSolid, ProfileSvg, TickSvg } from '../../assets/svg/svg';
import { AuthContext } from '../../context/authContext';
import toast from 'react-hot-toast';
import Api, { ChatApi } from '../../api/Api';
import useFollow from '../../hooks/useFollow';
import { ChatContext } from '../../context/chatContext';

const Profile = () => {
    const [userInfo, setUserInfo] = useState({});
    const { currentUser, setCurrentUser, userToken, setUserToken } = useContext(AuthContext);
    const { setChatId, setRecepientId } = useContext(ChatContext);
    const [modal, setModal] = useState({ edit: false, profile: false, cover: false, password: false, sPassword: false });
    const [file, setFile] = useState(null);

    const [isUser, setIsUser] = useState('');
    const [isFollowed, setIsFollowed] = useState('');

    const params = useParams();
    const url = `${Api}api/functions/other/profile`;

    const [formData, setFormData] = useState({
        name: currentUser.name,
        email: currentUser.email,
        city: currentUser.city,
        website: currentUser.website,
        dob: currentUser.dateofBirth,
        cuPassword: '',
        nPassword: '',
        coPassword: '',
    });
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value,
        });
    };
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


        try {
            let currentImg = null;
            if (e.target[2].id === "profile") {
                currentImg = currentUser.profilePic;
            } else if (e.target[2].id === "cover") {
                currentImg = currentUser.coverPic;
            }
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

    // EDIT DETAILS API CALL
    const handleEdit = async (e) => {
        e.preventDefault();
        const url = `${Api}api/functions/other/updateDetails`;
        try {
            const resp = await axios.post(url, { ...formData, id: currentUser.id }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            if (resp.data.status === 200) {
                toast.success(resp.data.message);
                setModal({ edit: false, profile: false, cover: false, password: false });
                setCurrentUser({ ...currentUser, ...formData });
            }
            else {
                toast.error(resp.data.message);
            }
        }
        catch (error) {
            console.error("Error:", error);
        }
    }

    // CHANGE PASSWORD API CALL
    const handlePassword = async (e) => {
        e.preventDefault();
        const url = `${Api}api/authentication/updatePassword`;
        try {
            const resp = await axios.post(url, { nPassword: formData.nPassword, cuPassword: formData.cuPassword, coPassword: formData.coPassword, id: currentUser.id }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            if (resp.data.status === 200) {
                toast.success(resp.data.message);
                setModal({ edit: false, profile: false, cover: false, password: false });
                setCurrentUser({ ...currentUser, ...formData });
            }
            else {
                toast.error(resp.data.message);
            }
        }
        catch (error) {
            console.error("Error:", error);
        }
    }

    const handleMessage = async (firstId) => {
        const url = `${ChatApi}chats`;
        try {
            const resp = await axios.post(url, { firstId: firstId, secondId: JSON.parse(currentUser.id) }, {
                headers: {
                    "Content-Type": "application/json",
                }
            })
            if (resp.status === 200) {
                setChatId(resp.data._id);
                if (resp.data.members[0] == currentUser.id) {
                    setRecepientId(resp.data.members[1]);
                } else {
                    setRecepientId(resp.data.members[0]);
                }
            }
            else {
                toast.error(resp.data.message);
            }
        } catch (error) {
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

                {isUser ? <div className='coverEdit' onClick={() => setModal({ ...modal, cover: true })}><EditSolid /></div> : ''}

                {userInfo.profilePic ?
                    <>
                        {
                            userInfo.profilePic.split('/')[0] === 'api' ?
                                <img
                                    src={Api + userInfo.profilePic}
                                    alt=""
                                    className="profilePic"
                                />
                                :
                                <img
                                    src={userInfo.profilePic}
                                    alt=""
                                    className="profilePic"
                                />
                        }
                    </>
                    :
                    <>
                        <div className="profilePic svg">
                            <ProfileSvg />
                        </div>
                    </>
                }
                {isUser ? <div className='edit' onClick={() => setModal({ ...modal, profile: true })}><EditSolid /></div> : ''}
            </div >
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
                                    <span><a target='blank' href={'https://' + userInfo.website} style={{ textDecoration: 'none', color: '#5271ff' }}>{userInfo.website}</a></span>
                                </div>
                            }
                        </div>
                        {!isUser ?
                            <>
                                {isFollowed ?
                                    <div style={{ display: "flex", gap: "0.4rem" }}>
                                        <button style={{ backgroundColor: '#5271ff' }} onClick={() => handleMessage(userInfo.id)}>Message</button>
                                        <button style={{ backgroundColor: '#fd253a' }} onClick={handleFollow}>Unfollow</button>
                                    </div>
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
                        {modal.cover || modal.edit || modal.profile || modal.password ?
                            <div className='modal'>
                                <div className='blur' onClick={() => setModal({ edit: false, profile: false, cover: false, password: false })}></div>

                                {modal.profile &&
                                    <div className='items'>
                                        <div onClick={() => setModal({ edit: false, profile: false, cover: false, password: false })} ><CrossSvg /></div>
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
                                        <div onClick={() => setModal({ edit: false, profile: false, cover: false, password: false })} ><CrossSvg /></div>
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
                                        <div onClick={() => setModal({ edit: false, profile: false, cover: false, password: false })} ><CrossSvg /></div>
                                        <h1>Edit</h1>
                                        Edit your details
                                        <form onSubmit={handleEdit}>
                                            <div>
                                                <label htmlFor='name'>Name</label>
                                                <input
                                                    type='text'
                                                    id="name"
                                                    placeholder='Enter your name'
                                                    value={formData.name}
                                                    onChange={handleChange} />
                                            </div>
                                            {/* <div>
                                                <label htmlFor='email'>Email</label>
                                                <input
                                                    type='email'
                                                    id="email"
                                                    placeholder='Enter your email'
                                                    value={formData.email}
                                                    onChange={handleChange} />
                                            </div> */}
                                            <div>
                                                <label htmlFor='city'>City</label>
                                                <input
                                                    type='text'
                                                    id="city"
                                                    placeholder='Enter your city'
                                                    value={formData.city}
                                                    onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor='website'>Website</label>
                                                <input
                                                    type='text'
                                                    id="website"
                                                    placeholder='Enter your website'
                                                    value={formData.website}
                                                    onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor='dob'>Date of Birth</label>
                                                <input
                                                    type='date'
                                                    id="dob"
                                                    placeholder='Enter your DOB'
                                                    value={formData.dob}
                                                    onChange={handleChange} />
                                            </div>
                                            <button type='submit'><TickSvg />Update</button>
                                        </form>
                                    </div>
                                }
                                {modal.password &&
                                    <div className='items'>
                                        <div onClick={() => setModal({ edit: false, profile: false, cover: false, password: false })} ><CrossSvg /></div>
                                        <h1>Password</h1>
                                        Change your password
                                        <form onSubmit={handlePassword}>
                                            <div>
                                                <label htmlFor='cuPassword'>Current Password</label>
                                                <input
                                                    type='password'
                                                    id="cuPassword"
                                                    placeholder='Enter current password'
                                                    value={formData.cuPassword}
                                                    onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor='nPassword'>New Password</label>
                                                <input
                                                    type='password'
                                                    id="nPassword"
                                                    placeholder='Enter new password'
                                                    value={formData.nPassword}
                                                    onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor='coPassword'>Confirm Password</label>
                                                <input
                                                    type='password'
                                                    id="coPassword"
                                                    placeholder='Confirm new password'
                                                    value={formData.coPassword}
                                                    onChange={handleChange} />
                                            </div>
                                            <button type='submit'><TickSvg />Update</button>
                                        </form>
                                    </div>
                                }

                            </div>
                            : ''
                        }
                    </div>
                    <div className="right">
                        {/* <EmailOutlinedIcon /> */}
                        {isUser && currentUser.method === 'normal' ?
                            <>
                                <div onClick={() => setModal({ ...modal, sPassword: !modal.sPassword })} style={{ cursor: 'pointer' }}>
                                    <MoreVertIcon />
                                </div>
                                {modal.sPassword &&
                                    <div className='cPassModal'>
                                        <button onClick={() => setModal({ ...modal, password: true })}>Change Password</button>
                                    </div>
                                }
                            </>
                            : ''
                        }
                    </div>
                </div>
            </div>
            <Posts calledFrom={'profile'} paramsId={params.id} />
        </div >
    )
}

export default Profile