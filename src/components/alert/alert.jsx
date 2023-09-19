import React, { useContext } from 'react'
import { AlertContext } from '../../context/alertContext'
import './alert.scss'

const Alert = () => {
    const { alert, setAlert } = useContext(AlertContext);

    setTimeout(() => {
        setAlert(false);
    }, 5000);

    return (
        <div className='alert-container'>
            <img src="src/assets/svg/cross.svg" style={{width:"2rem"}}></img>
            {alert.message}
        </div>
    )
}

export default Alert