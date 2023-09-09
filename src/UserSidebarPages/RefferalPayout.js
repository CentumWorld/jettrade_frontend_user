import React, { useEffect, useState, useCallback } from 'react'
import '../css/RefferPayout.css'
import axios from 'axios';
import { Button, Input, message, Tabs, Table, Modal, Select, Form, Radio } from 'antd'
import { FaRupeeSign } from 'react-icons/fa';
import moment from 'moment';
import baseUrl from '../baseUrl';

const apiurl = baseUrl.apiUrl

const { TabPane } = Tabs;
const { Option } = Select;


const RefferalPayout = () => {

    const [payoutAmout, setPayOutAmount] = useState(0);
    const [amount, setAmount] = useState('');
    const [requestDetails, setRequestDetails] = useState([])
    const [lastAmount, setLastAmount] = useState('');
    const [lastDate, setLastDate] = useState('');
    const [approvedDetails, setApprovedDetails] = useState([]);
    const [totalWallet, setTradingWallet] = useState(0)
    const [isRefferalPayoutWithdrawModalVisible, setIsRefferalPayoutWithdrawModalVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState('BankTransfer');
    const [bankModal, setBankModal] = useState(false);
    const [userBankDetails, setUserBankDetails] = useState([]);
    const [userUpiDetails, setUserUpiDetails] = useState([]);
    const [paymentModalForBankAndUPI, setPaymentModalForBankAndUPI] = useState(false);
    const [selectStateUpiId, setSelectedUpiId] = useState("");


    const handleAmountChange = (e) => {
        const value = e.target.value;
        const formattedAmount = value.toLocaleString('en-IN', {
            style: 'currency',
            currency: 'INR'
        });
        setAmount(formattedAmount);
    };

    const requestRefferalPayout = (e) => {
        e.preventDefault();
        console.log(amount)
        const token = localStorage.getItem('token')
        const data = {
            userid: localStorage.getItem('userid'),
            requestAmount: amount,
            paymentBy : selectStateUpiId
        }
        const config = {
            headers: { 'Authorization': `Bearer ${token}` }
        }

        axios.post(`${apiurl}` + "/user/users/withdrawl-From-Wallet-And-TradingWallet", data, config)
            .then((res) => {
                message.success('Withdrawal successfull');
                fetchRefferalPayout();
                setAmount('');
                callApiToUserAllData();
            })
            .catch(err => {
                message.warning(err.response.data.message)
            })
    };
    useEffect(() => {
        //fetchRefferalPayout();
        // fetchRefferalRequest();
        // fetchApprovedRequest();
        callApiToUserAllData();
        // callApitToPaymentHistory();
    }, []);

    const fetchRefferalPayout = () => {
        let token = localStorage.getItem('token');
        let userid = localStorage.getItem('userid');
        let config = {
            headers: { 'Authorization': `Bearer ${token}` }
        }
        const data = {
            userid: userid
        }
        axios.post(`${apiurl}` + '/user/users/user-fetch-refferal-payout', data, config)
            .then((res) => {
                const formattedAmount = res.data.wallet.toLocaleString('en-IN', {
                    style: 'currency',
                    currency: 'INR'
                });
                setPayOutAmount(formattedAmount)
                fetchRefferalRequest();
            })
            .catch(err => {
                console.log(err);
            })
    }
    // fetch refferal request data
    const fetchRefferalRequest = () => {
        let token = localStorage.getItem("token");
        let data = {
            userid: localStorage.getItem('userid')
        }
        console.log(data, token);
        const config = {
            headers: { 'Authorization': `Bearer ${token}` }
        }
        axios.post(`${apiurl}` + '/user/users/fetch-Wallet-Withdrawal-History', data, config)
            .then((res) => {
                const length = res.data.walletHistory.length;
                const lastData = res.data.walletHistory[length - 1];
                const lastDate = res.data.walletHistory[length - 1].date;
                console.log(lastDate);
                const formattedDate = new Date(lastDate).toLocaleDateString();
                const parts = formattedDate.split('/');
                const month = parts[0];
                const day = parts[1];
                const year = parts[2];
                const finalDate = `${day}/${month}/${year}`;
                setLastDate(finalDate);
                setLastAmount(lastData.amountWithdrawn);
                setRequestDetails(res.data.walletHistory);

            })
            .catch(err => {
                console.log(err.response.data.message)
            })
    }

    // fetch approved request--
    const fetchApprovedRequest = () => {
        let token = localStorage.getItem('token');
        let data = {
            userid: localStorage.getItem('userid'),
        }
        let config = {
            headers: { 'Authorization': `Bearer ${token}` }
        }

        axios.post(`${apiurl}` + '/user/users/fetch-approve-refferal-payout-user', data, config)
            .then((res) => {
                console.log(res.data);
                setApprovedDetails(res.data.userWithdrawalApprove)
            })
            .catch(err => {
                console.log(err)
            })
    }
    //data ---------
    const requestColumns = [
        {
            title: 'User ID',
            dataIndex: 'userid',
            key: 'id',
        },
        {
            title: 'Amount',
            dataIndex: 'amountWithdrawn',
            key: 'amountWithdrawn',
            render: (text) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(text),
        },
        {
            title: 'Bank/UPI',
            dataIndex: 'paymentBy',
            key: 'paymentBy',
        },
        {
            title: 'Withdraw Date',
            dataIndex: 'requestDate',
            key: 'requestDate',
            render: (text) => moment(text).format('DD/MM/YY HH:mm:ss'),
        },
    ];

    const approvedColumns = [
        {
            title: 'User ID',
            dataIndex: 'userid',
            key: 'userid',
        },
        {
            title: 'Wallet Amount',
            dataIndex: 'amountAdded',
            key: 'amountAdded',
            render: (text) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(text),
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (text) => moment(text).format('DD/MM/YY HH:mm:ss'),
        },
    ];
    // ----------withdraw refferal payout modal -------------

    const showRefferalPayoutModal = () => {
        setIsRefferalPayoutWithdrawModalVisible(true);
    };

    const handleRefferalPayoutWithdrawalOk = () => {
        setIsRefferalPayoutWithdrawModalVisible(false);
    };

    const handleRefferalPayoutWithdrawalCancel = () => {
        setIsRefferalPayoutWithdrawModalVisible(false);
    };


    const handleDropdownChange = (value) => {
        setSelectedOption(value);
        // Reset referral ID when changing options
    };


    console.log(lastDate);


    const callApiToUserAllData = () => {
        let data = {
            _id: localStorage.getItem('user')
        }
        let token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        axios.post(`${apiurl}` + "/user/fetch-user-details-userside", data, config)
            .then((res) => {
                const totalWallet = res.data.result.wallet + res.data.result.tradingWallet;
                const formattedTradingWallet =
                    totalWallet.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                    });
                setTradingWallet(formattedTradingWallet)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const callApitToPaymentHistory = () => {
        let data = {
            userid: localStorage.getItem('userid')
        }
        let token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        axios.post(`${apiurl}` + "/user/users/fetch-Wallet-History", data, config)
            .then((res) => {
                console.log(res.data)
                setApprovedDetails(res.data.walletHistory)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const addBank = () => {
        setBankModal(true);
    }
    const submitBankDetails = (values) => {
        console.log(values)
        let data = {
            accountHolderName: values.holder,
            accountNumber: values.account,
            bankName: values.bank,
            branchName: values.branch,
            ifscCode: values.ifsc,
            userId: localStorage.getItem("userid")
        }
        let token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        axios.post(`${apiurl}` + '/user/create-user-bank-account-holder', data, config)
            .then((res) => {
                message.success(res.data.message)
                setBankModal(false)
            })
            .catch((err) => {
                console.log(err.response.data.message)
            })
    }

    const submitUpiId = (values) => {
        console.log(values)
        let token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        let data = {
            userId: localStorage.getItem("userid"),
            upiId: values.upiId
        }
        axios.post(`${apiurl}` + '/user/create-user-upi-holder', data, config)
            .then((res) => {
                message.success(res.data.message)
                setBankModal(false);
            })
            .catch((err) => {
                console.log(err.response.data.message)
            })

    }
    const handleTabChange = useCallback((activeKey) => {
        // Call your function or perform any other actions here
        console.log(`Tab changed to: ${activeKey}`);
        if (activeKey === '1') {
            fetchRefferalRequest();
        } else if (activeKey === '2') {
            callApitToPaymentHistory();
        } else if (activeKey === '3') {
            callApiToBankDetails();
        }
    }, []);

    const callApiToBankDetails = () => {
        let token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        let data = {
            userId: localStorage.getItem("userid")
        }
        axios.post(`${apiurl}` + "/user/get-own-user-bank-and-upi-details", data, config)
            .then((res) => {
                console.log(res.data)
                setUserBankDetails(res.data.userBankDetails);
                setUserUpiDetails(res.data.userUpiId);
            })
            .catch((err) => {
                console.log(err.response.data.message)
            })
    }

    const bankDetails = [
        {
            title: "Holder name",
            dataIndex: "accountHolderName",
            key: "accountHolderName"
        },
        {
            title: "Bank name",
            dataIndex: "bankName",
            key: "bankName"
        },
        {
            title: "Branch name",
            dataIndex: "branchName",
            key: "branchName"
        },
        {
            title: "Account no",
            dataIndex: "accountNumber",
            key: "accountNumber"
        },
        {
            title: "IFSC Code",
            dataIndex: "ifscCode",
            key: "ifscCode"
        }
    ]
    const upiDetails = [
        {
            title: "User ID",
            dataIndex: "userId",
            key: "userId"
        },
        {
            title: "UPI ID",
            dataIndex: "upiId",
            key: "upiId"
        },

    ]

    const openBankModal = () => {
        setPaymentModalForBankAndUPI(true)
        callApiToBankDetails();
    }

    const handleRadioChangeStateValue = (e) => {
        setSelectedUpiId(e.target.value);
      }


    return (

        <>
            <div className="reffer-container">
                <div className='withdralwal-header d-flex justify-content-between'>
                    <p>Withdrawal</p>
                    <Button type='primary' onClick={addBank}>+ Add bank</Button>
                </div>

                <div class="card-container">
                    <div class="card">
                        <p>Total Amount</p>
                        <h6>Total Amount: {totalWallet}</h6>
                    </div>
                    <div class="card">
                        <div className='d-flex justify-content-between'>
                            <p>Wallet Withdrawal</p>
                            <Button type='primary' onClick={openBankModal}>Select bank</Button>
                        </div>
                        <label htmlFor="">Enter Amount</label>
                        <Input
                            type="number"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={handleAmountChange}
                            prefix={<FaRupeeSign />}
                        />
                        <Button onClick={requestRefferalPayout} disabled={!selectStateUpiId}>Withdraw</Button>
                    </div>
                    <div class="card">
                        <p>Last Withdrawal</p>
                        <h6>Amount:<FaRupeeSign /> {lastAmount}</h6>
                        <strong> Last Date: {lastDate}</strong>
                    </div>

                    <br />
                    <Tabs defaultActiveKey="1" onChange={handleTabChange}>
                        <TabPane tab="Withdrawal" key="1">
                            <div style={{ overflow: 'auto', maxHeight: '250px' }}>
                                <Table columns={requestColumns} dataSource={requestDetails} />
                            </div>

                        </TabPane>
                        <TabPane tab="Deposite" key="2">
                            <div style={{ overflow: 'auto', maxHeight: '250px' }}>
                                <Table columns={approvedColumns} dataSource={approvedDetails} />
                            </div>
                        </TabPane>
                        <TabPane tab="Bank Details" key="3">
                            <div style={{ overflow: 'auto', maxHeight: '250px', display: "flex", justifyContent: "space-between" }}>
                                <Table columns={bankDetails} dataSource={userBankDetails} />&nbsp;
                                <div className='upi-div'>
                                    <Table columns={upiDetails} dataSource={userUpiDetails} />
                                </div>
                            </div>
                        </TabPane>
                    </Tabs>
                </div >
            </div >

            {/* bank modal */}
            <Modal
                title="Bank details & UPI Id"
                open={bankModal}
                onCancel={() => setBankModal(false)}
                footer={null}
            >
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Bank" key="1">
                        <Form name="basic" onFinish={submitBankDetails}>
                            <Form.Item
                                label="Holder name"
                                name="holder"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input holder name!',
                                    },
                                ]}
                            >
                                <Input placeholder='Bank holder name' />
                            </Form.Item>

                            <Form.Item
                                label="Bank name"
                                name="bank"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input bank name!',
                                    },
                                ]}
                            >
                                <Input placeholder='Bank name' />
                            </Form.Item>

                            <Form.Item
                                label="Brnch name"
                                name="branch"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input branch name!',
                                    },
                                ]}
                            >
                                <Input placeholder='Branch name' />
                            </Form.Item>

                            <Form.Item
                                label="Account no"
                                name="account"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input account no!',
                                    },
                                ]}
                            >
                                <Input type='number' placeholder='Account no' />
                            </Form.Item>

                            <Form.Item
                                label="IFSC no"
                                name="ifsc"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input ifsc no!',
                                    },
                                ]}
                            >
                                <Input placeholder='IFSC no' />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{ float: "right" }}>
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>

                    </TabPane>
                    <TabPane tab="UPI ID" key="2">
                        <Form name="basic" onFinish={submitUpiId}>
                            <Form.Item
                                label="UPI ID"
                                name="upiId"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your UPI ID!',
                                    },
                                ]}
                            >
                                <Input placeholder='Enter UPI ID' />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{ float: "right" }}>
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </TabPane>
                </Tabs>
            </Modal>

            <Modal
                title="Select Bank or UPI ID"
                open={paymentModalForBankAndUPI}
                onCancel={() => setPaymentModalForBankAndUPI(false)}
            >

                <Tabs defaultActiveKey='1'>
                    <TabPane tab='Bank' key="1">
                        <Radio.Group onChange={handleRadioChangeStateValue} value={selectStateUpiId}>
                            {userBankDetails.map((option) => (
                                <Radio key={option.bankName} value={option.bankName}>
                                    {option.bankName}
                                </Radio>
                            ))}
                        </Radio.Group>
                    </TabPane>
                    <TabPane tab='UPI' key="2">
                    <Radio.Group onChange={handleRadioChangeStateValue} value={selectStateUpiId}>
                            {userUpiDetails.map((option) => (
                                <Radio key={option.upiId} value={option.upiId}>
                                    {option.upiId}
                                </Radio>
                            ))}
                        </Radio.Group>
                    </TabPane>
                </Tabs>
            </Modal>
        </>
    );
};

export default RefferalPayout