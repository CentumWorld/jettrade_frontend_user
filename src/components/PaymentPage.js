// // import React, { useState } from 'react'
// // import '../css/Payment.css'
// // import { useNavigate } from 'react-router-dom';
// // import CurrencyInput from 'react-currency-input-field';
// // import axios from 'axios';
// // import { Input, message } from 'antd';

// // function PaymentPage() {
// //     const [userid, setUserID] = useState('')
// //     const [payButton, setPayButton] = useState(false);
// //     const [userData,setUserData] = useState('');
// //     const navigate = useNavigate();
// //     function goHome() {
// //         navigate('/');
// //     }
// //     const handleOpenRazorpay = (data) => {
// //         const options = {
// //             key: 'rzp_test_RvU9CuKT2BsDrz',
// //             amount: Number(data.amount) * 100,
// //             currency: data.currency,
// //             name: 'JETTRADE FX',
// //             description: 'Software and service charge',
// //             order_id: data.id,

// //             handler: function (response) {
// //                 console.log(response, "26")
// //                 axios.post('/user/users/verify-payment', { response: response })
// //                     .then(res => {
// //                         // console.log(res, "37");
// //                         // message.success(res.data.message)
// //                         userPaymetSuccessStatus();
// //                     })
// //                     .catch(err => {
// //                         console.log(err);
// //                         message.warning("Payment Failed")
// //                     })
// //             }
// //         }
// //         const razorpay = new window.Razorpay(options)
// //         razorpay.open()
// //     }

// //     const handlePayment = (amount) => {
// //         console.log(amount);
// //         const data = {
// //             amount: amount,
// //             order_id: "0d0254888555666",
// //             currency: "INR",
// //             payment_capture: 1,
// //         }
// //         axios.post('/user/users/user-create-payment', data)
// //             .then(res => {
// //                 console.log(res.data, "29")
// //                 handleOpenRazorpay(res.data.data)
// //             })
// //             .catch(err => {
// //                 console.log(err)
// //             })
// //     }

// //     const handleChangeUserID = (e) => {
// //         e.preventDefault();
// //         setUserID(e.target.value);
// //     }
// //     console.log(userid)
// // const verifyUser = () => {
// //     const data = {
// //         userid: userid
// //     }
// //     axios.post('/user/users/payment-userid-verify', data)
// //         .then((res) => {

// //             console.log(res.data.statusCode)
// //             if(res.data.statusCode === 200){
// //                 message.warning("Login please and renew!")
// //             }
// //             if(res.data.statusCode === 201){
// //                 setUserData(res.data.user.paymentCount);
// //                 setPayButton(true)
// //                 message.success(res.data.message);
// //             }

// //         })
// //         .catch((error) => {
// //             message.error(error.response.data.message);
// //         })
// // }

// //     // user payment success status
// // const userPaymetSuccessStatus = () => {
// //     const data = {
// //         userid: userid
// //     }
// //     axios.post('/user/users/change-user-payment-status',data)
// //     .then((res) => {
// //         message.success(res.data.message)
// //         console.log(res, "yuhuyhu")
// //         navigate('/userdashboard');

// //     })
// //     .catch((error) => {
// //         message.error(error.response.data.message)
// //     })
// // }

// //     //------------------------

// //     //---------------------
// //     return (
// //         <>
// //             <div className='payment_container'>

// //                 <div className='payment-box'>
// //                     <h1>JETTRADE FX</h1>
// //                     <h4>Payment Details</h4>
// //                     <div className='input-box container'>
// //                         <div>
// //                             <Input
// //                                 className='payment-userid-input'
// //                                 placeholder="Enter user ID"
// //                                 value={userid}
// //                                 onChange={handleChangeUserID}
// //                             />
// //                         </div>
// //                         <div className='payment-button'>
// //                             <button className='btn btn-primary btn-sm btn-block' onClick={verifyUser}>Verify</button>
// //                         </div>
// //                         {/* <input type="text" value={3500}  disabled/> */}
// //                         <CurrencyInput value={3500} intlConfig={{ locale: 'en-IN', currency: 'INR' }} />
// //                     </div>

// //                     <div className='payment-button'>
// //                         <button className='btn btn-primary btn-sm btn-block' onClick={() => handlePayment(3500)} disabled={!payButton}>Pay Now</button>
// //                     </div>
// //                     <div className='payment-button'>
// //                         <button className='btn btn-secondary btn-sm btn-block' onClick={goHome}>Cancel</button>
// //                     </div>
// //                     <div className='note-para'>
// //                         <p> <strong><mark>NOTE:-</mark></strong>Service/Software use charges <strong>JETTRADE FX</strong></p>
// //                     </div>

// //                 </div>
// //             </div>
// //         </>
// //     )
// // }

// // export default PaymentPage

import React, { useState } from "react";
import "../css/Payment.css";
import { useNavigate } from "react-router-dom";
import CurrencyInput from "react-currency-input-field";
import axios from "axios";
import { Input, message } from "antd";
import baseUrl from '../baseUrl';

const apiurl = baseUrl.apiUrl

function PaymentPage() {
  const [userid, setUserID] = useState(localStorage.getItem("userid")||"");
  const [payButton, setPayButton] = useState(false);
  const [userData, setUserData] = useState("");
  const navigate = useNavigate();

  function goHome() {
    navigate("/");
  }

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
        axios.post(`${apiurl}`+
            "/user/users/verify-payment",
            { response: response },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
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

  const handlePayment = (amount) => {
    const data = {
      amount: amount,
      order_id: "0d0254888555666",
      currency: "INR",
      payment_capture: 1,
    };
    axios.post(`${apiurl}`+"/user/users/user-create-payment", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        handleOpenRazorpay(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeUserID = (e) => {
    e.preventDefault();
    setUserID(e.target.value);
  };

  const verifyUser = () => {
    const data = {
      userid: localStorage.getItem("userid"),
    };
    axios.post(`${apiurl}`+"/user/users/payment-userid-verify", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          message.warning("Login please and renew!");
        

        }
        if (res.data.statusCode === 201) {
          setUserData(res.data.user.paymentCount);
          setPayButton(true);
          message.success(res.data.message);
        } 
      })
      .catch((error) => {
        message.error(error.response.data.message);
      });
  };

  const userPaymetSuccessStatus = () => {
    const data = {
      userid: userid,
    };
    axios.post("/user/users/change-user-payment-status", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        localStorage.setItem("login", true);

        message.success(res.data.message);

        navigate("/userdashboard");
      })
      .catch((error) => {
        message.error(error.response.data.message);
      });
  };

  return (
    <>
      <div className="payment_container">
        <div className="payment-box">
          <h1>JETTRADE FX</h1>
          <h4>Payment Details</h4>
          <div className="input-box container">
            <div>
              <Input
                className="payment-userid-input"
                placeholder="Enter user ID"
                value={userid}
                onChange={handleChangeUserID}
              />
            </div>
            <div className="payment-button">
              <button
                className="btn btn-primary btn-sm btn-block"
                onClick={verifyUser}
              >
                Verify
              </button>
            </div>
            <CurrencyInput
              value={3500}
              intlConfig={{ locale: "en-IN", currency: "INR" }}
            />
          </div>
          <div className="payment-button">
            <button
              className="btn btn-primary btn-sm btn-block"
              onClick={() => handlePayment(3500)}
              disabled={!payButton}
            >
              Pay Now
            </button>
          </div>
          <div className="payment-button">
            <button
              className="btn btn-secondary btn-sm btn-block"
              onClick={goHome}
            >
              Cancel
            </button>
          </div>
          <div className="note-para">
            <p>
              <strong>
                <mark>NOTE:-</mark>
              </strong>
              Service/Software use charges <strong>JETTRADE FX</strong>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentPage;
