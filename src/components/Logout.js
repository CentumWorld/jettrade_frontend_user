import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../App';
import baseUrl from '../baseUrl';

const apiurl = baseUrl.apiUrl

function Logout() {
    const { state, dispatch } = useContext(UserContext);
    const navigate = useNavigate();
    console.log("Badal")

    useEffect(() => {
        fetch("/admin/logout", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },

        }).then((res) => {
            dispatch({ type: "USER", payload: false })
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            //localStorage.removeItem('userid');
            localStorage.removeItem('login');
            localStorage.removeItem('userType');
            localStorage.removeItem('refferal');
            localStorage.removeItem('userfname');
            localStorage.clear();
            navigate('/user-login');
        }).catch((error) => {
            navigate('/');
        })
    }, [state])
    return (
        <div>Logout</div>
    )
}

export default Logout