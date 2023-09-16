import { useContext } from 'react';
import './stories.scss';
import { AuthContext } from '../../context/authContext';

const Stories = () => {

    const { currentUser } = useContext(AuthContext);

    const stories = [
        {
            id: 2,
            name: 'Sandesh Subedi',
            img: "https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
        {
            id: 3,
            name: 'Sandesh Subedi',
            img: "https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
        {
            id: 4,
            name: 'Sandesh Subedi',
            img: "https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
        {
            id: 5,
            name: 'Sandesh Subedi',
            img: "https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
        {
            id: 6,
            name: 'Sandesh Subedi',
            img: "https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
        {
            id: 7,
            name: 'Sandesh Subedi',
            img: "https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        }
    ]
    return (
        <div className='stories'>
            <div className="story">
                <img src={currentUser.img} />
                <span>Create Story</span>
                <button>+</button>
            </div>
            {stories.map((story) => {
                return (
                    <div className="story" key={story.id}>
                        <img src={story.img} />
                        <span>{story.name}</span>
                    </div>
                );
            })}
        </div>
    )
}

export default Stories;