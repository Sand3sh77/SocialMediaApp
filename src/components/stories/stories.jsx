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
    const [stories, setStories] = useState([]);

    // TO SCROLL STORIES
    const Scroll = (offset) => {
        const navigation = document.getElementsByClassName('stories');
        navigation[0].scrollLeft += offset;
    }
    //VIEW STORY API CALL
    useEffect(() => {
        if (currentUser) {
            const url = `${Api}api/functions/stories/stories`;
            const viewStory = async () => {
                try {
                    const resp = await axios.post(url, { currentUserId: currentUser.id, paramsId: 0 }, {
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
    }, [])

    return (
        <div className='storycontainer'>
            <div className='stories'>
                <div className='navigation'>
                    <button className='left' onClick={() => Scroll(-400)}><ArrowLeft /></button>
                    <button className='right' onClick={() => Scroll(400)}><ArrowRight /></button>
                </div>
                <div className="story">
                    <Link to={`/story/addStory`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {currentUser.profilePic ?
                            <>
                                {
                                    currentUser.profilePic.split('/')[0] === 'api' ?
                                        <img
                                            src={Api + currentUser.profilePic}
                                            alt=""
                                            className=""
                                        />
                                        :
                                        <img
                                            src={currentUser.profilePic}
                                            alt=""
                                            className=""
                                        />
                                }
                            </>
                            :
                            <>
                                <div className="">
                                    <ProfileSvg />
                                </div>
                            </>
                        }
                        <span>Create Story</span>
                        <div>+</div>
                    </Link>
                </div>
                {stories[0] != null ?
                    <>
                        {
                            stories.map((story) => {
                                return (
                                    <div className="story" key={story.id}>
                                        <Link to={`/story/${story.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <img
                                                src={Api + story.img}
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
                            })
                        }
                    </>
                    :
                    <div className='noUsersFollowed'>
                        Stories not available
                    </div>
                }
            </div>
        </div>
    )
}

export default Stories;