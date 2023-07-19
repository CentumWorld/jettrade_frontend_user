import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import "../../css/UserDetails.css";
import profile from "../../img/user_profile.png";
import axios from "axios";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import {
  message,
  Spin,
  Modal,
  Button,
  Row,
  Col,
  Input,
  Select,
  DatePicker,
} from "antd";
import baseUrl from '../../baseUrl';

const apiurl = baseUrl.apiUrl

const { Option } = Select;

const UserDetails = () => {
  const [userType, setUserType] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsEditModalVisible] = useState(false);
  const id = localStorage.getItem("user");
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    phone: "",
    email: "",
    dob: "",
    status: "",
    userid: "",
    refferal: "",
  });
  const [editUserData, setEditUserData] = useState({
    fname: "",
    lname: "",
    phone: "",
    gender: "",
    address: "",
    aadhar: "",
    pan: "",
    Id_no: "",
    dob: null,
  });
  //state for hadle image
  const [image, setImage] = useState({
    placeholder: profile,
    file: null,
  });
  // edit modal
  const editModal = () => {
    setIsEditModalVisible(true);
  };

  // const handleOk = () => {
  //   setIsEditModalVisible(false);
  // };

  const handleCancel = () => {
    setIsEditModalVisible(false);
  };
  // ---------

  useEffect(() => {
    setUserType(localStorage.getItem("userType"));
    fetchData();
    fetchUserProfile(localStorage.getItem("userid"));
    fetchUserDetailsForEdit();
  }, []);

  // function for upload profile
  const uploadProfile = (event) => {
    const token = localStorage.getItem("token");
    setLoading(true);
    event.preventDefault();
    var formData = new FormData();
    formData.append("image", image.file);
    formData.append("userid", localStorage.getItem("userid"));
    //console.log(formData);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Set the 'Authorization' header with the token
      },
    };

    axios.post(`${apiurl}`+"/user/profilePhotoUpload", formData, config)
      .then((res) => {
        if (res) {
          setLoading(false);
          message.success("Profile picture uploaded !");
          fetchData();
        }
      })
      .catch((err) => {});
  };

  //function for image change
  const handleProfileImageChange = (e) => {
    //e.preventDefault();

    document.getElementById("file-input").click();

    if (
      e.target.files[0].type === "image/png" ||
      e.target.files[0].type === "image/jpeg"
    ) {
      //preview shoe
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage({
          placeholder: reader.result,
          file: e.target.files[0],
        });
      };
      reader.readAsDataURL(e.target.files[0]);

      //uploadProfile(e.target.files[0]);
    } else {
      toast.error("Invalid File !! ");
      image.file = null;
    }
  };

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    let data = {
      _id: id,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Set the 'Authorization' header with the token
      },
    };
    try {
      const response = await axios.post(`${apiurl}`+
        "/user/fetch-user-details-userside",
        data,
        config
      );
      console.log(response.data, "58");
      if (response) {
        //setUser(response.data.result);
        setUser({
          userid: response.data.result.userid,
          fname: response.data.result.fname,
          lname: response.data.result.lname,
          phone: response.data.result.phone,
          email: response.data.result.email,
          dob: moment(response.data.result.dob).format("DD/MM/YYYY"),
          status: response.data.result.status,
          refferal: response.data.result.refferal_id,
        });
        //fetchUserProfile();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserProfile = async (id) => {
    //console.log(user.userid);
    const token = localStorage.getItem("token");
    let data = {
      userid: id,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Set the 'Authorization' header with the token
      },
    };
    try {
      const response = await axios.post(`${apiurl}`+
        "/user/fetch-profile-photo-user",
        data,
        config
      );
      console.log(response.data.result, "103");
      setImage({
        placeholder: response.data.result[0].imageUrl,
        //file: e.target.files[0]
      });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserDetailsForEdit = () => {
    const token = localStorage.getItem("token");
    const userid = localStorage.getItem("userid");
    let data = {
      userid: userid,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Set the 'Authorization' header with the token
      },
    };
    axios.post(`${apiurl}`+"/user/users/edit-user-details", data, config)
      .then((result) => {
        console.log(result.data.result[0], "182");

        if (userType === "indian") {
          setEditUserData({
            fname: result.data.result[0].fname,
            lname: result.data.result[0].lname,
            phone: result.data.result[0].phone,
            address: result.data.result[0].address,
            dob: result.data.result[0].dob,
            aadhar: result.data.result[0].aadhar,
            pan: result.data.result[0].pan,
            gender: result.data.result[0].gender,
          });
        }
        // if (userType === "otherCountry") {
          else{
          setEditUserData({
            fname: result.data.result[0].fname,
            lname: result.data.result[0].lname,
            phone: result.data.result[0].phone,
            address: result.data.result[0].address,
            dob: result.data.result[0].dob,
            Id_no: result.data.result[0].Id_No,
            gender: result.data.result[0].gender,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editInputChange = (e) => {
    const { name, value } = e.target;
    setEditUserData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleGenderChange = (value) => {
    setEditUserData((prevFormData) => ({
      ...prevFormData,
      gender: value,
    }));
  };

  const handleDobChange = (date) => {
    setEditUserData((prevFormData) => ({
      ...prevFormData,
      dob: date,
    }));
  };
  // save edit value
  const editModalSubmit = (e) => {
    e.preventDefault();
    if (userType === "indian") {
      const data = {
        userWhat: "indian",
        userid: localStorage.getItem("userid"),
        fname: editUserData.fname,
        lname: editUserData.lname,
        phone: editUserData.phone,
        address: editUserData.address,
        dob: editUserData.dob,
        aadhar: editUserData.aadhar,
        pan: editUserData.pan,
        gender: editUserData.gender,
      };
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Set the 'Authorization' header with the token
        },
      };
      axios.post(`${apiurl}`+"/user/users/save-user-edited-details", data, config)
        .then((res) => {
          message.success("Updated Successfully");
          setIsEditModalVisible(false);
        })
        .catch((err) => {
          message.warning("Something went wrong!");
        });
    }
    if (userType === "otherCountry") {
      const data = {
        userWhat: "other",
        userid: localStorage.getItem("userid"),
        fname: editUserData.fname,
        lname: editUserData.lname,
        phone: editUserData.phone,
        address: editUserData.address,
        dob: editUserData.dob,
        Id_No: editUserData.Id_no,
        gender: editUserData.gender,
      };
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Set the 'Authorization' header with the token
        },
      };

      console.log(data);
      axios.post(`${apiurl}`+"/user/users/save-user-edited-details", data, config)
        .then((res) => {
          message.success("Updated Successfully");
          setIsEditModalVisible(false);
        })
        .catch((err) => {
          message.warning("Something went wrong!");
        });
    }
  };

  return (
    <>
      <div className="user_details">
        <div className="user_card">
          <div className="row">
            <div className="user_details_heading">
              <div className="user_main_heading">
                <p>Personal information</p>
                <Button
                  type="primary"
                  style={{ borderRadius: "12px" }}
                  onClick={editModal}
                >
                  Edit Details
                </Button>
              </div>
              <div className="user_main_heading_paragraph">
                <p>
                  Here you can view and change your personal information on our
                  platform. Please note that the details should be correct and
                  up-to-date.
                </p>
              </div>
            </div>
          </div>
          <div className="user_deatails_main_div row">
            <div className="user_details_content col-md-8">
              <div className="row">
                <div className="row_content">
                  <div className="user_head">
                    <h6>Email</h6>
                  </div>
                  <div className="user_head_data">
                    <h6>{user.email}</h6>
                    {/* <span><NavLink to={''}>change</NavLink></span> */}
                  </div>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="row_content">
                  <div className="user_head">
                    <h6>Phone</h6>
                  </div>
                  <div className="user_head_data">
                    <h6>{user.phone}</h6>
                    {/* <span><NavLink to={''}>change</NavLink></span> */}
                  </div>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="row_content">
                  <div className="user_head">
                    <h6>Name</h6>
                  </div>
                  <div className="user_head_data">
                    <h6>
                      {user.fname}&nbsp;{user.lname}
                    </h6>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="row_content">
                  <div className="user_head">
                    <h6>Birthdate</h6>
                  </div>
                  <div className="user_head_data">
                    <h6>{user.dob}</h6>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="row_content">
                  <div className="user_head">
                    <h6>Country</h6>
                  </div>
                  <div className="user_head_data">
                    {userType === "indian" ? <h6>IND</h6> : <h6>Other</h6>}
                  </div>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="row_content">
                  <div className="user_head">
                    <h6>Verification status</h6>
                  </div>
                  <div className="verification_status">
                    <h6>
                      {!user.status ? (
                        <span style={{ color: "red" }}>Not Verified</span>
                      ) : (
                        <span style={{ color: "green" }}>Verified</span>
                      )}
                    </h6>
                    {/* <span><NavLink to={''}>Get Verified</NavLink></span> */}
                  </div>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="row_content">
                  <div className="user_head">
                    <h6>Refferal ID</h6>
                  </div>
                  <div className="user_head_data">
                    <Link
                      to={`/user-registration/${user.refferal}`}
                      target="_blank"
                    >
                      <h6>{user.refferal}</h6>
                    </Link>
                    {/* <button onClick={handleInviteClick}><h6>{user.refferal}</h6></button> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="user_profile col-md-4">
              <div className="pic">
                <form onSubmit={uploadProfile}>
                  <input
                    id="file-input"
                    type="file"
                    style={{ display: "none" }}
                    name="file1"
                    onChange={handleProfileImageChange}
                  />
                  <label htmlFor="file-input">
                    <img src={image.placeholder} alt="" />
                  </label>

                  <div class=" upload_file d-grid mx-auto">
                    <button class="btn btn-primary" type="submit">
                      {loading ? <Spin /> : "Upload"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      {/* modal */}
      <div>
        <Modal
          title={
            <span style={{ color: "#5e72e4", fontFamily: "Calibri" }}>
              EDIT INFORMATION
            </span>
          }
          open={isModalVisible}
          onCancel={handleCancel}
          footer={[
            <Button key="submit" type="primary" onClick={editModalSubmit}>
              Submit
            </Button>,
          ]}
          //footer={null}
        >
          <div className="edit-container">
            <div>
              <Row style={{ marginBottom: "5px" }}>
                <Col span={12}>First Name :</Col>
                <Col span={12}>
                  <Input
                    value={editUserData.fname}
                    name="fname"
                    onChange={editInputChange}
                    placeholder="Enter first name"
                  />
                </Col>
              </Row>
            </div>
            <div>
              <Row style={{ marginBottom: "5px" }}>
                <Col span={12}>Last Name :</Col>
                <Col span={12}>
                  <Input
                    value={editUserData.lname}
                    name="lname"
                    onChange={editInputChange}
                    placeholder="Enter last name"
                  />
                </Col>
              </Row>
            </div>
            <div>
              <Row style={{ marginBottom: "5px" }}>
                <Col span={12}>Phone:</Col>
                <Col span={12}>
                  <Input
                    value={editUserData.phone}
                    name="phone"
                    onChange={editInputChange}
                    placeholder="Enter last name"
                  />
                </Col>
              </Row>
            </div>
            <div>
              <Row style={{ marginBottom: "5px" }}>
                <Col span={12}>Address :</Col>
                <Col span={12}>
                  <Input
                    value={editUserData.address}
                    name="address"
                    onChange={editInputChange}
                    placeholder="Enter last name"
                  />
                </Col>
              </Row>
            </div>
            {userType === "indian" ? (
              <>
                <div>
                  <Row style={{ marginBottom: "5px" }}>
                    <Col span={12}>Aadhar No. :</Col>
                    <Col span={12}>
                      <Input
                        value={editUserData.aadhar}
                        name="aadhar"
                        onChange={editInputChange}
                        placeholder="Enter last name"
                      />
                    </Col>
                  </Row>
                </div>
                <div>
                  <Row style={{ marginBottom: "5px" }}>
                    <Col span={12}>Pan No. :</Col>
                    <Col span={12}>
                      <Input
                        value={editUserData.pan}
                        name="pan"
                        onChange={editInputChange}
                        placeholder="Enter last name"
                      />
                    </Col>
                  </Row>
                </div>
              </>
            ) : (
              <>
                <div>
                  <Row style={{ marginBottom: "5px" }}>
                    <Col span={12}>ID No. :</Col>
                    <Col span={12}>
                      <Input
                        value={editUserData.Id_no}
                        name="Id_no"
                        onChange={editInputChange}
                        placeholder="Enter Id no"
                      />
                    </Col>
                  </Row>
                </div>
              </>
            )}
            <div>
              <Row style={{ marginBottom: "5px" }}>
                <Col span={12}>Gender :</Col>
                <Col span={12}>
                  <Select
                    name="gender"
                    value={editUserData.gender}
                    onChange={handleGenderChange}
                    placeholder="Gender"
                  >
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                    <Option value="other">Other</Option>
                  </Select>
                </Col>
              </Row>
            </div>
            <div>
              <Row style={{ marginBottom: "5px" }}>
                <Col span={12}>Date of Birth :</Col>
                <Col span={12}>
                  <DatePicker
                    name="dob"
                    value={editUserData.dob ? moment(editUserData.dob) : null}
                    onChange={handleDobChange}
                  />
                </Col>
              </Row>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default UserDetails;
