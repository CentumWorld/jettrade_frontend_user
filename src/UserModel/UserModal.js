import React, { useRef } from "react";
import ReactDom from "react-dom";
import '../UserModel/UserModel.css';
import { NavLink } from "react-router-dom";
import { RiErrorWarningFill } from 'react-icons/ri';
import {MdOutlineVerifiedUser} from 'react-icons/md';
import {IoMdLock} from 'react-icons/io'
import {GiAnticlockwiseRotation} from 'react-icons/gi'
import {BiNews} from 'react-icons/bi'
import {BsStars} from 'react-icons/bs'
import {FaUserCircle,FaRegFlag} from 'react-icons/fa'


export const UserModal = ({ setShowModal }) => {
    // close the modal when clicking outside the modal.
    const modalRef = useRef();
    const closeModal = (e) => {
        if (e.target === modalRef.current) {
            setShowModal(false);
        }
    };

    // render the modal JSX in the portal div.
    return ReactDom.createPortal(
        <div className="container" ref={modalRef} onClick={closeModal}>
            <div className="user_modal">
                <ul>
                    <li><NavLink to="/userdashboard/setting/userdetails"><RiErrorWarningFill/>&nbsp;&nbsp; Your Details</NavLink></li>
                    <li><NavLink to="/userdashboard/setting/verify"><MdOutlineVerifiedUser/>&nbsp;&nbsp;Profile verification</NavLink></li>
                    <li><NavLink to="/userdashboard/setting/changepassword"><IoMdLock/>&nbsp;&nbsp;Change password</NavLink></li>
                    <li><NavLink to="/userdashboard/setting/resetpassword"><GiAnticlockwiseRotation/>&nbsp;&nbsp;Reset password</NavLink></li>
                </ul>
            </div>
        </div>,
        document.getElementById("portal")
    );
};


