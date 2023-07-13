import React, { useState } from 'react'
import { Button, Modal, Input, message } from 'antd';
import axios from 'axios';

function UserForgetPassword(props) {
    const [visible, setVisible] = useState(true);
    const [inputValue, setInputValue] = useState('');
    const [otpValue, setOtpValue] = useState('');
    const [userIdSubmitted, setUserIdSubmitted] = useState(false);
    const [otpSubmitted, setOtpSubmitted] = useState(false);
    const [newPassword, setNewPassword] = useState({
        password: "",
        confirmPassword: ""
    });


    const forgetPasswordFuction = (e) => {
        setInputValue(e.target.value);
    }

    const handleCloseModal = () => {
        setVisible(false);
    }
    const otpInputFuction = (e) => {
        setOtpValue(e.target.value);
    }



    const sendOtpFunction = () => {
        let data = {
            phone: inputValue
        }

        if (inputValue === '') {
            message.warning('Please enter UserID');
        } else {
           
            axios.post('/user/forgetPassword', data)
            .then((res) => {
                message.success('OTP sent successfully');
                setUserIdSubmitted(true);
            })
            .catch((err) => {
               message.error(err.response.data.message)
                
            })
            
            
        }
    };

    const verifyOtpFunction = () => {
        let data = {
            phone:inputValue,
            otp: otpValue
        }
        console.log(data,'49');
        if (otpValue === '') {
            
            message.warning('Please enter OTP !!')
            
        } else {
            axios.post('/user/verifyOtp',data)
            .then((res) => {
             console.log(res);
             message.success(res.data.message);

            })
            .catch((err) => {
                console.log(err);
            })
            setOtpSubmitted(true);
        }
    }
    const setPasswordFunction = (e) => {
        const { name, value } = e.target;
        setNewPassword({ ...newPassword, [name]: value });
    };

    const resetPasswordFunction = () =>{
        let data = {
            phone:inputValue,
            newPassword:newPassword.password,
            confirmPassword:newPassword.confirmPassword
        }
        if (newPassword.password.length < 8 ) {
            message.warning('Password should be atleast 8 characters')
        }else{
            if (newPassword.password === '') {
            message.warning('Please enter password !!')
        }
        else if (newPassword.confirmPassword === '') {
            message.warning('Please enter confirm password !!')
        }
        else if (newPassword.password !== newPassword.confirmPassword) {
            message.warning('Password and confirm password mismatch !!')
        }   
        else {
            axios.post('/user/resetPassword',data)
            .then((res) => {
                //console.log(res);
                message.success(res.data.message);

                handleCloseModal();
            })
            .catch((err) => {
               console.log(err);

            })
        }
        }
        

    }
    

    props.forgfunc(visible);
    return (
        <>

            <Modal
                title="Forget Password"
                open={visible}
                onCancel={handleCloseModal}
                footer={null}
            >
                <div>
                    <Input value={inputValue} placeholder='Enter Mobile No' onChange={forgetPasswordFuction} style={{marginBottom:'3px'}} />
                    
                    <Button key="ok" type="primary" onClick={sendOtpFunction} disabled={userIdSubmitted}>
                        Submit
                    </Button>
                    {userIdSubmitted && (
                        <>
                            <hr />
                            <Input value={otpValue} placeholder="Enter Your OTP" onChange={otpInputFuction} style={{ marginBottom: '3px' }} />

                            <Button key="ok" type="primary" onClick={verifyOtpFunction} disabled={otpSubmitted}>
                                Verify
                            </Button>
                        </>
                    )}

                    {otpSubmitted && (
                        <>
                            <hr />
                            <Input.Password name="password" placeholder='Password' value={newPassword.password} onChange={setPasswordFunction} style={{ marginBottom: '3px' }} />
                            <Input.Password name="confirmPassword" placeholder='Confirm password' value={newPassword.confirmPassword} onChange={setPasswordFunction} style={{ marginBottom: '3px' }} />

                            <Button key="ok" type="primary" onClick={resetPasswordFunction}>
                                Reset
                            </Button>
                        </>
                    )}
                </div>
            </Modal>
        </>
    )
}

export default UserForgetPassword