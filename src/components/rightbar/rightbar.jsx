import { useContext, useEffect, useState } from 'react';
import './rightbar.scss';
import { AuthContext } from '../../context/authContext';
import { ProfileSvg } from '../../assets/svg/svg';
import Api from '../../api/Api';
import axios from 'axios';
import toast from 'react-hot-toast';
import Suggestions from './suggestions';


const Rightbar = () => {
  const { currentUser } = useContext(AuthContext);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const url = `${Api}api/functions/other/suggestions?id=${currentUser.id}`;
    if (currentUser) {
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
          <div className="user">
            <div className="userInfo">
              {currentUser.profilePic ?
                <img
                  src={Api + currentUser.profilePic}
                  alt=""
                  className="profilePic"
                />
                :
                <ProfileSvg />
              }
              <p>
                <span>Sandesh Subedi</span> changed cover picture.
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              {currentUser.profilePic ?
                <img
                  src={Api + currentUser.profilePic}
                  alt=""
                  className="profilePic"
                />
                :
                <ProfileSvg />
              }
              <p>
                <span>Sandesh Subedi</span> liked a post.
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              {currentUser.profilePic ?
                <img
                  src={Api + currentUser.profilePic}
                  alt=""
                  className="profilePic"
                />
                :
                <ProfileSvg />
              }
              <p>
                <span>Sandesh Subedi</span> liked a comment.
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              {currentUser.profilePic ?
                <img
                  src={Api + currentUser.profilePic}
                  alt=""
                  className="profilePic"
                />
                :
                <ProfileSvg />
              }
              <p>
                <span>Sandesh Subedi</span> posted.
              </p>
            </div>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="item">
          <span>Online Friends</span>
          <div className="user">
            <div className="userInfo">
              {currentUser.profilePic ?
                <img
                  src={Api + currentUser.profilePic}
                  alt=""
                  className="profilePic"
                />
                :
                <ProfileSvg />
              }
              <div className="online" />
              <span>Sandesh Subedi</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              {currentUser.profilePic ?
                <img
                  src={Api + currentUser.profilePic}
                  alt=""
                  className="profilePic"
                />
                :
                <ProfileSvg />
              }
              <div className="online" />
              <span>Sandesh Subedi</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              {currentUser.profilePic ?
                <img
                  src={Api + currentUser.profilePic}
                  alt=""
                  className="profilePic"
                />
                :
                <ProfileSvg />
              }
              <div className="online" />
              <span>Sandesh Subedi</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              {currentUser.profilePic ?
                <img
                  src={Api + currentUser.profilePic}
                  alt=""
                  className="profilePic"
                />
                :
                <ProfileSvg />
              }
              <div className="online" />
              <span>Sandesh Subedi</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              {currentUser.profilePic ?
                <img
                  src={Api + currentUser.profilePic}
                  alt=""
                  className="profilePic"
                />
                :
                <ProfileSvg />
              }
              <div className="online" />
              <span>Sandesh Subedi</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              {currentUser.profilePic ?
                <img
                  src={Api + currentUser.profilePic}
                  alt=""
                  className="profilePic"
                />
                :
                <ProfileSvg />
              }
              <div className="online" />
              <span>Sandesh Subedi</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              {currentUser.profilePic ?
                <img
                  src={Api + currentUser.profilePic}
                  alt=""
                  className="profilePic"
                />
                :
                <ProfileSvg />
              }
              <div className="online" />
              <span>Sandesh Subedi</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Rightbar