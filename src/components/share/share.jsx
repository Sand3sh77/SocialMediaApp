import { useContext, useState } from 'react';
import './share.scss';
import { AuthContext } from '../../context/authContext';
import Image from "../../assets/logo/img.png";
import Map from "../../assets/logo/map.png";
import Friend from "../../assets/logo/friend.png";
import { CrossSvg, ProfileSvg } from '../../assets/svg/svg';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';

const Share = () => {
    const [desc, setDesc] = useState('');
    const queryClient = useQueryClient();
    const [file, setFile] = useState(null);
    const { currentUser } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        // const formData = new FormData();
        // formData.append("file", file);
        // formData.append("userId", currentUser.Id);
        // formData.append("desc", desc);

        const url = "http://localhost/social/api/functions/addPosts";

        // CREATE POST API CALL
        const createPost = async () => {
            try {
                const resp = await axios.post(url, { file: file, userId: currentUser.id, desc: desc }, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });
                if (resp.data.status === 200) {
                    queryClient.invalidateQueries('posts');
                    toast.success(resp.data.message);
                    setDesc('');
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
                    <textarea
                        rows="1"
                        type='text'
                        className={file ? "textarea" : ''}
                        value={desc}
                        name="desc"
                        onChange={(e) => setDesc(e.target.value)}
                        placeholder={`What's on your mind, ${currentUser.name?.split(' ')[0]}?`}
                        maxLength="1000"
                        required
                    />
                    {file && (
                        <div style={{ position: 'relative' }}>
                            <img
                                src={URL.createObjectURL(file)}
                                alt="Selected"
                                className='selected'
                                style={{ maxWidth: '200px', maxHeight: '200px' }}
                            />
                            <div onClick={() => setFile(null)}>
                                <CrossSvg />
                            </div>
                        </div>
                    )}

                </div>
                <hr />
                <div className="bottom">
                    <div className='left'>
                        <div className="item">
                            <label htmlFor='file'>
                                <img src={Image} />
                                Add image
                            </label>
                            <input
                                type="file"
                                id="file"
                                name='file'
                                style={{ display: "none" }}
                                accept="image/png, image/jpeg,image/jpg,image/webp"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
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