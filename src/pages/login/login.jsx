import { Link } from 'react-router-dom'
import './login.scss'
import { useContext } from 'react'
import { AuthContext } from '../../context/authContext'

const Login = () => {
    const { login } = useContext(AuthContext);
    return (
        <div className='login'>
            <div className='card'>
                <div className="left">
                    <h1>Hello World</h1>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque est commodi quos nihil aliquam, nam asperiores .</p>
                    <span>Don't you have an account?</span>
                    <Link to="/register">
                        <button>Register</button>
                    </Link>
                </div>
                <div className="right">
                    <h1>Login</h1>
                    <form>
                        <input type="text" placeholder='Username' />
                        <input type="password" placeholder='Password' />
                        <button type='submit' onClick={() => login()}>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login