import { useContext, useEffect, useState } from 'react';
import './comments.scss';
import { AuthContext } from '../../context/authContext';
import { ProfileSvg } from '../../assets/svg/svg';
import axios from 'axios';
import toast from 'react-hot-toast';

const Comments = ({ postId }) => {

    const { currentUser } = useContext(AuthContext);
    const [comments, setComments] = useState(null);


    // VIEW COMMENT API CALL
    useEffect(() => {
        const url = `http://localhost/social/api/functions/comments?id=${postId}`;
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
    }, [])

    // ADD COMMENT API CALL
    const handleSubmit = (e) => {
        e.preventDefault();

        const ac_url = "http://localhost/social/api/functions/addComment";
        const addComment = async () => {
            try {
                const resp = await axios.post(ac_url, { postId: post.id, userId: currentUser.id }, {
                    headers: {
                        "Content-Type": "multipart/form-data", "Accept": "application/json",
                    }
                })
                if (resp.data.status === 200) {
                    setComments(resp.data.data);
                }
                else {
                    toast.error(resp.data.message);
                }
                set
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
                    {currentUser.profilePic ?
                        <img
                            src={currentUser.profilePic}
                            alt=""
                            className=""
                        />
                        : <ProfileSvg />
                    }
                    <input type='text' placeholder='write a comment.' required />
                    <button type='submit'>Send</button>
                </div>
            </form>
            {comments?.map((comment) => (
                <div className="comment" key={comment.id}>
                    {comment.profilePic ?
                        <img
                            src={comment.profilePic}
                            alt=""
                            className=""
                        />
                        : <ProfileSvg />
                    }
                    <div className="cinfo">
                        <span>{comment.name}</span>
                        <p>{comment.description}</p>
                    </div>
                    <span className='date'>1 hour ago.</span>
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