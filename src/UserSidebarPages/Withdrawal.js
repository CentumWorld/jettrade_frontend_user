import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Withdrawal.css";
import btc from "../img/Deposit account coin type/btc.png";
import doge from "../img/Deposit account coin type/doge.svg";
import binpay from "../img/Deposit account coin type/binpay.svg";
import lite from "../img/Deposit account coin type/litecoin.svg";
import nt from "../img/Deposit account coin type/nt.png";
import skrill from "../img/Deposit account coin type/skrill.png";
import usdte from "../img/Deposit account coin type/usdte.svg";
import wallet from "../img/wallet_46876-34835925.png";
import bank from "../img/bank.png";
import UPI from "../img/upi.png";
import { BiArrowBack } from "react-icons/bi"

const Withdrawal = () => {
  const navigate = useNavigate();
  const withdrawalAmount = () =>{
    navigate('/userdashboard/wallet-withdrawal')
  }

  const gotoDashboard = ()=>{
    navigate('/userdashboard/dashboard')
  }
  return (
    <>
      <div className="withdraw_container">
        <div className="withdraw_card">
          <div className="withdraw_heading">
            <h5> <BiArrowBack onClick={gotoDashboard} style={{cursor:'pointer'}}/> &nbsp;Payment Methods</h5>
          </div>

          <div className="withdraw_account_type ">
            <div className="withdraw_coin_card">
              <span>
                <img src={btc} alt="" width="200px" height="60px" />
              </span>
            </div>
            <div className="withdraw_coin_card">
              <span>
                <img src={doge} alt="" width="80px" height="40px" />
              </span>
              <span className="ms">Dogecoin</span>
            </div>
            <div className="withdraw_coin_card">
              <span>
                <img src={binpay} alt="" width="100px" height="40px" />
              </span>
              <span className="ms"> Ethereum</span>
            </div>
            <div className="withdraw_coin_card">
              <div className="lite-coin">
                <span>
                  <img src={lite} alt="" width="80px" height="40px" />
                </span>
                <span>Litecoin</span>
              </div>
            </div>
            <div className="withdraw_coin_card">
              <span>
                <img src={nt} alt="" width="180px" height="60px" />
              </span>
            </div>
            <div className="withdraw_coin_card">
              <span>
                <img src={skrill} alt="" width="180px" height="50px" />
              </span>
            </div>
            <div className="withdraw_coin_card">
              <span>
                <img src={usdte} alt="" width="80px" height="40px" />
              </span>
              <span>Tether (ERC20)</span>
            </div>
            <div className="withdraw_coin_card">
              <span>
                <img src={wallet} alt="" height={45} width={45} />
              </span>
              <span>Wallet</span>
            </div>
            <div className="withdraw_coin_card" onClick={withdrawalAmount}>
              <span>
                <img src={bank} alt="" width="40px" height="40px" />
              </span>
              <span>Bank/Account</span>
            </div>
            <div className="withdraw_coin_card">
              <span>
                {" "}
                <img src={UPI} alt="" width="80px" height="40px" />
              </span>
              <span>UPI</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Withdrawal;
