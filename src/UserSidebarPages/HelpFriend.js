
import React, { useEffect, useState } from "react";
import "../css/HelpFriend.css";
import axios from "axios";
import { Input, Button, message } from "antd";
import {FaRupeeSign} from 'react-icons/fa';
import baseUrl from '../baseUrl';

const apiurl = baseUrl.apiUrl

const HelpFriend = () => {
  // State variables to store form inputs
  const [toUser, setToUser] = useState("");
  const [amount, setAmount] = useState("");
  const [wallet, setWalletAmount] = useState(0)
  useEffect(()=>{
  
     callApiToAllUserData();
    
  })

  const handleTransfer = async (e) => {
    e.preventDefault();
    try {
      const userid = localStorage.getItem("userid");
      const payload = {
        fromUser: userid,
        toUser: toUser,
        amount: parseFloat(amount), 
      };
      const token = localStorage.getItem("token");

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await axios.post("/user/trading-wallet-transfer-from-one-user-to-another",
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
  const  callApiToAllUserData = ()=>{
    let data = {
      _id : localStorage.getItem('user')
    }
    let token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios.post("/user/fetch-user-details-userside",data,config)
    .then((res)=>{
      const totalWallet = res.data.result.wallet + res.data.result.tradingWallet;
      const formattedTradingWallet =
      totalWallet.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
      setWalletAmount(formattedTradingWallet)
    })
    .catch(err=>{
      console.log(err)
    })
  };

  return (
    <>
      <div className="help-friend-container">
        <div className="help-friend-header">
          <p>Transfer wallet amount to your friend</p>
          <div className="user-wallet">
          <FaRupeeSign/>&nbsp;{wallet}
          </div>
        </div>
        <div className="help-friend-body">
          <div className="help-friend-content">
            <form onSubmit={handleTransfer}>
              {/* Friend's Username */}
              <label>Friend's User Id:</label><br />
                <Input
                // style={{width:'300px'}}
                  type="text"
                  value={toUser}
                  onChange={(e) => setToUser(e.target.value)}
                  required
                />
              
              <br />
              {/* Amount */}
              <label> Amount: </label><br />
               
                <Input
                //  style={{width:'300px'}}
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
             
              <br />
              <Button
                style={{ marginTop:'15px'}}
                type="primary" htmlType="submit">
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
