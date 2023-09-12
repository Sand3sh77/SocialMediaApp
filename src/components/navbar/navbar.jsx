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


const Navbar = () => {

    const { Toggle, darkMode } = useContext(DarkModeContext);
    return (
        <div className="navbar">
            <div className="left">
                <Link to='/' style={{ textDecoration: 'none' }}>
                    <span>SocialMedia</span>
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
                <div className="user">
                    <img src="./src/assets/profile.jpg" />
                    <span>Sandesh Subedi</span>
                </div>
            </div>
        </div>
    )
}

export default Navbar