import { Link } from 'react-router-dom'
import './login.scss'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/authContext'
import { AlertContext } from '../../context/alertContext'
import Alert from '../../components/alert/alert'
import axios from 'axios'

const Login = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })
    const { userToken, setUserToken } = useContext(AuthContext);
    const { alert, setAlert } = useContext(AlertContext);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    // LOGIN API CALL
    const url = "http://localhost/social/api/authentication/login.php";

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data", "Accept": "application/json",
                }
            }
            )
            setAlert(response.data);
            if (response.data.status === 200) {
                setUserToken(response.data.token);
            }
        }
        catch (error) {
            console.error("Error:", error);
        }

    }
    return (
        <div className='login'>
            {alert && <Alert />}
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
                            <Link to="/register" style={{textDecoration:'none'}}>
                                <button className='hide'>Register</button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login