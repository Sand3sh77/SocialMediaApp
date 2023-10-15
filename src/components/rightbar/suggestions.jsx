import React, { useContext, useState } from 'react'
import useFollow from '../../hooks/useFollow';
import { ProfileSvg } from '../../assets/svg/svg';
import Api from '../../api/Api';
import { AuthContext } from '../../context/authContext';
import { Link } from 'react-router-dom';

const Suggestions = ({ suggestion, setSuggestions, suggestions }) => {
    const [isFollowed, setIsFollowed] = useState('');
    const { currentUser } = useContext(AuthContext);

    const handleDismiss = (id) => {
        const newSuggestions = suggestions.filter(suggestions => suggestions.id !== id);
        setSuggestions(newSuggestions);
    }
    // FOLLOW / UNFOLLOW API CALL
    const handleFollow = (id) => {
        useFollow(currentUser.id, id, isFollowed);
        setIsFollowed(!isFollowed);
    };

    return (
        <div className="user suggestion">
            <Link to={`/profile/${suggestion.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="userInfo">
                    {suggestion.profilePic && suggestion.profilePic.split('/')[0] === 'api' ?
                        <>
                            {
                                suggestion.profilePic ?
                                    <img
                                        src={Api + suggestion.profilePic}
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
                                src={suggestion.profilePic}
                                alt=""
                                className=""
                            />
                        </>
                    }
                    <span>{suggestion.name}</span>
                </div>
            </Link>
            <div className="buttons">
                {isFollowed ?
                    <button style={{ backgroundColor: '#5271ff' }} onClick={() => handleFollow(suggestion.id)}>Unfollow</button>
                    :
                    <button style={{ backgroundColor: '#5271ff' }} onClick={() => handleFollow(suggestion.id)}>Follow</button>
                }
                <button onClick={() => handleDismiss(suggestion.id)}>Dismiss</button>
            </div>
        </div>
    )
}

export default Suggestions