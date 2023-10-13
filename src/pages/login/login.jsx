import { Link, useNavigate } from 'react-router-dom'
import './login.scss'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/authContext'
import axios from 'axios'
import toast from 'react-hot-toast'
import Api from '../../api/Api'
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";

const Login = () => {
    const Navigate = useNavigate();
    const [response, setResponse] = useState([]);
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

    // WITH GOOGLE
    const onSuccess = async () => {
        const s_url = `${Api}api/authentication/signup`;
        try {
            const response = await axios.post(s_url, { username: response.given_name, email: response.email, name: response.name }, {
                headers: {
                    "Content-Type": "multipart/form-data", "Accept": "application/json",
                }
            })
            if (response.data.status === 200) {
                navigate('/login');
                toast.success(response.data.message);
            }
            else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
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
                        <GoogleLogin
                            onSuccess={credentialResponse => {
                                var token = credentialResponse.credential;
                                var decoded = jwt_decode(token);
                                setResponse(decoded);
                                onSuccess();
                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                            useOneTap
                            cookiePolicy={'single_host_origin'}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login