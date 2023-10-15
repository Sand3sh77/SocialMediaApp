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
import { useContext, useState } from 'react';
import { DarkModeContext } from '../../context/darkmodeContext';
import { AuthContext } from '../../context/authContext';
import { ProfileSvg } from '../../assets/svg/svg';
import { QueryClient, useQueryClient } from 'react-query';
import Api from '../../api/Api';
import axios from 'axios';
import toast from 'react-hot-toast';


const Navbar = () => {
    const [search, setSearch] = useState('');
    const [result, setResult] = useState([]);
    const { Toggle, darkMode } = useContext(DarkModeContext);
    const { currentUser } = useContext(AuthContext);
    const QueryClient = useQueryClient();

    const handleSubmit = async (e) => {
        e.preventDefault();
        handleSearch(search);
    }
    const handleChange = (data) => {
        if (data !== "") {
            handleSearch(data);
        } else if (data == '') {
            setResult([]);
        }
    }


    // SEARCH API CALL
    const handleSearch = (data) => {
        const searchApi = async () => {
            const url = `${Api}api/functions/other/search`;
            try {
                const resp = await axios.post(url, { search: data, id: currentUser.id }, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        // 'Access-Control-Allow-Origin': '*',
                    }
                })
                if (resp.data.status === 200) {
                    setResult(resp.data.data);
                    // toast.success(resp.data.message);
                }
                else if (resp.data.status === 501) {
                    toast.error(resp.data.message);
                } else {
                    setResult([]);
                }
            }
            catch (error) {
                console.error("Error:", error);
            }
        }
        searchApi();
    }

    return (
        <div className="navbar">
            {result[0] != null ? <div className='invisible' onClick={() => setResult([])}></div> : ''}
            <div className="left">
                <Link to='/' style={{ textDecoration: 'none' }}>
                    <span className='logo'>SafeBook</span>
                </Link>
                <HomeOutlinedIcon className='icon' />
                {!darkMode ? <DarkModeOutlinedIcon className='icon darkMode' onClick={Toggle} /> :
                    < WbSunnyOutlinedIcon className='icon darkMode' onClick={Toggle} />}
                <GridViewOutlinedIcon className='icon' />
                <form onSubmit={handleSubmit}>
                    <div className="search" type="submit">
                        <SearchOutlinedIcon className='icon' />
                        <input
                            type='text'
                            id='search'
                            name='search'
                            placeholder='Search...'
                            value={search.value}
                            onChange={(e) => { handleChange(e.target.value); setSearch(e.target.value) }}
                        />
                        {result[0] != null ?
                            <div className='result'>
                                {result.map((res) => {
                                    return (
                                        <Link to={`/profile/${res.id}`} style={{ textDecoration: 'none', color: 'inherit' }}
                                            key={res.id}
                                            onClick={() => setResult([])} >
                                            <div className="item">
                                                {res.profilePic && res.profilePic.split('/')[0] === 'api' ?
                                                    <>
                                                        {
                                                            res.profilePic ?
                                                                <img
                                                                    src={Api + res.profilePic}
                                                                    alt=""
                                                                    className=""
                                                                />
                                                                :
                                                                <ProfileSvg />
                                                        }
                                                    </>
                                                    :
                                                    <>
                                                        <img
                                                            src={res.profilePic}
                                                            alt=""
                                                            className=""
                                                        />
                                                    </>
                                                }
                                                <div>
                                                    <span>{res.name}</span><br />
                                                    <span>{res.email}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                            : ''}
                    </div>
                </form>
            </div>
            <div className="right">
                <PersonOutlinedIcon className='icon' />
                <EmailOutlinedIcon className='icon' />
                <NotificationsOutlinedIcon className='icon' />
                <div onClick={() => {
                    QueryClient.invalidateQueries('posts');
                }}>
                    <Link to={`/profile/${currentUser.id}`} style={{ textDecoration: 'none', color: 'inherit' }} >
                        <div className="user">
                            {currentUser.profilePic && currentUser.profilePic.split('/')[0] === 'api' ?
                                <>
                                    {
                                        currentUser.profilePic ?
                                            <img
                                                src={Api + currentUser.profilePic}
                                                alt=""
                                                className=""
                                            />
                                            :
                                            <ProfileSvg />
                                    }
                                </>
                                :
                                <>
                                    <img
                                        src={currentUser.profilePic}
                                        alt=""
                                        className=""
                                    />
                                </>
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