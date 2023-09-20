import './rightbar.scss'

const Rightbar = () => {
  return (
    <div className="rightbar">
      <div className="container">
        <div className="item">
          <span>Suggestions For You</span>
          <div className="user suggestion">
            <div className="userInfo">
              <img src='../src/assets/user/profile.jpg' />
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
              <img src='../src/assets/user/profile.jpg' />
              <p>
                <span>Sandesh Subedi</span> changed cover picture.
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src='../src/assets/user/profile.jpg' />
              <p>
                <span>Sandesh Subedi</span> liked a post.
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src='../src/assets/user/profile.jpg' />
              <p>
                <span>Sandesh Subedi</span> liked a comment.
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src='../src/assets/user/profile.jpg' />
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
              <img src='../src/assets/user/profile.jpg' />
              <div className="online" />
              <span>Sandesh Subedi</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src='../src/assets/user/profile.jpg' />
              <div className="online" />
              <span>Sandesh Subedi</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src='../src/assets/user/profile.jpg' />
              <div className="online" />
              <span>Sandesh Subedi</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src='../src/assets/user/profile.jpg' />
              <div className="online" />
              <span>Sandesh Subedi</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src='../src/assets/user/profile.jpg' />
              <div className="online" />
              <span>Sandesh Subedi</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src='../src/assets/user/profile.jpg' />
              <div className="online" />
              <span>Sandesh Subedi</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src='../src/assets/user/profile.jpg' />
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