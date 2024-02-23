import React, { useEffect, useState } from "react";
import "../css/HelpFriend.css";
import axios from "axios";
import { Input, message } from "antd";
import baseUrl from "../baseUrl";

const apiurl = baseUrl.apiUrl;

const HelpFriend = () => {
  const [toUser, setToUser] = useState("");
  const [amount, setAmount] = useState("");
  const [wallet, setWalletAmount] = useState(0);
  useEffect(() => {
    callApiToAllUserData();
  });

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
      const response = await axios.post(
        `${apiurl}` + "/user/trading-wallet-transfer-from-one-user-to-another",
        payload,
        config
      );
      message.success(response.data.message);

      setToUser("");
      setAmount("");
    } catch (error) {
      message.warning(error.response.data.message);
    }
  };
  const callApiToAllUserData = () => {
    let data = {
      _id: localStorage.getItem("user"),
    };
    let token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(`${apiurl}` + "/user/fetch-user-details-userside", data, config)
      .then((res) => {
        const totalWallet =
          res.data.result.wallet + res.data.result.tradingWallet;
        const formattedTradingWallet = totalWallet.toLocaleString("en-IN", {
          style: "currency",
          currency: "INR",
        });
        setWalletAmount(formattedTradingWallet);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="help-friend-container">
        <div className="help-friend-header">
          <p>Transfer wallet amount to your friend</p>
          <div className="user-wallet">{wallet}</div>
        </div>
        <div className="help-friend-body">
          <div className="help-friend-content">
            <form onSubmit={handleTransfer}>
              <label>Friend's User Id:</label>
              <br />
              <Input
                type="text"
                value={toUser}
                onChange={(e) => setToUser(e.target.value)}
                required
              />

              <br />
              <label> Amount: </label>
              <br />

              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />

              <br />
              <button className="button-style" type="primary" htmlType="submit">
                Transfer
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default HelpFriend;
