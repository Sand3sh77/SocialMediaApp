import { useContext, useEffect, useState } from 'react';
import './stories.scss';
import { AuthContext } from '../../context/authContext';
import Api from '../../api/Api';
import { ArrowLeft, ArrowRight } from '../../assets/svg/svg';
import axios from 'axios';
import toast from 'react-hot-toast';
import moment from 'moment';
import { Link } from 'react-router-dom';

const Stories = () => {
    const { currentUser } = useContext(AuthContext);
    const [file, setFile] = useState(null);
    const [stories, setStories] = useState([]);
    const [callApi, setCallApi] = useState('');

    // TO SCROLL STORIES
    const Scroll = (offset) => {
        const navigation = document.getElementsByClassName('stories');
        navigation[0].scrollLeft += offset;
    }
    //VIEW STORY API CALL
    useEffect(() => {
        if (currentUser) {
            const url = `${Api}api/functions/stories`;
            const viewStory = async () => {
                try {
                    const resp = await axios.post(url,{id:currentUser.id} ,{
                        headers: {
                            "Content-Type": "multipart/form-data", "Accept": "application/json",
                        }
                    });
                    if (resp.data.status === 200) {
                        setStories(resp.data.data);
                    } else {
                        toast.error(resp.data.message);
                    }
                }
                catch (error) {
                    console.error("Error:", error);
                }
            }
            viewStory();
        }
    }, [callApi])

    // ADD STORY API CALL
    const handleSubmit = (e) => {
        e.preventDefault();
        const url = `${Api}api/functions/addStory`;
        const addStory = async () => {
            try {
                const resp = await axios.post(url, { file: file, userId: currentUser.id }, {
                    headers: {
                        "Content-Type": "multipart/form-data", "Accept": "application/json",
                    }
                });
                if (resp.data.status === 200) {
                    toast.success(resp.data.message);
                    setCallApi(resp.data);
                    setFile(null);
                } else {
                    toast.error(resp.data.message);
                }
            }
            catch (error) {
                console.error("Error:", error);
            }
        }
        addStory();
    };

    return (
        <div className='storycontainer'>
            <div className='stories'>
                <div className='navigation'>
                    <button className='left' onClick={() => Scroll(-400)}><ArrowLeft /></button>
                    <button className='right' onClick={() => Scroll(400)}><ArrowRight /></button>
                </div>
                <div className="story">
                    {file ?
                        <img src={URL.createObjectURL(file)} />
                        :
                        <img
                            src={currentUser.profilePic ? Api + currentUser.profilePic : "https://images.pexels.com/photos/3970396/pexels-photo-3970396.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                            alt=""
                            className=""
                            style={{ filter: 'sepia(10%)' }}
                        />
                    }
                    <form onSubmit={handleSubmit}>
                        <input
                            type="file"
                            id="file"
                            name='file'
                            style={{ display: "none" }}
                            accept="image/png, image/jpeg,image/jpg,image/webp"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        {file ? <button type='submit'>
                            Add
                        </button> : ''}
                        <label htmlFor="file">
                            <span>Create Story</span>
                            <div>+</div>
                        </label>
                    </form>
                </div>
                {stories.map((story) => {
                    return (
                        <div className="story" key={story.id}>
                            <Link to={`/story/${story.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <img
                                    src={Api + story.img}
                                // onError={() => { this.src = 'https://images.pexels.com/photos/3970396/pexels-photo-3970396.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }}
                                />

                                <span>
                                    <section className='date'>
                                        {moment.utc(story.createdAt).local().fromNow()}
                                    </section>
                                    {story.name}
                                </span>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default Stories;