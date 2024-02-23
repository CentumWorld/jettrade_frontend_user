import React, { useState, useContext } from "react";
import "../css/UserLogin.css";
import { useNavigate, NavLink } from "react-router-dom";
import Axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../App";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Input, message } from "antd";
import { UserOutlined, UnlockOutlined } from "@ant-design/icons";

function UserLogin(props) {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  props.func(show);
  const { state, dispatch } = useContext(UserContext);
  let navigate = useNavigate();
  const [user, setUser] = useState({
    userid: "",
    password: "",
  });
  const [hide, setHide] = useState(true);
  const handleInputs = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const userLogin = (e) => {
    e.preventDefault();
    Axios.post("/user/login", {
      userid: user.userid,
      password: user.password,
    })
      .then((response) => {
        dispatch({ type: "USER", payload: true });
        localStorage.setItem("login", true);
        user.userid = "";
        user.password = "";
        localStorage.setItem("user", response.data.userLogin._id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userid", response.data.userLogin.userid);
        localStorage.setItem("refferal", response.data.userLogin.refferal_id);
        navigate("/userdashboard");
      })
      .catch((error) => {
        if (error.response.status === 422) {
          toast.warning("Please Fill all Details!", {
            autoClose: 2000,
            theme: "dark",
          });
          user.userid = "";
          user.password = "";
        }
        if (error.response.status === 404) {
          message.warning("Invalid Credential!");
        }
      });
    setShow(false);
  };

  return (
    <>
      <ToastContainer />
      <div className="userLogin-page">
        <div className="userLogin-body">
        </div>
      </div>
    </>
  );
}

export default UserLogin;
