import './post.scss';
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from 'react-router-dom';
import Comments from '../comments/comments';
import { useContext, useState } from 'react';
import { ProfileSvg } from '../../assets/svg/svg';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';

const Post = ({ post }) => {

    const [comments, setComments] = useState(false);
    const [liked, setLiked] = useState(post.isLiked);
    const [totalLikes, setTotalLikes] = useState(post.totalLikes);
    const { currentUser } = useContext(AuthContext);


    // LIKE API CALL
    const handleLike = () => {
        setLiked(!liked);
        if (liked) {
            setTotalLikes(totalLikes - 1);
        }
        else {
            setTotalLikes(totalLikes + 1);
        }

        const url = "http://localhost/social/api/functions/likes.php";

        const Like = async () => {
            try {
                await axios.post(url, { userId: currentUser.id, postId: post.id, isLiked: liked }, {
                    headers: {
                        "Content-Type": "multipart/form-data", "Accept": "application/json",
                    }
                })
            }
            catch (error) {
                console.error("Error:", error);
            }
        }
        Like();
    }

    return (
        <div className='post'>
            <div className="container">
                <div className="user">
                    <div className="userInfo">
                        <Link onClick={() => { document.body.scrollTop = 0 }} to={`/profile/${post.userId}`} style={{ textDecoration: 'none', color: 'inherit' }} href="#">

                            {post.profilePic ?
                                <img
                                    src={post.profilePic}
                                    alt=""
                                    className=""
                                />
                                : <ProfileSvg />
                            }
                        </Link>
                        <div className="details">
                            <Link to={`/profile/${post.userId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <span className='name'>{post.name}</span>
                            </Link>
                            <div className='date'>{post.createdAt}</div>
                        </div>
                    </div>
                    <MoreHorizIcon />
                </div>
                <div className="content">
                    <p>{post.description}</p>
                    <img src={post.img} alt='' onClick={(e) => { e.target.classList.toggle('objectFit') }} />
                </div>
                <div className="info">
                    <div className="item" onClick={handleLike}>
                        {liked ? <FavoriteOutlinedIcon style={{ color: "red" }} /> : <FavoriteBorderOutlinedIcon />}
                        {totalLikes} {totalLikes === 1 ? 'like' : 'likes'}
                    </div>
                    <div className="item" onClick={() => setComments(!comments)}>
                        <TextsmsOutlinedIcon />
                        9 comments
                    </div>
                    <div className="item">
                        <ShareOutlinedIcon />
                        Share
                    </div>
                </div>
                {comments && <Comments />}
            </div>
        </div >
    )
}

export default Post;