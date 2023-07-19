import React,{useState, useContext,useEffect} from 'react'
import '../css/UserLogin.css';
import { Input, message,Button } from 'antd';
import { UserOutlined, UnlockOutlined } from '@ant-design/icons';
import { NavLink,useNavigate } from 'react-router-dom';
import axios  from 'axios';
import { UserContext } from '../App';
import baseUrl from '../baseUrl';

const apiurl = baseUrl.apiUrl


const Userlogin1 = () => {
    const [show, setShow] = useState(true);
    const { state, dispatch } = useContext(UserContext);
    let navigate = useNavigate()
    const [user, setUser] = useState({
        userid: "", password: ""
    });
    const [hide, setHide] = useState(true);
    const handleInputs =(e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
        console.log(e.target.value)
    }
// Remeber me

const [rememberMe, setRememberMe] = useState(false);
const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
};

    useEffect(() => {
        const storeUserID = localStorage.getItem('userid');
        console.log(storeUserID, "ytgygy")
        const storedPassword = localStorage.getItem('password');
        console.log(storedPassword, "uygygjugyu")

        const storedRememberMe = localStorage.getItem('rememberMe');
    
        if (storedRememberMe === 'true') {
          setUser({userid:storeUserID,password:storedPassword});
        //   setMember({password:storedPassword});
          setRememberMe(true);
        }
      }, []);

    //   -------------

    const userLogin = (e) => {
        e.preventDefault();
        if (rememberMe) {
            localStorage.setItem('userid', user.userid);
            localStorage.setItem('password', user.password);
            localStorage.setItem('rememberMe', true);
        } else {
            // If "Remember Me" is unchecked, remove the stored login information
            localStorage.removeItem('userid');
            localStorage.removeItem('password');
            localStorage.removeItem('rememberMe');
        }
        axios.post(`${apiurl}`+"/user/login", {
            userid: user.userid,
            password: user.password
        })
            .then((response) => {
                if (response.data.status) {

                dispatch({ type: "USER", payload: true });
                localStorage.setItem('login', true);
                user.userid = '';
                user.password = "";
                console.log(response.data.userLogin);
                localStorage.setItem('user', response.data.userLogin._id);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userid', response.data.userLogin.userid);
                localStorage.setItem('refferal',response.data.userLogin.refferal_id);
                localStorage.setItem('userfname',response.data.userLogin.fname);
                localStorage.setItem('userType',response.data.userLogin.userType);
                
                navigate('/userdashboard');
            } else {
              message.warning(response.data.message);
            }
            }).catch((error) => {
                console.log('Not login');
                if (error.response.status === 422) {
                    message.warning("Please Fill all Details!", {
                        autoClose: 2000,
                        theme: "dark"
                    });
                    user.userid = '';
                    user.password = "";
                }
                if (error.response.status === 404) {
                   
                    message.warning("Invalid Credential!");
                   
                }
                if (error.response.status === 403) {
                   
                    message.warning("Your account has been blocked!");
                   
                }
            })
            setShow(false);
    }

    return (
        <>
            <div className='userLogin-page'>
                <div className='userLogin-body'>
                    <p>Welcome to JETTRADE FX</p>
                    <h6>Sign in with credentials</h6>
                    <div className='row'>
                        <div className='col'>
                            <div className='userid-section form-group mb-3'>
                                <label htmlFor="userid"> LOGIN ID</label>
                                <Input placeholder='Enter user ID '
                                className='custom-placeholder-userid'
                                    prefix={<UserOutlined />}
                                    value={user.userid}
                                    name='userid'
                                    allowClear
                                    onChange={handleInputs}
                                />
                            </div>
                        </div>

                    </div>

                    <div className='row'>
                        <div className='col'>
                            <div className='password-section form-group mb-3'>
                                <label htmlFor="password">PASSWORD</label>

                                <Input.Password placeholder='Enter your password'
                                    className="custom-placeholder-password"
                                    prefix={<UnlockOutlined />}
                                    value={user.password}
                                    name='password'
                                    onChange={handleInputs}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col'>
                            <div className='readme'>
                                <label>
                                    Remember Me &nbsp;
                                    <input
                                        type="checkbox"
                                        name="rememberMe"
                                        checked={rememberMe}
                                        onChange={handleRememberMeChange}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col'>
                            <div className='signin-button'>
                                <Button type="primary" onClick={userLogin}>
                                    Sign in
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* <div className='row'>
                        <div className='col'>
                            <div className='login-with-otp'>
                                <NavLink to='/' >
                                Or, Login with OTP
                                </NavLink>
                            </div>
                        </div>
                    </div> */}

                    <div className='row'>
                        <div className='home-signup col'>
                            <div className='home'>
                                <NavLink to='/'>Home</NavLink>
                            </div>
                            <div className='signup'>
                            <NavLink to='/user-registration'>Create Account</NavLink>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Userlogin1