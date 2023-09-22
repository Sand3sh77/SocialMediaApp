import { Link, useNavigate } from 'react-router-dom';
import './register.scss';
import { useContext, useEffect, useState } from 'react';
import Alert from '../../components/alert/alert';
import { AlertContext } from '../../context/alertContext';
import axios from 'axios';

const Register = () => {
    const navigate = useNavigate();
    const { alert, setAlert } = useContext(AlertContext);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        name: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const url = "http://localhost/social/api/authentication/signup.php";
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data", "Accept": "application/json",
                }
            })
            setAlert(response.data);
            if (response.data.status === 200) {
                navigate('/login');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className='register'>
            {alert && <Alert />}
            <div className='card'>
                <div className="left">
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit} action='#'>
                        <input type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Username"
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                        />
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                        />
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Name"
                        />
                        <div className='buttons'>
                            <button type='submit'>Register</button>
                            <Link to="/login" style={{textDecoration:'none'}}>
                                <button type='submit' className='hide'>Login</button>
                            </Link>
                        </div>
                    </form>
                </div>
                <div className="right">
                    <h1>Hello Social</h1>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque est commodi quos nihil aliquam, nam asperiores .</p>
                    <span>Do you have an account?</span>
                    <Link to="/login">
                        <button type='submit'>Login</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Register