import { useContext } from 'react';
import './share.scss';
import { AuthContext } from '../../context/authContext';
import Image from "../../assets/logo/img.png";
import Map from "../../assets/logo/map.png";
import Friend from "../../assets/logo/friend.png";
import { ProfileSvg } from '../../assets/svg/svg';
import axios from 'axios';
import toast from 'react-hot-toast';

const Share = () => {
    const { currentUser } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        console.log(formData);

        const url = "http://localhost/social/api/functions/addPosts";

        // CREATE POST API CALL
        const createPost = async () => {
            try {
                const resp = await axios.post(url, { ...formData, userId: currentUser.id }, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });
                if (resp.data.status === 200) {
                    toast.success(resp.data.message);
                }
                else {
                    toast.error(resp.data.message);
                }
            }
            catch (error) {
                console.error("Error:", error);
            }
        }
        createPost();
    }

    return (
        <div className='share'>
            <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
                <div className='top'>
                    {currentUser.profilePic ?
                        <img
                            src={currentUser.profilePic}
                            alt=""
                            className=""
                        />
                        : <ProfileSvg />
                    }
                    <textarea rows="1" type='text' name="desc" placeholder={`What's on your mind, ${currentUser.name?.split(' ')[0]}?`} />
                </div>
                <hr />
                <div className="bottom">
                    <div className='left'>
                        <div className="item">
                            <label htmlFor='image'>
                                <img src={Image} />
                                Add image
                            </label>
                            <input type="file" id="image" name='image' />
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
            </form>
        </div>
    )
}

export default Share