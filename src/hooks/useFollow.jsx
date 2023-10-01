import toast from 'react-hot-toast';
import axios from 'axios';
import Api from '../api/Api';

const useFollow = async (followerId, followedId, isFollowed) => {
    const url = `${Api}api/functions/follow`;
    try {
        const resp = await axios.post(url, { followerId: followerId, followedId: followedId, isFollowed: isFollowed },
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                },
            })
        if (resp.data.status === 200) {
            toast.success(resp.data.message);
        }
        else {
            toast.error(resp.data.message);
        }
    }
    catch (error) {
        console.error("Error:", error);
    }
}

export default useFollow;