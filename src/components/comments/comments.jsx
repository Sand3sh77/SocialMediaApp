import { useContext, useEffect, useState } from 'react';
import './comments.scss';
import { AuthContext } from '../../context/authContext';
import { ProfileSvg } from '../../assets/svg/svg';
import axios from 'axios';
import toast from 'react-hot-toast';
import Api from '../../api/Api';
import moment from "moment";

const Comments = ({ postId, TC, setTC }) => {

    const { currentUser } = useContext(AuthContext);
    const [comments, setComments] = useState(null);
    const [desc, setDesc] = useState('');
    const [callApi, setCallApi] = useState('');

    // VIEW COMMENT API CALL
    useEffect(() => {
        const url = `${Api}api/functions/comments/comments?id=${postId}`;
        const comment = async () => {
            try {
                const resp = await axios.get(url, {
                    headers: {
                        "Content-Type": "multipart/form-data", "Accept": "application/json",
                    }
                })
                if (resp.data.status === 200) {
                    // toast.success(resp.data.message);
                    setComments(resp.data.data);
                }
                else {
                    toast.error(resp.data.message);
                }
            }
            catch (error) {
                console.error("Error:", error);
            }
        }
        comment();
    }, [callApi])

    // ADD COMMENT API CALL
    const handleSubmit = (e) => {
        e.preventDefault();


        const ac_url = `${Api}api/functions/comments/addComment`;
        const addComment = async () => {
            try {
                const resp = await axios.post(ac_url, { postId: postId, userId: currentUser.id, desc: desc }, {
                    headers: {
                        "Content-Type": "multipart/form-data", "Accept": "application/json",
                    }
                })
                if (resp.data.status === 200) {
                    toast.success(resp.data.message);
                    setDesc('');
                    setCallApi(resp.data);
                    setTC(TC + 1);
                }
                else {
                    toast.error(resp.data.message);
                }
            }
            catch (error) {
                console.error("Error:", error);
            }
        }
        addComment();
    }

    return (
        <div className='comments'>
            <form onSubmit={handleSubmit}>
                <div className='write'>
                    {currentUser.method === 'normal' ?
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
                    <input type='text'
                        placeholder='write a comment.'
                        value={desc}
                        name='desc'
                        onChange={(e) => setDesc(e.target.value)}
                        required />
                    <button type='submit'>Send</button>
                </div>
            </form>
            {comments?.map((comment) => (
                <div className="comment" key={comment.id}>
                     {comment.method === 'normal' ?
                                <>
                                    {
                                        comment.profilePic ?
                                            <img
                                                src={Api + comment.profilePic}
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
                                        src={comment.profilePic}
                                        alt=""
                                        className=""
                                    />
                                </>
                            }
                    <div className="cinfo">
                        <span>{comment.name}</span>
                        <p>{comment.description}</p>
                    </div>
                    <span className='date'>{moment.utc(comment.createdAt).local().fromNow()}</span>
                </div>
            ))}
            {comments ? '' :
                <div className='noComments'>
                    {/* No comments available for this post. */}
                    Be the first one to comment.
                </div>
            }
        </div>
    )
}

export default Comments