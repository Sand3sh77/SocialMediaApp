import './navbar.scss'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { DarkModeContext } from '../../context/darkmodeContext';
import { AuthContext } from '../../context/authContext';
import { ProfileSvg } from '../../assets/svg/svg';
import { QueryClient, useQueryClient } from 'react-query';


const Navbar = () => {

    const { Toggle, darkMode } = useContext(DarkModeContext);
    const { currentUser } = useContext(AuthContext);
    const QueryClient = useQueryClient();
    return (
        <div className="navbar">
            <div className="left">
                <Link to='/' style={{ textDecoration: 'none' }}>
                    <span>SafeBook</span>
                </Link>
                <HomeOutlinedIcon className='icon' />
                {!darkMode ? <DarkModeOutlinedIcon className='icon' onClick={Toggle} /> :
                    < WbSunnyOutlinedIcon className='icon' onClick={Toggle} />}
                <GridViewOutlinedIcon className='icon' />
                <div className="search">
                    <SearchOutlinedIcon className='icon' />
                    <input type='text' placeholder='Search...' />
                </div>
            </div>
            <div className="right">
                <PersonOutlinedIcon className='icon' />
                <EmailOutlinedIcon className='icon' />
                <NotificationsOutlinedIcon className='icon' />
                <div onClick={() => {
                    console.log("hello");
                    QueryClient.invalidateQueries('posts');
                }}>
                    <Link to={`/profile/${currentUser.id}`} style={{ textDecoration: 'none', color: 'inherit' }} >
                        <div className="user">
                            {currentUser.profilePic ?
                                <img
                                    src={currentUser.profilePic}
                                    alt=""
                                    className=""
                                />
                                :
                                <ProfileSvg />
                            }
                            <span>{currentUser.name}</span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar