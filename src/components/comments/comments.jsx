import { useContext } from 'react';
import './comments.scss';
import { AuthContext } from '../../context/authContext';

const Comments = () => {

    const { currentUser } = useContext(AuthContext);

    //TEMPORARY
    const comments = [
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
            img: "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
        },
    ];
    return (
        <div className='comments'>
            <div className='write'>
                <img src={currentUser.img} />
                <input type='text' placeholder='write a comment.' />
                <button>Send</button>
            </div>
            {comments.map((comment) => (
                <div className="comment" key={comment.id}>
                    <img src={comment.profilePic} />
                    <div className="cinfo">
                        <span>{comment.name}</span>
                        <p>{comment.desc}</p>
                    </div>
                    <span className='date'>1 hour ago.</span>
                </div>
            ))}
        </div>
    )
}

export default Comments