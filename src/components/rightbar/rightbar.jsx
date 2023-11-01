import { useContext, useEffect, useState } from 'react';
import './rightbar.scss';
import { AuthContext } from '../../context/authContext';
import { ChatOutlined, ProfileSvg } from '../../assets/svg/svg';
import Api, { ChatApi } from '../../api/Api';
import axios from 'axios';
import toast from 'react-hot-toast';
import Suggestions from './suggestions';
import { Link } from 'react-router-dom';
import { ChatContext } from '../../context/chatContext';
import Notifications from './notifications';


const Rightbar = () => {
  const { currentUser } = useContext(AuthContext);
  const [suggestions, setSuggestions] = useState([]);
  const [friends, setFriends] = useState(true);
  const [allFriends, setAllFriends] = useState([]);
  const { onlineUsers, setOnlineUsers, setChatId, setRecepientId } = useContext(ChatContext);

  let count = false;

  useEffect(() => {
    if (currentUser) {

      const url = `${Api}api/functions/other/suggestions?id=${currentUser.id}`;
      const handleSuggestions = async () => {
        try {
          const resp = await axios.get(url);
          if (resp.data.status === 200) {
            setSuggestions(resp.data.data);
          }
          else {
            toast.error(resp.data.message);
          }
        }
        catch (error) {
          console.error("Error:", error);
        }
      }
      handleSuggestions();

      const furl = `${Api}api/functions/other/allFriends?id=${currentUser.id}`;
      const handleAllFriends = async () => {
        try {
          const resp = await axios.get(furl);
          if (resp.data.status === 200) {
            setAllFriends(resp.data.data);
          }
          else {
            toast.error(resp.data.message);
          }
        }
        catch (error) {
          console.error("Error:", error);
        }
      }
      handleAllFriends();

    }

  }, [])

  const handleMessage = async (firstId) => {
    const url = `${ChatApi}chats`;
    try {
      const resp = await axios.post(url, { firstId: firstId, secondId: JSON.parse(currentUser.id) }, {
        headers: {
          "Content-Type": "application/json",
        }
      })
      if (resp.status === 200) {
        setChatId(resp.data._id);
        if (resp.data.members[0] == currentUser.id) {
          setRecepientId(resp.data.members[1]);
        } else {
          setRecepientId(resp.data.members[0]);
        }
      }
      else {
        toast.error(resp.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="rightbar">
      <div className="container">

        {suggestions.length !== 0 ?
          <div className="item">
            <span>Suggestions For You</span>
            {suggestions.map((suggestion) => {
              return (
                <Suggestions suggestion={suggestion} key={suggestion.id} setSuggestions={setSuggestions} suggestions={suggestions} />
              );
            })}
          </div>
          : ""}

        <Notifications limit="5" />

        <div className="item">
          <div className="friends">
            {friends ?
              <>
                <span className='active' >All Friends</span>
                <div className='border'></div>
                <span onClick={() => setFriends(false)}>Active Friends</span>
              </>
              :
              <>
                <span onClick={() => setFriends(true)}>All Friends</span>
                <div className='border'></div>
                <span className='active'>Active Friends</span>
              </>
            }
          </div>
          {friends ?
            <>
              {allFriends[0] != null ?
                <>
                  {
                    allFriends.map((friend) => {
                      return (
                        <Link to={`/profile/${friend.id}`} style={{ textDecoration: 'none', color: 'inherit' }} key={friend.id}>
                          <div className="user">
                            <div className="userInfo">
                              {friend.profilePic ?
                                <>
                                  {
                                    friend.profilePic.split('/')[0] === 'api' ?
                                      <img
                                        src={Api + friend.profilePic}
                                        alt=""
                                        className=""
                                      />
                                      :
                                      <img
                                        src={friend.profilePic}
                                        alt=""
                                        className=""
                                      />
                                  }
                                </>
                                :
                                <>
                                  <div className="">
                                    <ProfileSvg />
                                  </div>
                                </>
                              }
                              {/* <div className="online" /> */}
                              <span style={{ textWrap: 'nowrap' }}>{friend.name}</span>
                            </div>
                          </div>
                        </Link>
                      );
                    })
                  }
                </>
                :
                <div className="noUsersFollowed">
                  No users followed.
                </div>
              }
            </>
            :
            <>
              {allFriends[0] != null ?
                <>
                  {
                    allFriends.map((friend) => {
                      return (
                        <div key={friend.id}>
                          {
                            onlineUsers.some((user) => user?.userId === friend?.id) ?
                              <div className="user">
                                {count = true}
                                <Link to={`/profile/${friend.id}`} style={{ textDecoration: 'none', color: 'inherit' }} >
                                  <div className="userInfo">
                                    {friend.profilePic ?
                                      <>
                                        {
                                          friend.profilePic.split('/')[0] === 'api' ?
                                            <img
                                              src={Api + friend.profilePic}
                                              alt=""
                                              className=""
                                            />
                                            :
                                            <img
                                              src={friend.profilePic}
                                              alt=""
                                              className=""
                                            />
                                        }
                                      </>
                                      :
                                      <>
                                        <div className="">
                                          <ProfileSvg />
                                        </div>
                                      </>
                                    }
                                    <div className="online" />
                                    <span style={{ textWrap: 'nowrap' }}>{friend.name}</span>
                                  </div>
                                </Link>
                                <div onClick={() => handleMessage(friend.id)}><ChatOutlined /></div>
                              </div>
                              : ""
                          }
                        </div>
                      );
                    })
                  }
                </>
                :
                <>
                  <div className="noUsersFollowed">
                    No users followed.
                  </div>
                </>
              }
              {!count ?
                <div className="noUsersFollowed">
                  No active friends.
                </div> : ''
              }
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default Rightbar