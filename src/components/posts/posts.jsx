import Post from '../post/post';
import './posts.scss';

const Posts = () => {

    //TEMPORARY
    const posts = [
        {
            id: 1,
            name: "John Doe",
            userId: 1,
            profilePic:
                "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            img: "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
        },
        {
            id: 2,
            name: "Anne Marie",
            userId: 2,
            profilePic:
                "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            desc: "Tenetur iste voluptates dolorem rem commodi voluptate pariatur, voluptatum, laboriosam consequatur enim nostrum cumque! Maiores a nam non adipisci minima modi tempore.",
            img: "https://images.pexels.com/photos/18047577/pexels-photo-18047577/free-photo-of-sunset-serenity.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
    ];

    return (
        <div className='posts'>
            {posts.map((post) => (
                <Post post={post} key={post.id} />
            )
            )}

        </div>
    )
}

export default Posts;