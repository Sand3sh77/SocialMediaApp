import './leftbar.scss';
import Friends from "../../assets/logo/1.png";
import Groups from "../../assets/logo/2.png";
import Market from "../../assets/logo/3.png";
import Watch from "../../assets/logo/4.png";
import Memories from "../../assets/logo/5.png";
import Events from "../../assets/logo/6.png";
import Gaming from "../../assets/logo/7.png";
import Gallery from "../../assets/logo/8.png";
import Videos from "../../assets/logo/9.png";
import Messages from "../../assets/logo/10.png";
import Tutorials from "../../assets/logo/11.png";
import Courses from "../../assets/logo/12.png";
import Fund from "../../assets/logo/13.png";
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import { ProfileSvg } from '../../assets/svg/svg';
import { Link } from 'react-router-dom';
import Api from '../../api/Api';

const Leftbar = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="leftbar">
      <div className="container">
        <div className="menu">
          <Link to={`/profile/${currentUser.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="user">
              {currentUser.profilePic ?
                <>
                  {
                    currentUser.profilePic.split('/')[0] === 'api' ?
                      <img
                        src={Api + currentUser.profilePic}
                        alt=""
                        className=""
                      />
                      :
                      <img
                        src={currentUser.profilePic}
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
              <span>{currentUser.name}</span>
            </div>
          </Link>
          <div className="item">
            <img src={Friends} alt='' />
            <span>Friends</span>
          </div>
          <div className="item">
            <img src={Groups} alt='' />
            <span>Groups</span>
          </div>
          <div className="item">
            <img src={Market} alt='' />
            <span>Marketplace</span>
          </div>
          <div className="item">
            <img src={Watch} alt='' />
            <span>Watch</span>
          </div>
          <div className="item">
            <img src={Memories} alt='' />
            <span>Memories</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Your Shortcuts</span>
          <div className="item">
            <img src={Events} alt='' />
            <span>Events</span>
          </div>
          <div className="item">
            <img src={Gaming} alt='' />
            <span>Gaming</span>
          </div>
          <div className="item">
            <img src={Gallery} alt='' />
            <span>Gallery</span>
          </div>
          <div className="item">
            <img src={Videos} alt='' />
            <span>Videos</span>
          </div>
          <div className="item">
            <img src={Messages} alt='' />
            <span>Messages</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Others</span>
          <div className="item">
            <img src={Fund} alt='' />
            <span>Fundraiser</span>
          </div>
          <div className="item">
            <img src={Tutorials} alt='' />
            <span>Tutorials</span>
          </div>
          <div className="item">
            <img src={Courses} alt='' />
            <span>Courses</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Leftbar