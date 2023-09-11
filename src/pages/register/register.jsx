import { Link } from 'react-router-dom'
import './register.scss';

const Register = () => {
    return (
        <div className='register'>
            <div className='card'>
                <div className="left">
                    <h1>Register</h1>
                    <form>
                        <input type="text" placeholder='Username' />
                        <input type="email" placeholder='Email' />
                        <input type="password" placeholder='Password' />
                        <input type="text" placeholder='Name' />
                        <button type='submit'>Register</button>
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