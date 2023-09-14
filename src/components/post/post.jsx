import './post.scss';
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from 'react-router-dom';
import Comments from '../comments/comments';
import { useState } from 'react';

const Post = ({ post }) => {

    const [comments, setComments] = useState(false);
    const [liked,setLiked]=useState(false);

    return (
        <div className='post'>
            <div className="container">
                <div className="user">
                    <div className="userInfo">
                        <img src={post.profilePic} />
                        <div className="details">
                            <Link to={`/profile/${post.userId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <span className='name'>{post.name}</span>
                            </Link>
                            <div className='date'>1 min ago</div>
                        </div>
                    </div>
                    <MoreHorizIcon />
                </div>
                <div className="content">
                    <p>{post.desc}</p>
                    <img src={post.img} alt='' onClick={(e)=>{e.target.classList.toggle('objectFit')}}/>
                </div>
                <div className="info">
                    <div className="item" onClick={() => setLiked(!liked)}>
                        {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
                        99 likes
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
        </div>
    )
}

export default Post;