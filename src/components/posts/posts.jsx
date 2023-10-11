import { useContext, useState } from 'react';
import Post from '../post/post';
import './posts.scss';
import { AuthContext } from '../../context/authContext';
import usePosts from '../../hooks/usePosts';

const Posts = ({ calledFrom, paramsId }) => {
    const { currentUser } = useContext(AuthContext);

    if (currentUser.id) {
        const { isLoading, error, data, refetch } = usePosts(currentUser.id, calledFrom, paramsId);

        if (isLoading) {
            return <p>Loading ...</p>
        }
        if (data.data.data.length === 0) {
            if (calledFrom === "profile") {
                return (
                    <div className='noPosts'>
                        No posts by user
                    </div>
                );
            }
            else {
                return (
                    <div className='noPosts'>
                        No users followed
                    </div>
                );
            }
        }

        return (
            data &&
            (
                <div className='posts'>
                    {data.data.data.map((post) => (
                        <Post post={post} key={post.id ? post.id : 'random'} />
                    )
                    )}
                </div>
            )
        );
    }
}

export default Posts;