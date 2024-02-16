import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/DisplayCard.css";
import axios from "axios";
import { FaRupeeSign, FaHandHoldingUsd } from "react-icons/fa";
import { BsWallet2 } from "react-icons/bs";
import CountdownTimer from "./CountdownTimer";
import {
  Button,
  Modal,
  Dropdown,
  Menu,
  Select,
  Input,
  message,
  Alert,
} from "antd";
import baseUrl from "../baseUrl";
import RunningProgressiveBar from "./RunningProgressiveBar";
import TrialProgressiveBar from "./TrialProgressiveBar";
import ExpiredProgressiveBar from "./ExpiredProgressiveBar";

const apiurl = baseUrl.apiUrl;

const DisplayCard = () => {
  const handleMenuClick = (e) => {
    if (e.key === "cryptocurrency-market") {
      navigate("/userdashboard/cryptocurrency-market");
    }
    if (e.key === "economic-celender") {
      navigate("/userdashboard/economic-celender");
    }
    if (e.key === "heat-map") {
      navigate("/userdashboard/heat-map");
    }
    if (e.key === "cross-rates") {
      navigate("/userdashboard/cross-rates");
    }
    if (e.key === "screener") {
      navigate("/userdashboard/screener");
    }
    if (e.key === "market-data") {
      navigate("/userdashboard/market-data");
    }
    if (e.key === "traditional-currency-chart") {
      navigate("/userdashboard/traditional-currency-chart");
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="cryptocurrency-market">Cryptocurrency Market</Menu.Item>
      <Menu.Item key="traditional-currency-chart">
        Traditional currency chart
      </Menu.Item>
      <Menu.Item key="economic-celender">Economic Celender</Menu.Item>
      <Menu.Item key="heat-map">Heat Map</Menu.Item>
      <Menu.Item key="cross-rates">Cross rates</Menu.Item>
      <Menu.Item key="market-data">Market data</Menu.Item>
      <Menu.Item key="screener">Screener</Menu.Item>
    </Menu>
  );
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    userid: "",
    refferal: "",
  });
  const [subscriptionStatus, setSubscriptionStatus] = useState({
    userid: "",
    payment: false,
    expiry: "",
    doj: "",
    plan: Number,
    formattedAmount: "",
    count: 0,
  });
  const [subscription, setSubscription] = useState(0);
  const [totalWithdrawal, setTotalWithdrawal] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [refferalTeam, setRefferalTeam] = useState([]);
  const [isAddMoneyToWalletModalVisible, setIsAddMoneyToWalletModalVisible] =
    useState();
  const [money, setMoney] = useState(500);
  const [tradingWallet, setTradingWallet] = useState(0);
  const [dayCount, setDayCount] = useState(0);
  const [trialDate, setTrialDate] = useState(null);
  const [userFreeExpire, setExpireDate] = useState(null);
  const [blinking, setBlinking] = useState(true);
  const [totalTradingWallet, setTotalTradingWallet] = useState(0);
  const [
    isUserWithdrawalFromTradingWalletVisible,
    setIsUserWithdrawalFromTradingWalletVisible,
  ] = useState();
  const [progressiveBarData, setProgressiveBarData] = useState({
    totalCount: 0,
    runningStage: 0,
    trialStage: 0,
    expiredStage: 0,
    runningPercentage: 0,
    trialPercentage: 0,
    expiredPercentage: 0,
  });

  useEffect(() => {
    setUserDetails({
      userid: localStorage.getItem("userid"),
      refferal: localStorage.getItem("refferal"),
    });
    callApiToUserAllData();
    fetchUserDataForSubscription();
    fetchTotalWithdrawal();
    callApiToUserTotalWithdrawalFromTradingWallet();
    callApiToMyTeam();
    callApiProgressiveBar();
    const blinkInterval = setInterval(() => {
      setBlinking((prevBlinking) => !prevBlinking);
    }, 1000);

    return () => {
      clearInterval(blinkInterval);
    };
  }, []);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const isAddMoneyToWalletModal = () => {
    setIsAddMoneyToWalletModalVisible(true);
  };

  const addMoneyToWallethandleCancel = () => {
    setIsAddMoneyToWalletModalVisible(false);
  };

  const showUserWithdrawalFromTradingWallet = () => {
    setIsUserWithdrawalFromTradingWalletVisible(true);
  };

  const handleShowUserWithdrawalFromTradingWalletOk = () => {
    setIsUserWithdrawalFromTradingWalletVisible(false);
  };
  const handleShowUserWithdrawalFromTradingWalletCancel = () => {
    setIsUserWithdrawalFromTradingWalletVisible(false);
  };

  const share = (url) => {

    localStorage.removeItem("login");
    localStorage.removeItem("token");
    localStorage.removeItem("userid");
    localStorage.removeItem("user");
    localStorage.removeItem("userfname");
    localStorage.removeItem("refferal");
    localStorage.removeItem("userType");

    navigate(url, { target: "_blank" });
  };

  // joinChat
  const joinChat = () => {
    navigate("/userdashboard/chat");
  };

  // refferalWallet
  const refferalWallet = () => {
    navigate("/userdashboard/refferal-payout");
  };

  const walletWithdrawal = () => {
    navigate("/userdashboard/wallet-withdrawal");
  };

  // fetchUserDataForSubscription
  const fetchUserDataForSubscription = () => {
    const userid = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    const data = {
      _id: userid,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(`${apiurl}` + "/user/fetch-user-details-userside", data, config)
      .then((res) => {
        setSubscription(res.data.result.paymentCount);
        const walletAmount = res.data.result.wallet;
        const formattedAmount1 = walletAmount.toLocaleString("en-IN", {
          style: "currency",
          currency: "INR",
        });

        const originalDate = new Date(res.data.result.doj);

        // Add 30 days
        const newDate = new Date(originalDate);
        newDate.setDate(originalDate.getDate() + 30);
        const formattedNewDate = newDate.toISOString().split("T")[0];

        // expiry check
        const currentDate = new Date();
        const differenceInMilliseconds = currentDate - originalDate;
        const differenceInDays =
          differenceInMilliseconds / (1000 * 60 * 60 * 24);
        if (differenceInDays >= 30) {
          monthExpiry();
        }

        const dateOfJoining = new Date(res.data.result.doj);
        const formattedDateOfJoining = new Date(
          dateOfJoining
        ).toLocaleDateString();

        // -------------------------------------------
        const givenDateString = res.data.result.doj;
        const givenDate = new Date(givenDateString);
        givenDate.setDate(givenDate.getDate() + 5);
        const day = String(givenDate.getDate()).padStart(2, "0");
        const month = String(givenDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based
        const year = givenDate.getFullYear();
        const resultDateString = `${day}-${month}-${year}`;
        setExpireDate(resultDateString);
        // -------------------------------------------
        const trialFormateDate = new Date(
          res.data.result.trialDate
        ).toLocaleDateString();

        setTrialDate(trialFormateDate);
        setDayCount(5 - res.data.result.trialDayCount);
        setSubscriptionStatus({
          userid: res.data.result.userid,
          payment: res.data.result.paymentStatus,
          expiry: formattedNewDate,
          doj: formattedDateOfJoining,
          plan: res.data.result.paymentCount,
          formattedAmount: formattedAmount1,
          count: res.data.result.paymentCount,
        });
        blockUser(res.data.result.trialDate, res.data.result.paymentStatus);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // monthExpiry()
  const monthExpiry = () => {
    const userid = localStorage.getItem("userid");
    const token = localStorage.getItem("token");
    const data = {
      userid: userid,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(`${apiurl}` + "/user/change-payment-status", data, config)
      .then((res) => {
        message.danger(res.data.message);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  // fetchTotalWithdrawal
  const fetchTotalWithdrawal = () => {
    const userid = localStorage.getItem("userid");
    const token = localStorage.getItem("token");
    const data = {
      userid: userid,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(`${apiurl}` + "/user/users/user-total-withdrawal", data, config)
      .then((res) => {
        if (res.data.data === 0) {
          setTotalWithdrawal(0);
        } else {
          const totalWithdrawal = res.data.walletAmount;
          setTotalWithdrawal(totalWithdrawal);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const share1 = () => {
    navigate("/userdashboard/invite");
  };

  // viewTradingChart
  const viewTradingChart = () => {
    navigate("/userdashboard/trading-chart");
  };

  const callApiToUserTotalWithdrawalFromTradingWallet = () => {
    const token = localStorage.getItem("token");
    const data = {
      userid: localStorage.getItem("userid"),
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(
        `${apiurl}` + "/user/users/user-total-withdrawal-from-trading-wallet",
        data,
        config
      )
      .then((res) => {
        if (res.data.sumOfAmountWithdrawn === undefined) {
          const formattedIndianRupees = new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
          }).format(0);
          setTotalTradingWallet(formattedIndianRupees);
        } else {
          const formattedIndianRupees = new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
          }).format(res.data.sumOfAmountWithdrawn);
          setTotalTradingWallet(formattedIndianRupees);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  // call api to my team
  const callApiToMyTeam = () => {
    const token = localStorage.getItem("token");
    const data = {
      refferal_id: localStorage.getItem("refferal"),
    };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(`${apiurl}` + "/user/users/user-my-team", data, config)
      .then((res) => {
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  // select money
  const selectMoney = (value) => {
    setMoney(value);
  };
  const setMoneyFuction = (e) => {
    setMoney(e.target.value);
  };

  const handleOpenRazorpay = (data) => {
    const options = {
      key: "rzp_test_RvU9CuKT2BsDrz",
      amount: Number(data.money) * 100,
      currency: data.currency,
      name: "JETTRADE FX",
      description: "Adding money to wallet",
      order_id: data.id,

      handler: function (response) {
        axios
          .post(`${apiurl}` + "/user/users/verify-payment", {
            response: response,
          })
          .then((res) => {
            userPaymetSuccessStatus(money);
          })
          .catch((err) => {
            message.warning("Payment Failed");
          });
      },
    };
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const addMoneyToWallethandleOk = () => {
    if (money < 500) {
      alert("Minimum amount should be INR 500.00");
    } else {
      const data = {
        amount: money,
        order_id: "0d0254888555666",
        currency: "INR",
        payment_capture: 1,
      };
      axios
        .post(`${apiurl}` + "/user/users/user-create-payment", data)
        .then((res) => {
          handleOpenRazorpay(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const userPaymetSuccessStatus = (amount) => {
    const token = localStorage.getItem("token");
    const data = {
      userid: localStorage.getItem("userid"),
      amountAdded: Number(amount),
    };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(
        `${apiurl}` + "/user/users/adding-amount-to-trading-wallet",
        data,
        config
      )
      .then((res) => {
        message.success(res.data.message);
        setIsAddMoneyToWalletModalVisible(false);
        setMoney(500);
        fetchUserDataForSubscription();
        callApiToUserAllData();
      })
      .catch((error) => {
        message.error(error.response.data.message);
      });
  };

  const blockUser = (trialFormateDate) => {
    if (subscription == 0 && subscriptionStatus.payment === false) {
      const dateString = trialFormateDate;

      function subtractTwoDate(date2, systemDate) {
        const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
        const diffInMilliseconds = systemDate - date2;
        const diffInDays = Math.floor(
          diffInMilliseconds / oneDayInMilliseconds
        );
        return diffInDays;
      }

      const dbDate1 = new Date(dateString);
      const formattedDateString = dbDate1.toLocaleString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short",
      });
      const dbDate2 = new Date(formattedDateString);
      const systemDate = new Date();

      const dayDifferent = subtractTwoDate(dbDate2, systemDate);

      // ---------------------Testing purpose-----------------------------
      const today = new Date();
      const dayAfterTomorrow = new Date(dbDate1);
      dayAfterTomorrow.setDate(dbDate1.getDate() + 5);
      const year = dayAfterTomorrow.getFullYear();
      const month = dayAfterTomorrow.getMonth() + 1;
      const day = dayAfterTomorrow.getDate();
      const formattedDate1 = `${year}-${month.toString().padStart(2, "0")}-${day
        .toString()
        .padStart(2, "0")}`;
      const formattedDate2 = new Date(formattedDate1);

      const inputDate = new Date(formattedDate2);
      const options = { year: "numeric", month: "short", day: "numeric" };
      const expireOn = inputDate.toLocaleDateString(undefined, options);
      setExpireDate(expireOn);
      // ----------------------------------------------------------

      const timeDiff = systemDate.getTime() - dbDate1.getTime();
      const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      if (dayDifferent < 5) {
        const token = localStorage.getItem("token");
        const data = {
          userid: localStorage.getItem("userid"),
          dayCount: dayDifferent,
        };
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        axios
          .post(`${apiurl}` + "/user/users/update-day-count", data, config)
          .then((res) => {
            
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        const token = localStorage.getItem("token");
        const data = {
          userid: localStorage.getItem("userid"),
          expire: true,
        };
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        axios
          .post(`${apiurl}` + "/user/users/update-expire", data, config)
          .then((res) => {
            navigate("/logout");
          })
          .error((error) => {
            console.log(error);
          });
      }
    }
  };
  // =========payment============
  const handleOpenRazorpayForPaymebt = (data) => {
    const options = {
      key: "rzp_test_RvU9CuKT2BsDrz",
      amount: Number(data.amount) * 100,
      currency: data.currency,
      name: "JETTRADE FX",
      description: "Software and service charge",
      order_id: data.id,

      handler: function (response) {
        axios
          .post(
            `${apiurl}` + "/user/users/verify-payment",
            { response: response },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            userPaymetSuccessStatus1();
          })
          .catch((err) => {
            message.warning("Payment Failed");
          });
      },
    };
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const doPayment = (amount) => {
    const data = {
      amount: amount,
      order_id: "0d0254888555666",
      currency: "INR",
      payment_capture: 1,
    };
    axios
      .post(`${apiurl}` + "/user/users/user-create-payment", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        handleOpenRazorpayForPaymebt(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const userPaymetSuccessStatus1 = () => {
    const data = {
      userid: localStorage.getItem("userid"),
    };
    axios
      .post(`${apiurl}` + "/user/users/change-user-payment-status", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        message.success(res.data.message);
        fetchUserDataForSubscription();
      })
      .catch((error) => {
        message.error(error.response.data.message);
      });
  };
  const callApiToUserAllData = () => {
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
        setTradingWallet(formattedTradingWallet);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const callApiProgressiveBar = () => {
    let token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(
        `${apiurl}` + "/user/total_Count_Of_Payment_Status_Of_User_user",
        config
      )
      .then((res) => {
        setProgressiveBarData({
          totalCount: res.data.totalCount,
          runningCount: res.data.runningCount,
          trialStage: res.data.inactiveCount,
          expiredStage: res.data.expiredCount,
          runningPercentage: res.data.runningPercentage,
          trialPercentage: res.data.inactivePercentage,
          expiredPercentage: res.data.expiredPercentage,
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <>
      {subscriptionStatus.payment === false && subscription === 0 ? (
        <div className="custom-alert-container">
          <Alert
            message={`Your trading trial expires on ${userFreeExpire}`}
            description={
              dayCount === 0 ? <CountdownTimer /> : `${dayCount} Days to go.`
            }
            type="info"
            showIcon
            banner
            action={
              <button
                type="primary"
                className={`blink-button ${blinking ? "blink" : ""}`}
                style={{
                  backgroundColor: "#0d6efd",
                  border: "none",
                  borderRadius: "10px",
                  width: "100px",
                  height: "40px",
                  color: "white",
                  fontFamily: "Calibri",
                  fontWeight: "600",
                }}
                onClick={() => doPayment(3500)}
              >
                Pay Now
              </button>
            }
            style={{ fontWeight: "bold" }}
          />
        </div>
      ) : (
        ""
      )}

      <div className="card1-container">
        <div className="card1">
          <div className="d-flex">
            <h6>User ID </h6>&nbsp; : &nbsp;
            <span style={{ color: "yellow" }}>{userDetails.userid}</span>
          </div>
          <div
            className="d-flex"
            onClick={() => share(`/user-registration/${userDetails.refferal}`)}
          >
            <h6>Referral ID</h6> &nbsp; : &nbsp;{" "}
            <span style={{ cursor: "pointer", color: "yellow" }}>
              {userDetails.refferal}
            </span>
          </div>
        </div>

        <div className="card1">
          <div className="subscription-card">
            <h6>Subscription</h6>
          </div>
          <div className="d-flex">
            <h6>Status :</h6> &nbsp;&nbsp;{" "}
            <span
              style={{
                color: subscriptionStatus.payment ? "yellow" : "red",
                fontWeight: 500,
                fontFamily: "Calibri",
                fontSize: "16px",
              }}
            >
              {!subscriptionStatus.payment && subscriptionStatus.count === 0
                ? "Inactive"
                : ""}
              {subscriptionStatus.payment ? "Running" : ""}
              {!subscriptionStatus.payment && subscriptionStatus.count > 0
                ? "Expired"
                : ""}
            </span>
          </div>
          <div className="d-flex">
            <h6>Expiry :</h6>&nbsp; &nbsp;{" "}
            <span
              style={{
                color: "yellow",
                fontWeight: 500,
                fontFamily: "Calibri",
                fontSize: "16px",
              }}
            >
              {subscriptionStatus.payment
                ? `${subscriptionStatus.expiry}`
                : "Not found"}
            </span>
          </div>
        </div>

        <div className="card1">
          <div className="live-chat">
            <h6>CENTUMO Swap</h6>
          </div>
          <div className="live-chat-join">
            <a
              href="https://centumo.centumworld.com/#/exchange/quick"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "yellow", cursor: "pointer" }}
            >
              Click me
            </a>
          </div>
        </div>

        <div className="card1">
          <RunningProgressiveBar percent={progressiveBarData} />
        </div>
        <div className="card1">
          <TrialProgressiveBar percent={progressiveBarData} />
        </div>
        <div className="card1">
          <ExpiredProgressiveBar percent={progressiveBarData} />
        </div>
        <div className="card1">
          <div className="trading_chart">
            <h6>Trading Chart</h6>
          </div>
          <div className="trading_chart_view">
            <span
              style={{ color: "yellow", cursor: "pointer" }}
              onClick={viewTradingChart}
            >
              view
            </span>
          </div>
        </div>
        <div className="card1">
          <div className="live-chat">
            <h6>Chart and Data</h6>
          </div>
          <div className="live-chat-join">
            <Dropdown
              overlay={menu}
              trigger={["click"]}
              placement="bottomCenter"
            >
              <span style={{ color: "yellow", cursor: "pointer" }}>View</span>
            </Dropdown>
          </div>
        </div>

        <div className="card1">
          <div className="create-wallet">
            <h6>Wallet</h6>
          </div>
          <div className="d-flex">
            <h6>Add Money :</h6>&nbsp;&nbsp;{" "}
            <span
              style={{ color: "yellow", cursor: "pointer" }}
              onClick={isAddMoneyToWalletModal}
            >
              <BsWallet2 />
              &nbsp;&nbsp;Cash
            </span>
          </div>
          <div className="d-flex">
            <h6>Balance :</h6> &nbsp;&nbsp;{" "}
            <span style={{ color: "yellow" }}>{tradingWallet}</span>
          </div>
        </div>

        <div className="card1">
          <div className="Withdrawal">
            <h6>Withdrawal</h6>
          </div>
          <div className="withdrawal-view" onClick={walletWithdrawal}>
            <div className="d-flex" style={{ color: "white" }}>
              <h6>Amount : </h6> &nbsp;&nbsp;
              <span style={{ color: "yellow" }}>{totalTradingWallet}</span>
            </div>
            <div className="d-flex">
              <h6>Withdraw :</h6> &nbsp;&nbsp;{" "}
              <span
                style={{ color: "yellow", cursor: "pointer" }}
                onClick={showUserWithdrawalFromTradingWallet}
              >
                <FaHandHoldingUsd />
              </span>
            </div>
          </div>
        </div>
        <div className="card1">
          <div className="total-trade-small-card">
            <h6>Total Trade</h6>
          </div>
          <div className="d-flex">
            <span style={{ color: "yellow" }}>
              <FaRupeeSign /> 0.00
            </span>
          </div>
        </div>
        <div className="card1">
          <div className="todays-trade-small-card">
            <h6>Today's trade</h6>
          </div>
          <div className="d-flex">
            <span style={{ color: "yellow" }}>
              <FaRupeeSign />
              0.00
            </span>
          </div>
        </div>
      </div>

      {/* ----------------My team modal */}
      <Modal
        title={<span style={{ color: "purple" }}>My Team</span>}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div
          style={{
            textAlign: "center",
            maxHeight: "300px",
            overflowY: "scroll",
          }}
        >
          {refferalTeam.map((name, index) => (
            <p key={index}>
              {index + 1}.&nbsp;{name}
            </p>
          ))}
        </div>
      </Modal>

      {/* ----------------Add money to wallet */}
      <Modal
        title={<span style={{ color: "purple" }}>Add cash</span>}
        open={isAddMoneyToWalletModalVisible}
        onOk={addMoneyToWallethandleOk}
        onCancel={addMoneyToWallethandleCancel}
        okText="Pay Now"
      >
        <div className="d-flex">
          <div
            className="money-box"
            onClick={() => {
              selectMoney(500);
            }}
          >
            <FaRupeeSign />
            500
          </div>
          <div
            className="money-box"
            onClick={() => {
              selectMoney(1000);
            }}
          >
            <FaRupeeSign />
            1000
          </div>
          <div
            className="money-box"
            onClick={() => {
              selectMoney(5000);
            }}
          >
            <FaRupeeSign />
            5000
          </div>
        </div>
        <div>
          <Input
            style={{ marginTop: "10px", fontWeight: "bold" }}
            addonBefore={<FaRupeeSign />}
            placeholder="Enter amount in rupees..."
            value={money}
            onChange={setMoneyFuction}
          />
        </div>
      </Modal>
    </>
  );
};

export default DisplayCard;
