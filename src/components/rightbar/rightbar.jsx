import { useContext, useEffect, useState } from 'react';
import './rightbar.scss';
import { AuthContext } from '../../context/authContext';
import { ProfileSvg } from '../../assets/svg/svg';
import Api from '../../api/Api';
import axios from 'axios';
import toast from 'react-hot-toast';
import Suggestions from './suggestions';
import moment from 'moment';
import { Link } from 'react-router-dom';


const Rightbar = () => {
  const { currentUser } = useContext(AuthContext);
  const [suggestions, setSuggestions] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [friends, setFriends] = useState(true);
  const [allFriends, setAllFriends] = useState([]);

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

      const nurl = `${Api}api/functions/other/notifications?id=${currentUser.id}`;
      const handleNotifications = async () => {
        try {
          const resp = await axios.get(nurl);
          if (resp.data.status === 200) {
            setNotifications(resp.data.data);
          }
          else {
            toast.error(resp.data.message);
          }
        }
        catch (error) {
          console.error("Error:", error);
        }
      }
      handleNotifications();

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

        <div className="item">
          <span>Latest Activities</span>
          {notifications[0] != null ?
            <>
              {
                notifications.map((noti) => {
                  return (
                    <Link to={`/profile/${noti.userId}`} style={{ textDecoration: 'none', color: 'inherit' }} key={noti.id}>
                      <div className="user">
                        <div className="userInfo">
                          {noti.profilePic ?
                            <img
                              src={Api + noti.profilePic}
                              alt=""
                              className="profilePic"
                            />
                            :
                            <ProfileSvg />
                          }
                          <p>
                            <span>{noti.name}</span> {noti.notification}
                          </p>
                        </div>
                        <span>
                          {moment.utc(noti.createdAt).local().fromNow()
                            .replace('a few seconds', 'a sec')
                            .replace('a minute', '1 min')
                            .replace(/minutes?/, 'min')
                            .replace(/hours?/, 'h')
                            .replace(/days?/, 'd')
                            .replace(/months?/, 'mo')
                            .replace(/years?/, 'y')}
                        </span>
                      </div>
                    </Link>
                  );
                })
              }
            </> :
            <div className="noUsersFollowed">
              No recent activities
            </div>
          }
        </div>

        <div className="item">
          <div className="friends">
            {friends ?
              <>
                <span className='active' >All Friends</span>
                <div className='border'></div>
                <span onClick={() => setFriends(false)}>Online Friends</span>
              </>
              :
              <>
                <span onClick={() => setFriends(true)}>All Friends</span>
                <div className='border'></div>
                <span className='active'>Online Friends</span>
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
                                <img
                                  src={Api + friend.profilePic}
                                  alt=""
                                  className="profilePic"
                                />
                                :
                                <ProfileSvg />
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
                  No users followed
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
                        <Link to={`/profile/${friend.id}`} style={{ textDecoration: 'none', color: 'inherit' }} key={friend.id}>
                          <div className="user">
                            <div className="userInfo">
                              {friend.profilePic ?
                                <img
                                  src={Api + friend.profilePic}
                                  alt=""
                                  className="profilePic"
                                />
                                :
                                <ProfileSvg />
                              }
                              <div className="online" />
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
                  No users followed
                </div>
              }
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default Rightbar