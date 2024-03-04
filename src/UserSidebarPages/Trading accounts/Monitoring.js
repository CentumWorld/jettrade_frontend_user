import React from 'react'
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi"
import '../../css/Monitoring.css'

const Monitoring = () => {
    const navigate = useNavigate();
    const gotoDashboard = ()=>{
        navigate('/userdashboard/dashboard')
      }
    return (
        <>
            <div className='monitoring_main_container'>
                <div className='monitoring_card'>
                    <div className='monitoring_heading'>
                        <p> <BiArrowBack onClick={gotoDashboard} style={{cursor:'pointer'}}/>&nbsp;JETTRADE FX real Forex accounts monitoring system</p>
                    </div>
                    <div className='monitoring_para'>
                        <p>This is a list of already monitored accounts and those available for monitoring. Here you can also manage the monitoring.</p>
                    </div>
                    <div className='monitoring_available_account'>
                        <p>Your available accounts</p>
                    </div>
                    <div className='monitoring_available_account_field'>
                        <span>Account</span>
                        <span>Server</span>
                        <span>Type</span>
                    </div>
                    <hr />
                    <div className='monitoring_available_account_field_data'>
                        <span style={{color: "#000"}}>No record found</span>
                    </div>

                    <div className='monitoring_monitored_account'>
                        <p>Your monitored accounts</p>
                    </div>
                    <div className='monitoring_monitored_account_field'>
                        <span>Account</span>
                        <span>Server</span>
                        <span>Type</span>
                    </div>
                    <hr />
                    <div className='monitorined_account_data'>
                        <span style={{color: "#000"}}>No record</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Monitoring