import React, { useState, useEffect, useContext } from "react";
import "../css/UserSidebar.css";
import { motion } from "framer-motion";
import {
  MdDashboard,
  MdSend,
  MdNightsStay,
  MdOutlineSubscriptions,
} from "react-icons/md";
import {
  FaMoneyBillWaveAlt,
  FaBars,
  FaUserPlus,
  FaShare,
} from "react-icons/fa";
import { BsBellFill, BsMinecart } from "react-icons/bs";
import { RxCountdownTimer } from "react-icons/rx";
import { TfiMenuAlt, TfiGift } from "react-icons/tfi";
import { CiLogout } from "react-icons/ci";
import { RxDashboard } from "react-icons/rx";
import {
  AiOutlineSetting,
  AiFillBank,
  AiOutlineAreaChart,
  AiOutlineSwap,
} from "react-icons/ai";
import { FcBarChart } from "react-icons/fc";
import { FiVideo } from "react-icons/fi";
import { FaHandHoldingUsd } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { NavLink } from "react-router-dom";
import UserSidebarMenu from "./usersidebar/UserSidebarMenu";
import { UserModal } from "../UserModel/UserModal";
import { Modal, Row, Col, Button, message, Switch, Badge } from "antd";
import { FcNeutralTrading } from "react-icons/fc";
import { FcUpRight } from "react-icons/fc";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import baseUrl from "../baseUrl";
import { BiLogOutCircle } from "react-icons/bi";
import { IoStatsChartOutline } from "react-icons/io5";

const apiurl = baseUrl.apiUrl;
const isSmallDevice = window.innerWidth < 768;
const routes = [
  {
    path: "/userdashboard/dashboard",
    name: "Dashboard",
    icon: <RxDashboard />,
  },
  {
    path: "https://centumo.centumworld.com/#/exchange/quick",
    name: "CENTUMO Swap",
    icon: <AiOutlineSwap />,
    externalLink: true,
    target: "_blank",
  },
  {
    path: "https://centumworldrig.com/",
    name: "CENTUMO RIG",
    icon: <BsMinecart />,
    externalLink: true,
    target: "_blank",
  },
  {
    path: "/userdashboard",
    name: "Chart and Data",
    icon: <IoStatsChartOutline />,
    subRoutes: [
      {
        path: "/userdashboard/trading-chart",
        name: "Trading Chart",
      },
      {
        path: "/userdashboard/traditional-currency-chart",
        name: "Traditional currency chart",
      },
      {
        path: "/userdashboard/cryptocurrency-market",
        name: "Cryptocurrency Market",
      },
      {
        path: "/userdashboard/economic-celender",
        name: "Economic Calender",
      },
      {
        path: "/userdashboard/heat-map",
        name: "Heat Map",
      },
      {
        path: "/userdashboard/cross-rates",
        name: "Cross Rates",
      },
      {
        path: "/userdashboard/market-data",
        name: "Market Data",
      },
      {
        path: "/userdashboard/screener",
        name: "Screener",
      },
    ],
  },
  {
    path: "/userdashboard/withdraw",
    name: "Withdrawal",
    icon: <FaMoneyBillWaveAlt />,
  },
  {
    path: "/userdashboard/transfer",
    name: "Internal transfer",
    icon: <MdSend />,
  },
  {
    path: "/userdashboard/help-friend",
    name: "Help Friends",
    icon: <FaHandHoldingUsd />,
  },
  {
    path: "/userdashboard",
    name: "Operation history",
    icon: <RxCountdownTimer />,
    subRoutes: [
      {
        path: "/userdashboard/deposite",
        name: "Deposit history",
      },
      {
        path: "/userdashboard/withdrawlhistory",
        name: "Withdrawal history",
      },
      {
        path: "/userdashboard/transferhistory",
        name: "Transfer history",
      },
    ],
  },
  {
    path: "/userdashboard",
    name: "Trading accounts",
    icon: <TfiMenuAlt />,
    subRoutes: [
      {
        path: "/userdashboard/accountlist",
        name: "Account list",
      },
      {
        path: "/userdashboard/managebonuses",
        name: "Manage Bonuses",
      },
      {
        path: "/userdashboard/monitoring",
        name: "Monitoring",
      },
      {
        path: "/userdashboard/real-account",
        name: "Open real account",
      },
      {
        path: "/userdashboard/demo-account",
        name: "Open demo account",
      },
    ],
  },
  // {
  //   path: "/userdashboard/invite",
  //   name: "Invite a friend",
  //   icon: <FaUserPlus />,
  // },
  {
    path: "/userdashboard/wallet-withdrawal",
    name: "Transaction",
    icon: <GrTransaction />,
  },
  // {
  //   path: "/userdashboard/my-team",
  //   name: "Referral Payout",
  //   icon: <FaShare />,
  // },

  {
    path: "/userdashboard/video",
    name: "Video",
    icon: <FiVideo />,
  },

  // {
  //   path: "/logout",
  //   name: "Logout",
  //   icon: <BiLogOutCircle />,
  // },
];

function UserSidebar(props) {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [isComponentOpen, setIsComponentOpen] = useState(false);
  const [subcriptionDiv, setSubscriptionDiv] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [openNotificationModal, setOpenNotificationModal] = useState(false);
  const [allNotification, setAllNotification] = useState([]);
  const [allTraderNotification, setAllTraderNotification] = useState([]);
  const [particularTraderNotification, setParticularTraderNotification] =
    useState([]);
  const [isSubscriptionModal, setIsSubscriptionModal] = useState(false);
  const [paymentCountSubscription, setPaymentCountSubscripton] = useState({
    userid: "",
    payment: false,
    expiry: "",
    doj: "",
    plan: Number,
  });
  const [notification, setNotification] = useState(0);

  const openModal = () => {
    setShowModal(true);
  };
  console.log(showModal);

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    setUserName(localStorage.getItem("userfname"));
    callApiToFetchUserData();
    callApiToFetchNotificationStatus();
  }, []);

  // // renewelOnClick
  // const renewelOnClick = () => {
  //     console.log('ji')
  //     props.onPaymentButtonClick();
  // }

  const clickOnBell = () => {
    setOpenNotificationModal(true);
    callApiToFetchAllNotification();
    setNotificationFalse();
  };

  //handle all notification
  const handleOk = () => {
    setOpenNotificationModal(false);
  };

  // callApiToFetchAllNotification
  const callApiToFetchAllNotification = () => {
    const token = localStorage.getItem("token");
    console.log(token, ";;;;;;;");

    const userid = localStorage.getItem("userid");
    const data = { userid };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(`${apiurl}` + "/user/users/fetch-user-notification", data, config)
      .then((result) => {
        console.log(result.data.allNotitfication);
        setAllNotification(result.data.allNotitfication);
        setAllTraderNotification(result.data.allTraderNotification);
        setParticularTraderNotification(result.data.particularTrader);
        console.log(result.data.allTraderNotification);
        console.log(result.data.particularTrader);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //call api to fetch user data
  const callApiToFetchUserData = () => {
    const userid = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    console.log(token, "297");
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
        console.log(res, "res");
        setSubscriptionDiv(res.data.result.paymentCount);

        console.log(res.data.result.doj);

        const originalDate = new Date(res.data.result.doj);
        // Add 30 days
        const newDate = new Date(originalDate);
        newDate.setDate(originalDate.getDate() + 30);
        const formattedNewDate = newDate.toLocaleDateString("en-GB");

        const dateOfJoining = new Date(res.data.result.doj);
        const formattedDateOfJoining = new Date(
          dateOfJoining
        ).toLocaleDateString();

        setPaymentCountSubscripton({
          userid: res.data.result.userid,
          payment: res.data.result.paymentStatus,
          expiry: formattedNewDate,
          doj: formattedDateOfJoining,
          plan: res.data.result.paymentCount,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // callApiToFetchNotificationStatus
  const callApiToFetchNotificationStatus = () => {
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
      .post(
        `${apiurl}` + "/user/users/fetch-user-notification-status",
        data,
        config
      )
      .then((res) => {
        setNotification(res.data.isNotification);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // setNotificationFalse
  const setNotificationFalse = () => {
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
      .post(
        `${apiurl}` + "/user/users/set-notification-to-false-user",
        data,
        config
      )
      .then((res) => {
        callApiToFetchNotificationStatus();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //subscription
  const showSubscriptionModal = () => {
    setIsSubscriptionModal(true);
  };
  const handleOkSubscriptionModal = () => {
    setIsSubscriptionModal(false);
  };
  // theme

  const [toggleValue, setToggleValue] = useState(false);

  const handleToggleChange = (checked) => {
    setToggleValue(checked);
  };
  // -------------------------------------------

  const renewelPayment = () => {
    const data = {
      amount: 1500,
      order_id: "0d0254888555666",
      currency: "INR",
      payment_capture: 1,
    };
    axios
      .post(`${apiurl}` + "/user/users/user-create-payment", data)
      .then((res) => {
        console.log(res.data, "29");
        handleOpenRazorpay(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOpenRazorpay = (data) => {
    const options = {
      key: "rzp_test_RvU9CuKT2BsDrz",
      amount: Number(data.amount) * 100,
      currency: data.currency,
      name: "JETTRADE FX",
      description: "Software and service charge",
      order_id: data.id,

      handler: function (response) {
        console.log(response, "26");
        axios
          .post(`${apiurl}` + "/user/users/verify-payment", {
            response: response,
          })
          .then((res) => {
            // console.log(res, "37");
            // message.success(res.data.message)
            userPaymetSuccessStatus();
          })
          .catch((err) => {
            console.log(err);
            message.warning("Payment Failed");
          });
      },
    };
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  // user payment success status
  const userPaymetSuccessStatus = () => {
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
        `${apiurl}` + "/user/users/change-payment-status-for-renewal",
        data,
        config
      )
      .then((res) => {
        message.success(res.data.message);
        navigate("/userdashboard/dashboard");
      })
      .catch((error) => {
        message.error(error.response.data.message);
      });
  };
  // ---------------------------------------
  const options = {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  let width;

  if (isOpen && windowWidth < 768) {
    width = "100vw";
  } else if ((!isOpen && windowWidth > 768) || (!isOpen && windowWidth < 768)) {
    width = "50px";
  } else {
    width = "350px";
  }

  const logout = () => {
    localStorage.clear();
    navigate("/user-login");
  };

  return (
    <>
      <div className="user-subscription-modal">
        <Modal
          title="Subscription plan"
          className="subscription-plan-title"
          open={isSubscriptionModal}
          onOk={handleOkSubscriptionModal}
          onCancel={handleOkSubscriptionModal}
          footer={null}
        >
          {subcriptionDiv > 0 ? (
            <>
              <Row style={{ marginBottom: "5px" }}>
                <Col
                  span={12}
                  style={{
                    fontWeight: 600,
                    fontFamily: "Calibri",
                    fontSize: "16px",
                  }}
                >
                  User ID :
                </Col>
                <Col
                  span={12}
                  style={{
                    color: "#5e72e4",
                    fontWeight: 500,
                    fontFamily: "Calibri",
                    fontSize: "16px",
                  }}
                >
                  {paymentCountSubscription.userid}
                </Col>
              </Row>
              <Row style={{ marginBottom: "5px" }}>
                <Col
                  span={12}
                  style={{
                    fontWeight: 600,
                    fontFamily: "Calibri",
                    fontSize: "16px",
                  }}
                >
                  Subscription Plan :
                </Col>
                <Col
                  span={12}
                  style={{
                    color: "#5e72e4",
                    fontWeight: 500,
                    fontFamily: "Calibri",
                    fontSize: "16px",
                  }}
                >
                  {paymentCountSubscription.plan === 1 ? "INR 3500.00" : ""}
                  {paymentCountSubscription.plan > 1 ? "INR 1500.00" : ""}
                </Col>
              </Row>
              <Row style={{ marginBottom: "5px" }}>
                <Col
                  span={12}
                  style={{
                    fontWeight: 600,
                    fontFamily: "Calibri",
                    fontSize: "16px",
                  }}
                >
                  Subscription :
                </Col>
                <Col
                  span={12}
                  style={{
                    color: paymentCountSubscription.payment ? "green" : "red",
                    fontWeight: 500,
                    fontFamily: "Calibri",
                    fontSize: "16px",
                  }}
                >
                  {paymentCountSubscription.payment ? "Running" : "Expired"}
                </Col>
              </Row>
              <Row style={{ marginBottom: "5px" }}>
                <Col
                  span={12}
                  style={{
                    fontWeight: 600,
                    fontFamily: "Calibri",
                    fontSize: "16px",
                  }}
                >
                  Date of Joining :
                </Col>
                <Col
                  span={12}
                  style={{
                    color: "#5e72e4",
                    fontWeight: 500,
                    fontFamily: "Calibri",
                    fontSize: "16px",
                  }}
                >
                  {paymentCountSubscription.doj}
                </Col>
              </Row>
              <Row style={{ marginBottom: "5px" }}>
                <Col
                  span={12}
                  style={{
                    fontWeight: 600,
                    fontFamily: "Calibri",
                    fontSize: "16px",
                  }}
                >
                  Expiry Date :
                </Col>
                <Col
                  span={12}
                  style={{
                    color: "#5e72e4",
                    fontWeight: 500,
                    fontFamily: "Calibri",
                    fontSize: "16px",
                  }}
                >
                  {paymentCountSubscription.expiry}
                </Col>
              </Row>

              <div>
                <Button
                  type="primary"
                  onClick={renewelPayment}
                  disabled={paymentCountSubscription.payment}
                >
                  Renewal
                </Button>
              </div>
            </>
          ) : (
            <div style={{ color: "red", textAlign: "center" }}>NO PLAN </div>
          )}
        </Modal>
      </div>
      <div className="user-notification">
        <Modal
          title="Notification"
          className="user-notification-title"
          open={openNotificationModal}
          onOk={handleOk}
          onCancel={handleOk}
          footer={null}
          style={{ cursor: "pointer" }}
        >
          <p className="user-general-notification">General Notification</p>
          <div className="user-general-notification-section">
            {allNotification.map((object) => (
              <li key={object.id}>
                {" "}
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <BsBellFill />
                    &nbsp;{object.message}
                  </div>
                  <div>
                    {new Date(object.date).toLocaleString("en-IN", options)}
                  </div>{" "}
                </div>
              </li>
            ))}
          </div>
          <br />
          <p className="for-traders-notification">For Traders</p>
          <div className="for-traders-notification-section">
            {allTraderNotification.map((object) => (
              <li key={object.id}>
                {" "}
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <BsBellFill />
                    &nbsp;{object.message}
                  </div>
                  <div>
                    {new Date(object.date).toLocaleString("en-IN", options)}
                  </div>{" "}
                </div>
              </li>
            ))}
          </div>
          <br />
          <p className="for-trader-only-notification">For You Only</p>
          <div className="for-trader-only-notification-section">
            {particularTraderNotification.map((object) => (
              <li key={object.id}>
                {" "}
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <BsBellFill />
                    &nbsp;{object.message}
                  </div>
                  <div>
                    {new Date(object.date).toLocaleString("en-IN", options)}
                  </div>{" "}
                </div>
              </li>
            ))}
          </div>
        </Modal>
      </div>

      <div className="main-container">
        <motion.div animate={{ width: width }} className="userSidebar">
          <div className="dashboard-title">
            <div className="top_section">
              {isOpen && (
                <h1 className="logo">
                  {userName}
                </h1>
              )}

              {isOpen && (
                <div className="setting">
                  <AiOutlineSetting onClick={openModal} />
                  {showModal ? <UserModal setShowModal={setShowModal} /> : null}
                </div>
              )}
              {/* <div className='notification'>
                            {isOpen && <BsBellFill onClick={clickOnBell} style={{ cursor: 'pointer' }} />}
                        </div> */}
              <div className="notification">
                <Badge count={notification}>
                  {isOpen && (
                    <BsBellFill
                      onClick={clickOnBell}
                      style={{ cursor: "pointer" }}
                    />
                  )}
                </Badge>
              </div>
              <div className="bars">
                <FaBars onClick={toggle} />
              </div>
            </div>
            {isOpen ? (
              <div className="deposit-btn">
                <NavLink
                  to="/userdashboard/new-deposit"
                  className="deposit_button btn btn-primary"
                >
                  START WITH A DEPOSIT
                </NavLink>
              </div>
            ) : (
              <NavLink to="/userdashboard/new-deposit" className="deposit_logo">
                <AiFillBank />
              </NavLink>
            )}
          </div>

          <section className="routes">
            {routes.map((route) => {
              if (route.subRoutes) {
                return (
                  <UserSidebarMenu
                    isOpen={isOpen}
                    route={route}
                    toggleSidebar={toggle}
                  />
                );
              }
              if (route.externalLink) {
                // For the "CENTUMO Swap" link, open in a new tab
                return (
                  <a
                    onClick={toggle}
                    href={route.path}
                    key={route.name}
                    className={
                      isOpen ? "user_sidebar_link" : "user_sidebar_link_small"
                    }
                    target="_blank" // This will open "CENTUMO Swap" in a new tab
                    rel="noopener noreferrer" // Recommended for security
                  >
                    <div className="admin-icon">{route.icon}</div>
                    <motion.div className="admin_link_text">
                      {isOpen && (
                        <motion.div className="link_text">
                          {isSmallDevice ? null : route.name}
                        </motion.div>
                      )}
                    </motion.div>
                  </a>
                );
              }
              return (
                <>
                  <NavLink
                    onClick={toggle}
                    to={route.path}
                    key={route.name}
                    className={
                      isOpen ? "user_sidebar_link" : "user_sidebar_link_small"
                    }
                  >
                    <div className="icon">{route.icon}</div>
                    {isOpen && (
                      <motion.div className="link_text">
                        {route.name}
                      </motion.div>
                    )}
                  </NavLink>
                </>
              );
            })}
          </section>

          <div
            className="d-flex"
            onClick={showSubscriptionModal}
            style={{ cursor: "pointer" }}
          >
            <MdOutlineSubscriptions
              style={{
                fontSize: "25px",
                marginLeft: "15px",
                marginTop: "10px",
              }}
            />
            {isOpen ? (
              <div
                style={{
                  marginLeft: "5px",
                  fontWeight: "600",
                  marginRight: "10px",
                  marginTop: "10px",
                  color: "#000",
                }}
              >
                Subscription
              </div>
            ) : (
              ""
            )}
          </div>

          <div
            className="d-flex"
            onClick={logout}
            style={{ cursor: "pointer" }}
          >
            <CiLogout
              style={{
                fontSize: "25px",
                marginLeft: "15px",
                marginTop: "10px",
              }}
            />
            {isOpen ? (
              <div
                style={{
                  marginLeft: "5px",
                  fontWeight: "600",
                  marginRight: "10px",
                  marginTop: "10px",
                  color: "#000",
                }}
              >
                Logout
              </div>
            ) : (
              ""
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default UserSidebar;
