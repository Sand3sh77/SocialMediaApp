import { useContext, useEffect, useState } from "react";
import "./story.scss";
import { AuthContext } from "../../context/authContext";
import Api from "../../api/Api";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { DarkModeContext } from "../../context/darkmodeContext";
import { ArrowLeft, ArrowRight, CrossOutlineSvg, CrossSvg, PauseSolid, PlaySolid, ProfileSvg } from "../../assets/svg/svg";
import toast from "react-hot-toast";
import moment from "moment";
import AllStories from "./allStories";

const Story = () => {
  const [stories, setStories] = useState([]);
  const [mainStory, setMainStory] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);
  const [count, setCount] = useState({ previous: '', next: '' });
  const [addStory, setAddStory] = useState(true);
  const [file, setFile] = useState(null);
  const [callApi, setCallApi] = useState('');

  // THIS IS TO MOVE THE TIMEBAR ON TOP OF THE STORIES
  const [timeoutId, setTimeoutId] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  const [timeoutTime, setTimeoutTime] = useState(10000);
  const [startTimer, setStartTimer] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);

  // useEffect(() => {
  //   const newintervalId = setInterval(() => {
  //     const currentTime = Date.now();
  //     const elapsedTime = currentTime - startTimer;
  //     setTimeElapsed(elapsedTime);

  //     // Check if time is up, and if so, clear the interval
  //     if (elapsedTime >= 10000) {
  //       clearInterval(intervalId);
  //     }

  //   }, 1); // Update every 100 milliseconds
  //   setIntervalId(newintervalId);
  // }, [startTimer]);

  const params = useParams();
  const Navigate = useNavigate('');

  useEffect(() => {
    if (params.id === 'addStory') {
      setAddStory(true);
      setCount({ previous: null, next: null });
    }
    //VIEW ALL STORY API CALL
    if (currentUser) {
      const url = `${Api}api/functions/stories/stories`;
      const viewStories = async () => {
        try {
          const resp = await axios.post(url, { currentUserId: currentUser.id, paramsId: params.id }, {
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
                    setStartTimer(Date.now());
                    Navigate(`/story/${resp.data.data[i + 1].id}`);
                  }, timeoutTime);
                  setTimeoutId(newTimeoutId);
                } else {
                  if (timeoutId) {
                    clearTimeout(timeoutId);
                  }
                  const newTimeoutId = setTimeout(() => {
                    Navigate(`/`);
                  }, timeoutTime);
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
  }, [params, callApi])

  // ADD STORY API CALL
  const handleSubmit = (e) => {
    e.preventDefault();
    setAddStory(false);
    const url = `${Api}api/functions/stories/addStory`;
    const addStory = async () => {
      try {
        const resp = await axios.post(url, { file: file, userId: currentUser.id }, {
          headers: {
            "Content-Type": "multipart/form-data", "Accept": "application/json",
          }
        });
        if (resp.data.status === 200) {
          toast.success(resp.data.message);
          setCallApi(resp.data);
          setFile(null);
        } else {
          toast.error(resp.data.message);
        }
      }
      catch (error) {
        console.error("Error:", error);
      }
    }
    addStory();
  };

  const Reset = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setTimeoutId(null);
  }
  return (
    <div className={`theme-${darkMode ? 'dark' : 'light'}`}>
      <div className="story_container">
        <div className="allStories">
          <div className="topCont">
            <div className="top" onScroll={(e) => e.target.classList.add('topContScroll')}>
              <Link to='/' style={{ textDecoration: 'none' }} onClick={Reset}
              >
                <span>SafeBook</span>
              </Link>
              <Link to='/' style={{ textDecoration: 'none' }} onClick={Reset}>
                <div><CrossOutlineSvg /></div>
              </Link>
            </div>
          </div>
          <div className="middle">
            <h2>Stories</h2>
            <h4>Your Story</h4>
            <Link to={`/story/addStory`} style={{ textDecoration: 'none', color: 'inherit' }} onClick={Reset}>
              <div className="createStory">
                <div className="addStory">+</div>
                <div>
                  <span>Create a story</span><br />
                  <span>Share a photo or write something.</span>
                </div>
              </div>
            </Link>
            <div className="bottom">
              {stories.map((story) => (
                currentUser.id === story.userId ?
                  <AllStories story={story} key={story.id} />
                  : null
              ))}
            </div>
          </div>
          <hr />

          {/* ALL STORIES NAVIGATION */}
          <div className="bottom">
            <h4>All Stories</h4>
            {stories.map((story) => (
              currentUser.id !== story.userId ?
                <AllStories story={story} key={story.id} />
                : null
            ))}
          </div>
        </div>
        <div className="storyView">
          <Link to='/' style={{ textDecoration: 'none', zIndex: '55' }} onClick={Reset} className="cross">
            <div><CrossOutlineSvg /></div>
          </Link>
          <div className="left">
            {count.previous !== null ?
              <Link to={`/story/${count.previous}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <button ><ArrowLeft /></button>
              </Link> : ''
            }
          </div>
          <div className="center">

            {/* NORMAL MAIN SECTION */}
            {!addStory ?
              <>
                {/* <div className="timeBar" style={{ translate: `${(timeElapsed / 10000) * 100}% 0` }}></div> */}
                <div className="top" style={{ zIndex: '50' }}>
                  {mainStory.method === 'normal' ?
                    <>
                      {
                        mainStory.profilePic ?
                          <img
                            src={Api + mainStory.profilePic}
                            alt=""
                            className=""
                          />
                          :
                          <ProfileSvg />
                      }
                    </>
                    :
                    <>
                      <img
                        src={mainStory.profilePic}
                        alt=""
                        className=""
                      />
                    </>
                  }
                  <div>
                    <div>{mainStory.name}</div>
                    <div className="storyDate">{moment.utc(mainStory.createdAt).local().fromNow()}</div>
                  </div>
                  <div className="playPause" onClick={() => Reset()}>{timeoutId ? <PauseSolid /> : <PlaySolid />}</div>
                </div>
                <div className="storyimg">
                  <section>
                    <img src={Api + mainStory.img} onClick={(e) => { e.target.classList.toggle('imgClick') }} />
                  </section>
                  <img src={Api + mainStory.img} className="blurEffect" />
                </div>
              </>
              :

              // ADD STORY MAIN SECTION
              <>
                <div className="top" style={{ zIndex: '50' }}>
                  {currentUser.method === 'normal' ?
                    <>
                      {
                        currentUser.profilePic ?
                          <img
                            src={Api + currentUser.profilePic}
                            alt=""
                            className=""
                          />
                          :
                          <ProfileSvg />
                      }
                    </>
                    :
                    <>
                      <img
                        src={currentUser.profilePic}
                        alt=""
                        className=""
                      />
                    </>
                  }
                  <div>
                    <div>{currentUser.name}</div>
                    <div>Add Story</div>
                  </div>
                </div>
                <div className="storyimg">

                  {/* AFTER IMAGE ADDED */}
                  {file ?
                    <>
                      <section>
                        <img src={URL.createObjectURL(file)}
                          onClick={(e) => { e.target.classList.toggle('imgClick') }} />
                      </section>
                      <img src={URL.createObjectURL(file)} className="blurEffect" />
                    </>
                    :
                    // NORMAL WITH NO IMAGE ADDED
                    <>
                      <section>
                        <img src="https://images.pexels.com/photos/7135121/pexels-photo-7135121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" style={{ height: '100%' }} />
                      </section>
                      <img src='https://images.pexels.com/photos/7135121/pexels-photo-7135121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' className="blurEffect" />
                    </>}

                  <form onSubmit={handleSubmit}>
                    <input
                      type="file"
                      id="file"
                      name='file'
                      style={{ display: "none" }}
                      accept="image/png, image/jpeg,image/jpg,image/webp"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                    <div className="addAction">
                      {file ?
                        <>
                          <div className="bottom">
                            <span onClick={() => setFile(null)}>Cancel</span>
                            <button type="submit">Add Story</button>
                          </div>
                        </>
                        :
                        <label htmlFor="file">
                          <div className="createStory">
                            <div>Create a Story</div>
                            <div className="plus">+</div>
                          </div>
                        </label>
                      }
                    </div>
                  </form>
                </div>
              </>
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