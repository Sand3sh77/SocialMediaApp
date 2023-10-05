import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { ProfileSvg } from '../../assets/svg/svg'
import { AuthContext } from '../../context/authContext'
import Api from '../../api/Api'
import moment from 'moment'
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import axios from 'axios'
import toast from 'react-hot-toast'

const AllStories = ({ story }) => {
    const { currentUser } = useContext(AuthContext);
    const [modal, setModal] = useState(false);

    // DELETE STORY API CALL
    const handleDelete = (id, file_path) => {

        const url = `${Api}api/functions/stories/deleteStory`;

        const Delete = async () => {
            try {
                const dresp = await axios.post(url, { id: story.id, file_path: story.img }, {
                    headers: {
                        "Content-Type": "multipart/form-data", "Accept": "application/json",
                    }
                })
                if (dresp.data.status === 200) {
                    toast.success(dresp.data.message);
                }
                else {
                    toast.error(dresp.data.message);
                }
            }
            catch (error) {
                console.error("Error:", error);
            }
        }
        Delete();
    }
    return (
        <span key={story.id}>
            <Link to={`/story/${story.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className={story.active ? 'active items' : 'items'}>
                    {story.profilePic ?
                        <img
                            src={Api + story.profilePic}
                            alt=""
                            className=""
                        />
                        :
                        <ProfileSvg />
                    }
                    <div>
                        <span className="storyName">{story.name}</span><br />
                        <span className="storyDate">{moment.utc(story.createdAt).local().fromNow()}</span>
                    </div>
                    {currentUser.id === story.userId ?
                        <div onClick={() => setModal(!modal)} style={{ cursor: 'pointer' }} className='modal'>
                            <MoreHorizIcon />
                            {modal &&
                                <button onClick={() => handleDelete()}>
                                    Delete
                                </button>
                            }
                        </div> : ''}
                </div >
            </Link>
        </span>
    )
}

export default AllStories