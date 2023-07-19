import React, { useContext, useState } from 'react'
import '../css/Navbar.css'
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import { UseParamContext } from './UserRegistration'
//import UserRegistration from './UserRegistration';
//import AdminLogin from './AdminLogin';
import UserForgetPassword from './UserForgetPassword';
import Button from 'react-bootstrap/Button';
import { Dropdown, Menu } from 'antd';

import logo from './../img/logo1.png';


// ==================================================


import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import { FiSettings} from 'react-icons/fi'

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    drawer: {
        width: 250,
    },
    drawerContent: {
        padding: theme.spacing(2),
    },
}));


// =====================================================






function Navbar() {

    // ==========================================

    const classes = useStyles();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setIsDrawerOpen(open);
    };



    // ==============================================
    const inviteCode = useContext(UseParamContext);

    const { state, dispatch } = useContext(UserContext);
    const login = localStorage.getItem('login');


    const [userShow, setUserShow] = useState(false);
    const [adminShow, setAdminShow] = useState(false);
    const [passwordModal, setPasswordModel] = useState(false);

    const openUserLoginFuction = () => setUserShow(true);
    const pull_data = (data) => setUserShow(data);

    const openForgetPasswordFunction = () => setPasswordModel(true);
    const forgetdata = (data) => setPasswordModel(data);

    const openAdminLoginFuction = () => setAdminShow(true);
    const pull_addmin = (data) => setAdminShow(data);


    //react metarial drop down
    const navigate = useNavigate();
    const handleMenuClick = (e) => {
        console.log(e.key);
        if (e.key === 'login') {
            //openUserLoginFuction();
            navigate('/user-login');
        }
        if (e.key === 'signup') {
            //console.log("hii");
            // <NavLink to="/user-registration">Sign Up</NavLink>
            navigate('/user-registration');
        }
        if (e.key === 'forget') {
            openForgetPasswordFunction();
        }
        if (e.key === 'payment') {
            navigate('/paymentpage');
        }
    };

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="login">Login</Menu.Item>
            <Menu.Item key="signup">Sign Up</Menu.Item>
            <Menu.Item key="forget">Forget Password</Menu.Item>
            <Menu.Item key='payment'>Payment</Menu.Item>
        </Menu>
    );
    // -------------------------------------------

    const RenderMenu = () => {
        if (login && !inviteCode) {
            return (

                <>

                    <li className="nav-item">
                        <NavLink className="btn btn-outline-dark rounded-pill " to="/logout" aria-current="page" >Logout</NavLink>
                    </li>
                </>
            )
        } else {
            return (
                <>
                    {/* <li className="nav-item">
                       
                        <Button variant=" btn rounded btn-outline-primary rounded-pill" onClick={openAdminLoginFuction}>
                            Admin
                        </Button>
                    </li>&nbsp;&nbsp; */}
                    <li className="nav-item">

                        {/* <Button variant=" btn rounded btn-outline-primary rounded-pill" onClick={openUserLoginFuction}>
                            User
                        </Button> */}
                        <Dropdown overlay={menu} trigger={['click']}>
                            <Button variant=" btn rounded btn-outline-primary rounded-pill">
                                User
                            </Button>
                        </Dropdown>


                    </li>



                </>
            )
        }
    }

    return (
        <>
            <nav className="navbar navbar-box navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">

                <div className="navbar-brand"><h3>JETTRADE FX <span><img src={logo} alt="" style={{width:'100px', height:'35px', marginLeft:"530px"}} /></span></h3>
                    </div>
                    {/* <div className="navbar-brand"><h3>JETTRADE FX</h3></div> */}
                    {/* ======================= */}
                    {/*<div className='small-sidebar'>

                        <div>
                            <IconButton
                                edge="start"
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="menu"
                                onClick={toggleDrawer(true)}
                            >
                                <FiSettings/>
                            </IconButton>
                            <Drawer
                                anchor="left"
                                open={isDrawerOpen}
                                onClose={toggleDrawer(false)}
                                classes={{ paper: classes.drawer }}
                            >
                                <div className={classes.drawerContent}>
                                    
                                    hii
                                </div>
                            </Drawer>
                        </div>
                    </div>*/}
                    {/* ======================== */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <RenderMenu />


                        </ul>

                    </div>
                </div>
                {/* {userShow ?
                    <UserLogin func={pull_data} /> : ''

                } */}

                {
                    passwordModal ?
                        <UserForgetPassword forgfunc={forgetdata} /> : ''
                }


            </nav>





        </>
    )
}

export default Navbar