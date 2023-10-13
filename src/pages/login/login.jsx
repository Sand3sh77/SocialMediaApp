import { Link, useNavigate } from 'react-router-dom'
import './login.scss'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/authContext'
import axios from 'axios'
import toast from 'react-hot-toast'
import Api from '../../api/Api'
import { GoogleLogin } from 'react-google-login';

const Login = () => {
    const Navigate = useNavigate();
    const { setUserToken } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    // LOGIN API CALL
    const url = `${Api}api/authentication/login`;
    const clientId = '679091620787-lhnoo22beg9a3it84q1hnbqu1md2lo2c.apps.googleusercontent.com';
    const Secret = "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";

    const responseGoogleSuccess = (response) => {
        console.log('Google login success:', response);
    }

    const responseGoogleFailure = (error) => {
        console.error('Google login failed:', error);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data", "Accept": "application/json",
                }
            }
            )
            if (response.data.status === 200) {
                setUserToken(response.data.token);
                toast.success(response.data.message);
                Navigate('/');
            }
            else {
                toast.error(response.data.message);
            }
        }
        catch (error) {
            console.error("Error:", error);
        }

    }
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
                    <form onSubmit={handleSubmit}>
                        <input type="text"
                            placeholder='Username'
                            name='username'
                            value={formData.username}
                            onChange={handleChange} />
                        <input type="password"
                            placeholder='Password'
                            name='password'
                            value={formData.password}
                            onChange={handleChange} />
                        <div className='buttons'>
                            <button type='submit'>Login</button>
                            <Link to="/register" style={{ textDecoration: 'none' }}>
                                <button className='hide'>Register</button>
                            </Link>
                        </div>
                    </form>
                    <div className='externals'>
                        {/* <GoogleLogin
                            clientId={clientId}
                            buttonText="Login with Google"
                            onSuccess={responseGoogleSuccess}
                            onFailure={responseGoogleFailure}
                            cookiePolicy={'single_host_origin'}
                        /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login