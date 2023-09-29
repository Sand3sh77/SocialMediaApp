import { useContext, useEffect, useState } from 'react';
import Post from '../post/post';
import './posts.scss';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';
import usePosts from '../../hooks/usePosts';

const Posts = ({calledFrom,paramsId}) => {
    const [posts, setPosts] = useState([{}]);
    const { currentUser } = useContext(AuthContext);

    const { isLoading, error, data, refetch } = usePosts(currentUser.id,calledFrom,paramsId);

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