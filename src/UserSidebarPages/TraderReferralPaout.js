import React, { useEffect, useState } from "react";
import "../css/TraderReferralPayout.css";
import { BiArrowBack } from "react-icons/bi";
import axios from "axios";
import moment from "moment";
import { Table } from "antd";
import baseUrl from "../baseUrl";
import { useNavigate } from "react-router-dom";
const apiurl = baseUrl.apiUrl;

const TraderReferralPaout = () => {
    const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    callApiToUserPayout();
  }, []);

  const columns = [
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
      onFilter: (value, record) =>
        record.refferUserID.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Credit Amount",
      dataIndex: "creditAmount",
      key: "creditAmount",
      render: (text) => (
        <span style={{ fontWeight: "bold" }}>
          {new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
          }).format(text)}
        </span>
      ),
    },

    {
      title: "New/Renewal",
      dataIndex: "Type",
      key: "Type",
    },
    {
      title: "Date",
      dataIndex: "Date",
      key: "Date",
      render: (text) => moment(text).format("DD/MM/YY HH:mm:ss"),
    },

    {
      title: "Reffer Trader ID",
      dataIndex: "refferUserId",
      key: "refferUserId",
    },
  ];

  const callApiToUserPayout = () => {
    let data = {
      userid: localStorage.getItem("userid"),
    };
    const token = localStorage.getItem("token");
    let config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .post(
        `${apiurl}` + "/user/users/fetch-own-referral-payout",

        data,
        config
      )
      .then((res) => {
        console.log(res.data.fetchedData, "refral details");
        setData(res.data.fetchedData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const gotoDashboard = ()=>{
    navigate('/userdashboard/dashboard')
  }
  return (
    <>
      <div className="referral-payout-container">
        <div className="payout-header">
          <spna style={{ color: "wheat" }}>
            <BiArrowBack
              style={{ cursor: "pointer" }}
              onClick={gotoDashboard}
            />
            &nbsp;Referral Payout
          </spna>
        </div>
        <Table dataSource={data} columns={columns} />
      </div>
    </>
  );
};

export default TraderReferralPaout;
