import { useContext, useEffect, useState } from "react";
import "./story.scss";
import { AuthContext } from "../../context/authContext";
import Api from "../../api/Api";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { DarkModeContext } from "../../context/darkmodeContext";
import { ArrowLeft, ArrowRight, CrossOutlineSvg, CrossSvg, ProfileSvg } from "../../assets/svg/svg";
import toast from "react-hot-toast";
import moment from "moment";

const Story = () => {
  const [stories, setStories] = useState([]);
  const [mainStory, setMainStory] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);
  const [count, setCount] = useState({ previous: '', next: '' });
  const [addStory, setAddStory] = useState(true);
  const [timeoutId, setTimeoutId] = useState(null);

  const params = useParams();
  const Navigate = useNavigate('');

  useEffect(() => {
    if (params.id === 'addStory') {
      setAddStory(true);
      setCount({ previous: null, next: null });
    }
    //VIEW ALL STORY API CALL
    if (currentUser) {
      const url = `${Api}api/functions/stories`;
      const viewStories = async () => {
        try {
          const resp = await axios.post(url, { id: params.id }, {
            headers: {
              "Content-Type": "multipart/form-data", "Accept": "application/json",
            }
          });
          if (resp.data.status === 200) {
            setStories(resp.data.data);
            let i = 0;
            for (i = 0; i < resp.data.data.length; i++) {
              if (resp.data.data[i].active === true) {
                setAddStory(false);

                if (i === 0) {
                  setCount({ previous: null, next: resp.data.data[i + 1].id });
                }
                else if (i === resp.data.data.length - 1) {
                  setCount({ previous: resp.data.data[i - 1].id, next: null });
                }
                else {
                  setCount({ previous: resp.data.data[i - 1].id, next: resp.data.data[i + 1].id });
                }

                if (i !== resp.data.data.length - 1) {
                  if (timeoutId) {
                    clearTimeout(timeoutId);
                  }
                  const newTimeoutId = setTimeout(() => {
                    Navigate(`/story/${resp.data.data[i + 1].id}`);
                  }, 5000);
                  setTimeoutId(newTimeoutId);
                }

                setMainStory(resp.data.data[i]);
                break;
              }
            }
          } else {
            toast.error(resp.data.message);
          }
        }
        catch (error) {
          console.error("Error:", error);
        }
      }
      viewStories();
    }
  }, [params])

  return (
    <div className={`theme-${darkMode ? 'dark' : 'light'}`}>
      <div className="story_container">
        <div className="allStories">
          <div className="topCont">
            <div className="top" onScroll={(e) => e.target.classList.add('topContScroll')}>
              <Link to='/' style={{ textDecoration: 'none' }} onClick={() => {
                if (timeoutId) clearTimeout(timeoutId)
              }
              }
              >
                <span>SafeBook</span>
              </Link>
              <Link to='/' style={{ textDecoration: 'none' }} onClick={() => {
                if (timeoutId) clearTimeout(timeoutId)
              }}>
                <div><CrossOutlineSvg /></div>
              </Link>
            </div>
          </div>
          <div className="middle">
            <h2>Stories</h2>
            <h4>Your Story</h4>
            <Link to={`/story/addStory`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="createStory">
                <div className="addStory">+</div>
                <div>
                  <span>Create a story</span><br />
                  <span>Share a photo or write something.</span>
                </div>
              </div>
            </Link>
          </div>
          <hr />
          <div className="bottom">
            {stories.map((story) => {
              return (
                <span key={story.id}>
                  <Link to={`/story/${story.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className={story.active ? 'active items' : 'items'}>
                      {story.profilePic ?
                        <img
                          src={Api + story.profilePic}
                          alt=""
                          className=""
                        />
                        :
                        <ProfileSvg />
                      }
                      <div>
                        <span className="storyName">{story.name}</span><br />
                        <span className="storyDate">{moment.utc(story.createdAt).local().fromNow()}</span>
                      </div>
                    </div >
                  </Link>
                </span>
              );
            })}
          </div>
        </div>
        <div className="storyView">
          <div className="left">
            {count.previous !== null ?
              <Link to={`/story/${count.previous}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <button ><ArrowLeft /></button>
              </Link> : ''
            }
          </div>
          <div className="center">
            {!addStory ?
              <>
                <div className="top">
                  {mainStory.profilePic ?
                    <img
                      src={Api + mainStory.profilePic}
                      alt=""
                      className=""
                    />
                    : <ProfileSvg />
                  }
                  <div>
                    <div>{mainStory.name}</div>
                    <div className="storyDate">{moment.utc(mainStory.createdAt).local().fromNow()}</div>
                  </div>
                </div>
                <div className="storyimg">
                  <div>
                    <img src={Api + mainStory.img} onClick={(e) => { e.target.classList.toggle('imgClick') }} />
                  </div>
                  <img src={Api + mainStory.img} className="blurEffect" />
                </div>
              </>
              :
              <div className="storyimg">
                <div>
                  <img src="https://images.pexels.com/photos/7135121/pexels-photo-7135121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
                </div>
                <img src='https://images.pexels.com/photos/7135121/pexels-photo-7135121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' className="blurEffect" />
              </div>
            }
          </div>
          <div className="right">
            {count.next !== null ?
              <Link to={`/story/${count.next}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <button ><ArrowRight /></button>
              </Link> : ""
            }
          </div>
        </div>
      </div >
    </div >
  )
}

export default Story