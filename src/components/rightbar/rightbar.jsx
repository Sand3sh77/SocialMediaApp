import { useContext } from 'react';
import './rightbar.scss';
import { AuthContext } from '../../context/authContext';
import { ProfileSvg } from '../../assets/svg/svg';
import Api from '../../api/Api';


const Rightbar = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="rightbar">
      <div className="container">
        <div className="item">
          <span>Suggestions For You</span>
          <div className="user suggestion">
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
              <span>Sandesh Subedi</span>
            </div>
            <div className="buttons">
              <button>Follow</button>
              <button>Dismiss</button>
            </div>
          </div>
        </div>
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