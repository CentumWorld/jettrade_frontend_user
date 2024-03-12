import React, { useContext, useState } from "react";
import "../css/Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { UseParamContext } from "./UserRegistration";
import UserForgetPassword from "./UserForgetPassword";
import Button from "react-bootstrap/Button";
import { Dropdown, Menu } from "antd";

import logo from "./../img/logo1.png";

import { makeStyles } from "@material-ui/core/styles";
import { RiLogoutBoxLine } from "react-icons/ri";

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

function Navbar() {
  // ==========================================
  const [isExpanded, setIsExpanded] = useState(false);
  const classes = useStyles();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsDrawerOpen(open);
  };
  const inviteCode = useContext(UseParamContext);

  const { state, dispatch } = useContext(UserContext);
  const login = localStorage.getItem("login");

  const [userShow, setUserShow] = useState(false);
  const [adminShow, setAdminShow] = useState(false);
  const [passwordModal, setPasswordModel] = useState(false);

  const openUserLoginFuction = () => setUserShow(true);
  const pull_data = (data) => setUserShow(data);

  const openForgetPasswordFunction = () => setPasswordModel(true);
  const forgetdata = (data) => setPasswordModel(data);

  const openAdminLoginFuction = () => setAdminShow(true);
  const pull_addmin = (data) => setAdminShow(data);
  const navigate = useNavigate();
  const handleMenuClick = (e) => {
    if (e.key === "login") {
      navigate("/user-login");
    }
    if (e.key === "signup") {
      navigate("/user-registration");
    }
    if (e.key === "forget") {
      openForgetPasswordFunction();
    }
    if (e.key === "payment") {
      navigate("/paymentpage");
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="login">Login</Menu.Item>
      <Menu.Item key="signup">Sign Up</Menu.Item>
      {/* <Menu.Item key="forget">Forget Password</Menu.Item> */}
      <Menu.Item key="payment">Payment</Menu.Item>
    </Menu>
  );

  const RenderMenu = () => {
    if (login && !inviteCode) {
      return (
        <>
          <li className="nav-item">
            <NavLink
              className="btn rounded btn-outline-primary rounded-pill"
              to="/logout"
              aria-current="page"
              style={{
                marginRight: "1rem",
                display: "flex",
                alignItems: "center",
                gap: ".5rem",
                width: "max-content",
              }}
            >
              Logout
              <RiLogoutBoxLine style={{ height: "1rem", width: "1rem" }} />
            </NavLink>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li className="nav-item">
            <Dropdown overlay={menu} trigger={["click"]}>
              <Button variant=" btn rounded btn-outline-primary rounded-pill">
                User
              </Button>
            </Dropdown>
          </li>
        </>
      );
    }
  };

  const handleToggle = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <>
      <nav id="navbar_container" className="navbar navbar-box navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="navbar-brand">
            <div>
              <h3>JETTRADE FX </h3>
            </div>
            <div>
              <img src={logo} alt="" className="logo-img" />
            </div>
            <div>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                onClick={handleToggle}
                aria-expanded={isExpanded?"true":"false"}
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>
            </div>
          </div>
          <div  className={`collapse navbar-collapse ${
            isExpanded ? "show" : ""
          }`}
          id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <RenderMenu />
            </ul>
          </div>
        </div>
        {passwordModal ? <UserForgetPassword forgfunc={forgetdata} /> : ""}
      </nav>
    </>
  );
}

export default Navbar;
