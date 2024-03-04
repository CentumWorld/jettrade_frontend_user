import React, { useState } from "react";
import "../../css/AccountList.css";
import { NavLink,useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi"

const AccountList = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const gotoDashboard = ()=>{
    navigate('/userdashboard/dashboard')
  }
  return (
    <>
      <div className="accounts_main_container">
        <div className="accounts_card">
          <div className="accounts_heading">
            <p> <BiArrowBack onClick={gotoDashboard} style={{cursor:'pointer'}}/>&nbsp;Your accounts</p>
          </div>
          <div className="accounts_para">
            <p>
              This is a list of all your accounts in our service. Here you can
              view the main details, track your activities, and{" "}
              <NavLink to="">deposit your account.</NavLink>
            </p>
          </div>

          <div className="account_tab">
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab style={{ fontWeight: "800",fontFamily:'Roboto' }} label="REAL" value="1" />
                    <Tab
                      style={{ fontWeight: "800",fontFamily:'Roboto' }}
                      label="CONTESTS"
                      value="2"
                    />
                    <Tab style={{ fontWeight: "800",fontFamily:'Roboto' }} label="DEMO" value="3" />
                    <Tab
                      style={{ fontWeight: "800",fontFamily:'Roboto' }}
                      label="CLOSED"
                      value="4"
                    />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <div className="table create-account-table table-responsive">
                    <thead>
                      <tr>
                        <th>Account</th>
                        <th>Type</th>
                        <th>Server</th>
                        <th>Balance</th>
                        <th>Equity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="d-flex">
                          <strong>MT</strong>&nbsp;<small>5</small> &nbsp;
                          <span className="three-dot">
                            <BsThreeDotsVertical />
                          </span>
                          &nbsp; <span>789565</span>
                        </td>
                        <td>
                          <div className="type-rate">
                            <span>Real</span>
                          </div>
                        </td>
                        <td style={{fontSize:'14px'}}>JettradeFXReal</td>
                        <td style={{fontSize:'14px'}}>$0.00</td>
                        <td style={{fontSize:'14px'}}>$0.00</td>
                      </tr>
                      <tr>
                        <td className="d-flex">
                          <strong>MT</strong>&nbsp;<small>5</small> &nbsp;
                          <span className="three-dot">
                            <BsThreeDotsVertical />
                          </span>
                          &nbsp; <span>789565</span>
                        </td>
                        <td>
                          <div className="type-rate">
                            <span>Real</span>
                          </div>
                        </td>
                        <td>JettradeFXReal</td>
                        <td>$0.00</td>
                        <td>$0.00</td>
                      </tr>
                    </tbody>
                  </div>
                  <div className="tab_btn">
                    <button className="btn btn-primary">
                      OPEN A NEW REAL ACCOUNT
                    </button>
                  </div>
                </TabPanel>
                <TabPanel value="2">
                  <div className="contest_tab">
                    <div className="contest_data">
                      <p>You do not have Demo contest accounts yet.</p>
                    </div>
                    <div className="constest_btn">
                      <button className="btn btn-primary">
                        OPEN NEW DEMO CONTEST ACCOUNT
                      </button>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value="3">
                  <div className="demo_tab">
                    <div className="demo_data">
                      <p>You do not have Demo accounts yet.</p>
                    </div>
                    <div className="demo_button">
                      <button className="btn btn-primary">
                        OPEN NEW DEMO ACCOUNT{" "}
                      </button>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value="4">
                  <div className="close_tab">
                    <div className="close_data">
                      <p>You do not have closed accounts yet.</p>
                    </div>
                  </div>
                </TabPanel>
              </TabContext>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountList;
