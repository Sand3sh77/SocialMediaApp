import { useContext, useEffect, useState } from 'react';
import Post from '../post/post';
import './posts.scss';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';
import usePosts from '../../hooks/usePosts';

const Posts = () => {
    const [posts, setPosts] = useState([{}]);
    const { currentUser } = useContext(AuthContext);


    // useEffect(() => {
    //     // POST DETAILS API CALL  
    //     const url = `http://localhost/social/api/functions/posts?id=${currentUser.id}`;
    //     const handlePosts = async () => {
    //         const resp = await axios.get(url, {
    //             headers: {
    //                 "Content-Type": "multipart/form-data",
    //                 "Accept": "application/json",
    //             }
    //         })
    //         setPosts(resp.data.data);
    //     }
    //     handlePosts();
    // }, [])

    const { isLoading, error, data, refetch } = usePosts(currentUser.id);

    // if(isLoading){
    //     return <p>Loading ...</p>
    // }

    return (data &&
        (
            <div className='posts'>
                {data.data.data.map((post) => (
                    <Post post={post} key={post.id ? post.id : 'random'} />
                )
                )}
            </div>
        )
    )
}

export default Posts;