// import React from 'react'
// import '../css/HelpFriend.css'
// import axios from 'axios'

// const HelpFriend = () => {
//   return (
//     <>
//         <div className='help-friend-container'>
//             <div className='help-friend-header'>
//                 <p>Transfer wallet amount to your friend</p>
//             </div>
//             <div className='help-friend-body'>

//             </div>
//         </div>
//     </>
//   )
// }

// export default HelpFriend

import React, { useState } from "react";
import "../css/HelpFriend.css";
import axios from "axios";
import { Input, Button, message } from "antd";

const HelpFriend = () => {
  // State variables to store form inputs
  const [toUser, setToUser] = useState("");
  const [amount, setAmount] = useState("");

  const handleTransfer = async (e) => {
    e.preventDefault();
    try {
      const userid = localStorage.getItem("userid");
      const payload = {
        fromUser: userid,
        toUser: toUser,
        amount: amount,
      };
      const token = localStorage.getItem("token");

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await axios.post(
        "/user/trading-wallet-transfer-from-one-user-to-another",
        payload,
        config
      );
      message.success(response.data.message)

      setToUser("");
      setAmount("");
    } catch (error) {
      message.warning(error.response.data.message);
    }
  };

  return (
    <>
      <div className="help-friend-container">
        <div className="help-friend-header">
          <p>Transfer wallet amount to your friend</p>
        </div>
        <div className="help-friend-body">
          <div className="help-friend-content">
            <form onSubmit={handleTransfer}>
              {/* Friend's Username */}
              <label>Friend's UserId:</label><br />
                <Input
                    style={{width:'300px'}}
                  type="text"
                  value={toUser}
                  onChange={(e) => setToUser(e.target.value)}
                  required
                />
              
              <br />
              {/* Amount */}
              <label> Amount: </label><br />
               
                <Input
                 style={{width:'300px'}}
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
             
              <br />
              <Button  style={{width:'300px', marginTop:'15px'}} type="primary" htmlType="submit">
                Transfer
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default HelpFriend;
