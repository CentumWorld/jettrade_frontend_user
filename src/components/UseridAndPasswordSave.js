import React, {useState, useEffect} from 'react'
import '../css/UseridAndPasswod.css'
import {Button} from 'antd'
import { useNavigate } from 'react-router-dom'

const UseridAndPasswordSave = () => {
     
    const navigate = useNavigate();
    const [userid, setUserId] = useState('');
    const [password, setPassword] = useState('');

    useEffect(()=>{
        setUserId(localStorage.getItem('myuserid'))
        setPassword(localStorage.getItem('mypassword'))
    },[])
    const goPayment = () =>{
        navigate('/paymentpage');
    }

  return (
    <>
        <div className='useid-password-div'>
            <div className='userid-password-container'>
                <p>Welcome to JATTRADE FX</p>
                <h4>Please save your userid and password</h4>
                <div className='userid-and-password'>
                    <p>User ID</p>&nbsp; : &nbsp;<spna>{userid}</spna>
                </div>
                <div className='userid-and-password'>
                    <p>Password</p>&nbsp; : &nbsp;<span>{password}</span>
                </div>
                <div className='userid-and-password'>
                    <Button type='primary' onClick={goPayment}>Payment</Button>
                </div>
            </div>
            
        </div>
    </>
  )
}

export default UseridAndPasswordSave