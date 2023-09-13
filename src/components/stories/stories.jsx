import './stories.scss';

const Stories = () => {

    const stories = [
        {
            id: 2,
            name: 'Sandesh Subedi',
            img: "https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
        {
            id: 2,
            name: 'Sandesh Subedi',
            img: "https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
        {
            id: 2,
            name: 'Sandesh Subedi',
            img: "https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
        {
            id: 2,
            name: 'Sandesh Subedi',
            img: "https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
        {
            id: 2,
            name: 'Sandesh Subedi',
            img: "https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
    ]
    return (
        <div className='stories'>
            {stories.map((story) => {
                return (
                    <div className="story">
                        <img src={story.img} />
                        <span>{story.name}</span>
                    </div>
                );
            })}
        </div>
    )
}

export default Stories;