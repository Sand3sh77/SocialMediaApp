import { useEffect, useState } from 'react';
import Post from '../post/post';
import './posts.scss';
import axios from 'axios';

const Posts = () => {
    const [posts, setPosts] = useState([{}]);

    const url = "http://localhost/social/api/functions/posts.php";

    useEffect(() => {
        const handlePosts = async () => {
            const resp = await axios.get(url, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Accept": "application/json",
                }
            })
            setPosts(resp.data.data);
        }
        handlePosts();
    }, [])


    return (posts &&
        (
            <div className='posts'>
                {posts.map((post) => (
                    <Post post={post} key={post.id ? post.id : 'random'} />
                )
                )}
            </div>
        )
    )
}

export default Posts;