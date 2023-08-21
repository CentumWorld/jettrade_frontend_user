import React, { useEffect, useState } from 'react'
import '../css/MyTeam.css';
import axios from 'axios';
import { Table } from 'antd';
import moment from 'moment';
import baseUrl from '../baseUrl';
const apiurl = baseUrl.apiUrl


const MyTeam = () => {
    const [myTeam, setMyTeam] = useState([])

    useEffect(()=>{
        callApiToMyTeam();
    },[])

    const callApiToMyTeam =()=>{
        let token = localStorage.getItem('token')
        let data = {
            refferal_id:localStorage.getItem('refferal')
        }
        const config = {
            headers: { Authorization: `Bearer ${token}` },
          };
        axios.post('/user/users/user-my-team', data, config)
        .then((res)=>{
            setMyTeam(res.data.teamMembers)
            //console.log(res.data.teamMembers)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const columns = [
        {
          title: 'User ID',
          dataIndex: 'userid',
          key: 'userid',
        },
        {
            title: 'Amount',
            dataIndex: 'referralAmount',
            key: 'referralAmount',
            render: (amount) => {
              // Format the amount with two decimal places
              const formattedAmount = parseFloat(amount).toFixed(2);
              return <span>₹{formattedAmount}</span>;
            },
          },
        {
          title: 'New/Renewal',
          dataIndex: 'userType',
          key: 'userType',
        },
      ];
    
  return (
    <>
        <div className='myteam-container'>
            <div className='myteam-header'>
                <p>Referral Payout</p>
            </div>
            <div>
            <Table dataSource={myTeam}  columns={[
              ...columns,
              {
                title: 'Joining Date',
                dataIndex: 'joininigDate',
                key: 'joininigDate',
                render: (joininigDate) => {
                  // Format the date using moment.js
                  const formattedDate = moment(joininigDate).format('YYYY-MM-DD HH:mm');
    
                  return <span>{formattedDate}</span>;
                },
              },
            ]} />
            </div>
        </div>
    </>
  )
}

export default MyTeam