import React, { useEffect, useState } from 'react'
import '../css/RefferPayout.css'
import axios from 'axios';
import { Button, Input, message, Tabs, Table, Modal, Select } from 'antd'
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
    const [isRefferalPayoutWithdrawModalVisible, setIsRefferalPayoutWithdrawModalVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState('BankTransfer');


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
            requestAmount: amount
        }
        const config = {
            headers: { 'Authorization': `Bearer ${token}` }
        }

        axios.post(`${apiurl}`+'/user/users/refferal-payout-request-user', data, config)
            .then((res) => {
                message.success('Requested sent');
                // fetchRefferalPayout();
                setAmount('');
                fetchRefferalRequest();
            })
            .catch(err => {
                message.warning(err.response.data.message)
            })
    };
    useEffect(() => {
        fetchRefferalPayout();
        fetchRefferalRequest();
        fetchApprovedRequest();
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
        axios.post(`${apiurl}`+'/user/users/user-fetch-refferal-payout', data, config)
            .then((res) => {
                const formattedAmount = res.data.wallet.toLocaleString('en-IN', {
                    style: 'currency',
                    currency: 'INR'
                });
                setPayOutAmount(formattedAmount)
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
        let config = {
            headers: { 'Authorization': `Bearer ${token}` }
        }
        axios.post(`${apiurl}`+'/user/users/user-fetch-refferal-payout-withdrawal-request', data, config)
            .then((res) => {
                const length = res.data.userWithdrawalRequest.length;
                const lastData = res.data.userWithdrawalRequest[length - 1];
                const lastDate = res.data.userWithdrawalRequest[length - 1].requestDate;
                console.log(lastDate);
                const formattedDate = new Date(lastDate).toLocaleDateString();
                const parts = formattedDate.split('/');
                const month = parts[0];
                const day = parts[1];
                const year = parts[2];
                const finalDate = `${day}/${month}/${year}`;
                setLastDate(finalDate);
                setLastAmount(lastData.walletAmount);
                setRequestDetails(res.data.userWithdrawalRequest);

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

        axios.post(`${apiurl}`+'/user/users/fetch-approve-refferal-payout-user', data, config)
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
            dataIndex: 'walletAmount',
            key: 'walletAmount',
            render: (text) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(text),
        },
        {
            title: 'Withdraw Date',
            dataIndex: 'requestDate',
            key: 'requestDate',
            render: (text) => moment(text).format('DD/MM/YY HH:mm:ss'),
        },
    ];

    // const approvedColumns = [
    //     {
    //         title: 'User ID',
    //         dataIndex: 'userid',
    //         key: 'userid',
    //     },
    //     {
    //         title: 'Wallet Amount',
    //         dataIndex: 'walletAmount',
    //         key: 'walletAmount',
    //         render: (text) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(text),
    //     },
    //     {
    //         title: 'Requested Date',
    //         dataIndex: 'requestDate',
    //         key: 'requestDate',
    //         render: (text) => moment(text).format('DD/MM/YY HH:mm:ss'),
    //     },
    //     {
    //         title: 'Approved Date',
    //         dataIndex: 'approveDate',
    //         key: 'approveDate',
    //         render: (text) => moment(text).format('DD/MM/YY HH:mm:ss'),
    //     },
    // ];
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

    return (

        <>


            <div className="reffer-container">
                <p>Reffer Payout History</p>

                <div class="card-container">
                    <div class="card">
                        <p>Total Amount</p>
                        <h6>Total Amount: {payoutAmout}</h6>
                        <p>Refferal Payout Amount</p>
                    </div>
                    <div class="card">
                        <p>Refferal Payout Withdrawal</p>
                        <label htmlFor="">Enter Amount</label>
                        <Input
                            type="number"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={handleAmountChange}
                            prefix={<FaRupeeSign />}
                        />
                        <Button onClick={showRefferalPayoutModal}>Withdraw</Button>
                    </div>
                    <div class="card">
                        <p>Last Payout Request</p>
                        <h6>Amount:<FaRupeeSign /> {lastAmount}</h6>
                        <strong> Last Date: {lastDate}</strong>
                    </div>

                    <br />
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Withdrawal" key="1">
                            <div style={{ overflow: 'auto', maxHeight: '250px' }}>
                                <Table columns={requestColumns} dataSource={requestDetails} />
                            </div>

                        </TabPane>
                        {/* <TabPane tab="Approved" key="2">
                        <div style={{ overflow: 'auto', maxHeight: '250px' }}>
                            <Table columns={approvedColumns} dataSource={approvedDetails} />
                        </div>
                    </TabPane> */}
                    </Tabs>
                </div >
            </div >

            {/* --------payout withdrawal modal */}
            <Modal
                title="Refferal Payout Withdrawal"
                open={isRefferalPayoutWithdrawModalVisible}
                onOk={requestRefferalPayout}
                onCancel={handleRefferalPayoutWithdrawalCancel}
                okText="Submit"
            >
                <Select value={selectedOption} onChange={handleDropdownChange} style={{ width: '150px', marginBottom: '10px' }}>

                    <Option value="BankTransfer">Bank Transfer</Option>
                    <Option value="upi"> UPI</Option>
                </Select>
                {selectedOption === 'BankTransfer' && (
                    <div className='payout-transfer' >
                        <p >Name</p>
                        <Input type="text" id="BankTransfer" style={{ marginBottom: '2px', width: '100%' }}
                            className='payout-input'
                            placeholder='Enter your full name'
                        />

                        <p >A/C No.</p>
                        <Input type="text" id="BankTransfer" style={{ marginBottom: '2px', width: '100%' }}
                            className='payout-input'
                            placeholder='Enter your account no' />

                        <p>Bank Name</p>
                        <Input type="text" id="BankTransfer" style={{ marginBottom: '2px', width: '100%' }}
                            className='payout-input'
                            placeholder='Enter Bank name' />

                        <p>IFSC CODE</p>
                        <Input type="text" id="BankTransfer" style={{ marginBottom: '2px', width: '100%' }}
                            className='payout-input'
                            placeholder='Enter ifsc code' />

                    </div>
                )}
                {selectedOption === 'upi' && (
                    <div >

                        <Input type="text" id="upi" style={{ marginBottom: '10px', width: '100%' }}
                            placeholder='UPI' 
                                className='payout-input'
                            />
                    </div>
                )}
            </Modal>
        </>
    )
}

export default RefferalPayout