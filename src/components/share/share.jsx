import { useContext } from 'react';
import './share.scss';
import { AuthContext } from '../../context/authContext';
import Image from "../../assets/logo/img.png";
import Map from "../../assets/logo/map.png";
import Friend from "../../assets/logo/friend.png";
import { ProfileSvg } from '../../assets/svg/svg';

const Share = () => {
    const { currentUser } = useContext(AuthContext);

    return (
        <div className='share'>
            <div className='top'>
                {currentUser.profilePic ?
                    <img
                        src={currentUser.profilePic}
                        alt=""
                        className=""
                    />
                    : <ProfileSvg />
                }
                <form>
                    <textarea rows="1" type='text' placeholder={`What's on your mind, ${currentUser.name?.split(' ')[0]}?`} />
                </form>
            </div>
            <hr />
            <div className="bottom">
                <div className='left'>
                    <div className="item">
                        <img src={Image} />
                        Add image
                    </div>
                    <div className="item">
                        <img src={Map} />
                        Add Place
                    </div>
                    <div className="item">
                        <img src={Friend} />
                        Tag Friends
                    </div>
                </div>
                <div className="right">
                    <button>
                        Share
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Share