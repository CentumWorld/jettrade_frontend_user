import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import '../../css/ChangePassword.css';
import { Input, message } from 'antd';
import axios from 'axios';
import { BiArrowBack } from "react-icons/bi"
import baseUrl from '../../baseUrl';

const apiurl = baseUrl.apiUrl

function ChangePassword() {
  const navigate = useNavigate();
  const [selectDiv, setSelectDiv] = useState('');
  const [formData, setFormData] = useState({ oldPassword: '', newPassword: '' });

  function onChangeValue(event) {
    setSelectDiv(event.target.value);
  }

  const changePasswordFunction = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const submitChangePassword = ()=>{
    if(formData.oldPassword === ''){
      message.warning('Please enter old password !!');
    }
    else if(formData.newPassword === ''){
      message.warning('Please enter new password !!');
    }
    else{
      const token =localStorage.getItem('token');
      let data = {
        oldpassword: formData.oldPassword,
        newpassword: formData.newPassword,
        usertype : "TRADER",
        id : localStorage.getItem('userid')
      }
      axios.post(`${apiurl}`+'/password/passwordChange/allPasswordChange', data)
      .then(res => {
          message.success(res.data.message);
          setFormData('');
      })
      .catch(err => {
        message.error("Server error !!");
      })
    }

  }

  const gotoDashboard = ()=>{
    navigate('/userdashboard/dashboard')
  }
  return (
    <>

      <div className='change_password'>
        <div className='change_password_card'>
          <div className='row'>
            <div className='change_password_heading '>
              <p> <BiArrowBack onClick={gotoDashboard} style={{cursor:'pointer'}}/>&nbsp;Password Management</p>

            </div>
            <div className='change_password_para'>
              <p>Here you can change and reset your JettradeFX PIN, Personal Area password, and passwords for all your trading accounts.</p>
            </div>

          </div>
          <div className='change_password_label '>
            <p>Change Password</p>
            <hr />
          </div>
          <div className='select_password_type_info'>
            <p>Select a password or PIN</p>

            <div className='password_radio_select'>
              <div onChange={onChangeValue}>
                <label htmlFor="html">Change password </label>
              </div>

            </div>
          </div>
          
            <div className='fx_pin'>
              <div className='password_form'>
                <div className='newpassword form-group'>
                  <label htmlFor="new_password">Old Password</label>
                  <Input.Password name="oldPassword" value={formData.oldPassword} onChange={changePasswordFunction} placeholder='Old Password' />
                </div>
                <div className='password_form'>
                  <div className='newpassword form-group'>
                    <label htmlFor="new_password">New Password</label>
                    <Input.Password name="newPassword" value={formData.newPassword} onChange={changePasswordFunction} placeholder='New Password' />
                  </div>
                </div>
                <div className='change_password_submit'>
                  <button className='btn btn-primary' onClick={submitChangePassword}>Change</button>
                </div>
              </div>

            </div>

        </div>

      </div>


    </>
  )
}

export default ChangePassword