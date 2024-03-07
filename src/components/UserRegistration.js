import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, NavLink, useParams } from "react-router-dom";
// import UserLogin from './UserLogin';
import "../css/UserRegistration.css";
import {
  Select,
  Input,
  Form,
  Radio,
  DatePicker,
  Button,
  Upload,
  message,
  Switch,
  Spin,
} from "antd";

import {
  MailOutlined,
  FlagOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import PhoneInput from "react-phone-input-2";

import "react-phone-input-2/lib/bootstrap.css";
import { UserContext } from "../App";
import baseUrl from "../baseUrl";

const apiurl = baseUrl.apiUrl;

const { TextArea } = Input;

const { Option } = Select;
export const UseParamContext = createContext();

function UserRegistration() {
  const { dispatch } = useContext(UserContext);

  const id = useParams();

  // --------------------------------------
  const customDobSuffixIcon = <CalendarOutlined style={{ color: "#5e72e4" }} />;
  // -----------------------------
  const [phone, setPhone] = useState("");

  const [userData, setUserData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    dob: "",
    aadhar_no: "",
    pan_no: "",
    invite_code: "",
    userid: "",
    password: "",
    foregien_id: "",
  });
  const [strength, setStrength] = useState(0);

  const [panError, setPanError] = useState(false);
  const [aadharError, setAadharError] = useState(false);

  const [aadharImage, setAadharImage] = useState({
    file: null,
  });
  const [aadharBackImage, setAadharBackImage] = useState({
    file: null,
  });
  const [panImage, setPanImage] = useState({
    file: null,
  });
  const [foregienCard, setForegienCard] = useState({
    file1: null,
  });
  const [spin, setSpin] = useState(false);
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [adharerror, setadharError] = useState("");
  const [adharbackerror, setadharbackError] = useState("");
  const [panerror, setpanError] = useState("");
  const [iderror, setidError] = useState("");

  const userInputs = (e) => {
    e.preventDefault();
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleClickAadharFrontImage = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      if (selectedFile.size >= 2 * 1024 * 1024) {
        setadharError("File size is more than 2MB");
        // Handle the case when the file size is more than 2MB
        setAadharImage({ file: null });
      } else {
        setadharError("");
        setAadharImage({ file: selectedFile });
      }
    }
  };
  const handleClickAadharBackImage = (e) => {
    
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      if (selectedFile.size >= 2 * 1024 * 1024) {
        setadharbackError("File size is more than 2MB");
        // Handle the case when the file size is more than 2MB
        setAadharBackImage({ file: null });
      } else {
        setadharbackError("");
        setAadharBackImage({ file: selectedFile });
      }
    }
  };

  const handleClickPanCardImage = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      if (selectedFile.size >= 2 * 1024 * 1024) {
        setpanError("File size is more than 2MB");
        // Handle the case when the file size is more than 2MB
        setPanImage({ file: null });
      } else {
        setpanError("");
        setPanImage({ file: selectedFile });
      }
    }
  };

  const handleClickForeignCard = (e) => {
    const selectedFile = e.target.files[0];
    console.log(selectedFile);
    debugger;

    if (selectedFile) {
      if (selectedFile.size >= 2 * 1024 * 1024) {
        setidError("File size is more than 2MB");
        // Handle the case when the file size is more than 2MB
        setForegienCard({ file: null });
      } else {
        setidError("");
        setForegienCard({ file: selectedFile });
      }
    }
  };

  const pan = (e) => {
    e.preventDefault();
    setUserData({ ...userData, pan_no: e.target.value });
    let panLength = e.target.value;
    if (panLength.length === 10) {
      setPanError(false);
    } else {
      setPanError(true);
    }
  };
  const aadhar = (e) => {
    setUserData({ ...userData, aadhar_no: e.target.value });
    let aadharLength = e.target.value;
    if (aadharLength.length === 12) {
      setAadharError(false);
    } else {
      setAadharError(true);
    }
  };
  function home() {
    navigate("/");
  }
  const handleToggle = (checked) => {
    setChecked(checked);
    if (checked === false) {
      setUserData({ ...userData, userid: "", password: "" });
    }
  };
  const submit = async (e) => {
    setSpin(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("fname", userData.fname);
    formData.append("lname", userData.lname);
    formData.append("email", userData.email);
    formData.append("phone", userData.phone);
    formData.append("address", userData.address);
    formData.append("gender", userData.gender);
    formData.append("dob", userData.dob);

    formData.append("reffered_id", userData.invite_code);
    if (userData.userid === undefined && userData.password === undefined) {
      formData.append("password", "");
      formData.append("userid", "");
    } else {
      formData.append("password", userData.password);
      formData.append("userid", userData.userid);
    }
    if (countryCode === "91") {
      formData.append("aadhar", userData.aadhar_no);
      formData.append("aadhar_front_side", aadharImage.file);
      formData.append("aadhar_back_side", aadharBackImage.file);
      formData.append("pan_card", panImage.file);
      formData.append("pan", userData.pan_no);
    } else {
      formData.append("Id_No", userData.foregien_id);
      formData.append("ID_Card", foregienCard.file);
    }

    if (countryCode === "91") {
      try {
        const res = await axios.post(
          `${apiurl}` + "/user/registration",
          formData
        );
        message.success("Registration successful");
        localStorage.setItem("token", res.data.token);

        dispatch({ type: "USER", payload: true });
        userData.userid = "";
        userData.password = "";

        localStorage.setItem("user", res.data._id);
        localStorage.setItem("userid", res.data.userid);
        localStorage.setItem("password", res.data.password);

        localStorage.setItem("refferal", res.data.refferal_id);
        localStorage.setItem("userfname", res.data.fname);
        localStorage.setItem("userType", res.data.userType);

        navigate("/userid-and-password-save");

        setSpin(false);
      } catch (error) {
        message.warning(error.response.data.message);
        setSpin(false);
      }
    } else {
      try {
        const res = await axios.post(
          `${apiurl}` + "/user/users/other-country-user-registration",
          formData
        );
        message.success("Registration successful");
        localStorage.setItem("password", res.data.password);
        localStorage.setItem("token", res.data.token);

        dispatch({ type: "USER", payload: true });
        userData.userid = "";
        userData.password = "";

        localStorage.setItem("user", res.data._id);
        localStorage.setItem("userid", res.data.userid);
        localStorage.setItem("refferal", res.data.refferal_id);
        localStorage.setItem("userfname", res.data.fname);
        localStorage.setItem("userType", res.data.userType);

        navigate("/userid-and-password-save");
        setSpin(false);
      } catch (error) {
        message.warning(error.response.data.message);
        setSpin(false);
      }
    }
  };
  const handleDateOfBirthChange = (date, dateString) => {
    setUserData((userData) => ({
      ...userData,
      dob: dateString,
    }));
  };

  const [selectedOption, setSelectedOption] = useState("referral");
  const [referralId, setReferralId] = useState("");
  const officialId = "memberofficial1235125";
  const [countryCode, setCountryCode] = useState("");

  const handleDropdownChange = (value) => {
    setSelectedOption(value);
    setReferralId("");
    setUserData({ ...userData, invite_code: officialId });
  };

  const hadleRefferalId = (value) => {
    setReferralId(value);
    setUserData({ ...userData, invite_code: value });
  };

  useEffect(() => {
    const reffer = id.inviteCode;
    if (reffer) {
      setUserData({ ...userData, invite_code: id.inviteCode });
      setReferralId(reffer);
    }
  }, []);

  const handlePhoneChange = (value) => {
    const str = value;
    const firstTwoLetters = str.substring(0, 2);
    setCountryCode(firstTwoLetters);
    setPhone(value);
    setUserData({ ...userData, phone: value });
  };

  const validateEmail = (rule, value, callback) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value || emailRegex.test(value)) {
      callback();
    } else {
      callback("Please enter a valid email");
    }
  };

  const calculatePasswordStrength = (password) => {
    const length = password.length;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(
      password
    );

    let score = 0;
    if (length >= 8) score++;
    if (hasUppercase) score++;
    if (hasLowercase) score++;
    if (hasNumber) score++;
    if (hasSpecialChar) score++;

    return score;
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setUserData({ ...userData, password: newPassword });

    const strength = calculatePasswordStrength(newPassword);
    setStrength(strength);
  };

  const getStrengthLabel = (strength) => {
    switch (strength) {
      case 0:
        return "Very Weak";
      case 1:
        return "Weak";
      case 2:
        return "Moderate";
      case 3:
        return "Strong";
      case 4:
        return "Very Strong";
      default:
        return "";
    }
  };

  const getStrengthColor = (strength) => {
    switch (strength) {
      case 0:
        return "red";
      case 1:
        return "orange";
      case 2:
        return "yellow";
      case 3:
        return "green";
      case 4:
        return "darkgreen";
      default:
        return "";
    }
  };

  return (
    <>
      <div className="registration-page">
        <div className="registration-body">
          <h4>Welcome to JETTRADE FX</h4>
          <p>Sign up with credentials</p>
          <div className="form-content">
            <form>
              <div className="d-flex">
                <Select value={selectedOption} onChange={handleDropdownChange}>
                  <Option value="official">Official ID</Option>
                  <Option value="referral"> Put Referral ID</Option>
                </Select>

                {selectedOption === "official" && (
                  <div>
                    <Input
                      type="text"
                      id="official-id"
                      value={officialId}
                      style={{
                        marginBottom: "10px",
                        width: "100%",
                        background: "white",
                        color: "black",
                      }}
                      disabled
                    />
                  </div>
                )}

                {selectedOption === "referral" && (
                  <div>
                    <Input
                      className="custom-placeholder-input"
                      type="text"
                      id="referral-id"
                      value={referralId}
                      name="invite_code"
                      onChange={(e) => hadleRefferalId(e.target.value)}
                      placeholder="Enter referral ID"
                      style={{ marginBottom: "10px" }}
                    />
                  </div>
                )}
              </div>
              <div className="input_label">
                <p>First Name</p>
                <Input
                  className="custom-placeholder-input"
                  placeholder=" Enter first name"
                  name="fname"
                  value={userData.fname}
                  onChange={userInputs}
                  style={{ marginBottom: "10px" }}
                />
              </div>
              <div className="input_label">
                <p>Last Name</p>
                <Input
                  className="custom-placeholder-input"
                  placeholder="Enter last name"
                  name="lname"
                  value={userData.lname}
                  onChange={userInputs}
                  style={{ marginBottom: "10px" }}
                />
              </div>
              <div className="input_label">
                <p>Email</p>
                <Input
                  className="custom-placeholder-input"
                  prefix={<MailOutlined />}
                  placeholder="Enter email"
                  name="email"
                  type="email"
                  value={userData.email}
                  onChange={userInputs}
                  style={{ marginBottom: "10px", color: "black" }}
                  onBlur={validateEmail}
                />
              </div>
              {/* antd phone */}
              <div className="input_label">
                <p>Phone Number</p>

                <PhoneInput
                  placeholder="Enter phone number"
                  name="phone"
                  country="IN"
                  countrySelectProps={{ suffixIcon: <FlagOutlined /> }}
                  inputComponent={Input}
                  value={phone}
                  onChange={handlePhoneChange}
                  style={{ marginBottom: "10px" }}
                />
              </div>

              <div className="input_label">
                <p>Address</p>
                <Input
                  className="custom-placeholder-input"
                  placeholder="Enter Address"
                  name="address"
                  value={userData.address}
                  onChange={userInputs}
                  style={{ marginBottom: "10px" }}
                />
              </div>

              <div className="gender-dob">
                <div className="gender-dob-section">
                  <p>Gender</p>
                  <Radio.Group
                    name="gender"
                    value={userData.gender}
                    onChange={userInputs}
                    style={{ marginBottom: "10px" }}
                  >
                    <Radio value="male" style={{ color: "white" }}>
                      Male
                    </Radio>
                    <Radio value="female" style={{ color: "white" }}>
                      Female
                    </Radio>
                    <Radio value="other" style={{ color: "white" }}>
                      Other
                    </Radio>
                  </Radio.Group>
                </div>
                <div
                  className="gender-dob-section"
                  style={{ cursor: "pointer" }}
                >
                  <p>DOB</p>
                  <DatePicker
                    placeholder="Select a date"
                    className="custom-datepicker"
                    onChange={handleDateOfBirthChange}
                    style={{ marginBottom: "10px" }}
                    suffixIcon={customDobSuffixIcon}
                  />
                </div>
              </div>
              {countryCode === "91" ? (
                <>
                  <div className="input_label">
                    <p>Aadhar No.</p>
                    <Input
                      className="custom-placeholder-input"
                      placeholder="Enter Aadhar no."
                      type="text"
                      name="aadhar_no"
                      maxLength="12"
                      onChange={userInputs}
                      style={{ marginBottom: "10px" }}
                    />
                  </div>

                  <div className="aadhar-front">
                    <p>Aadhar Front(JPG/PNG)</p>
                    <div>
                      <Input
                        placeholder="Aadhar Front Image"
                        type="file"
                        accept=".jpg, .jpeg, .png"
                        onChange={handleClickAadharFrontImage}
                      />
                    </div>
                    {adharerror && (
                      <p style={{ color: "red", marginTop: "0.7rem" }}>
                        {adharerror}
                      </p>
                    )}
                  </div>

                  <div className="aadhar-back">
                    <p>Aadhar Back(JPG/PNG)</p>
                    <div>
                      <Input
                        placeholder="Aadhar back Image"
                        type="file"
                        accept=".jpg, .jpeg, .png"
                        onChange={handleClickAadharBackImage}
                      />
                    </div>
                    {adharbackerror && (
                      <p style={{ color: "red", marginTop: "0.7rem" }}>
                        {adharbackerror}
                      </p>
                    )}
                  </div>

                  <div className="input_label">
                    <p>Pan No.</p>
                    <Input
                      className="custom-placeholder-input"
                      placeholder=" Enter Pan no."
                      type="text"
                      name="pan_no"
                      onChange={userInputs}
                      style={{ marginBottom: "10px" }}
                    />
                  </div>

                  <div className="pan_card">
                    <p>Pan Card(JPG/PNG)</p>
                    <div>
                      <Input
                        placeholder="Pan card"
                        type="file"
                        accept=".jpg, .jpeg, .png"
                        onChange={handleClickPanCardImage}
                      />
                    </div>
                    {panerror && (
                      <p style={{ color: "red"}}>
                        {panerror}
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="input_label">
                    <p>ID Number</p>
                    <Input
                  
                      className="custom-placeholder-input"
                      placeholder="Enter ID no."
                      type="text"
                      name="foregien_id"
                      value={userData.foregien_id}
                      onChange={userInputs}
                      style={{ marginBottom: "10px" }}
                
                    />
                  </div>
                  <div className="pan_card">
                    <p>ID Card(JPG/PNG)</p>
                    <div>
                      <Input
                        placeholder="Upload ID Card"
                        type="file"
                        accept=".jpg, .jpeg, .png"
                        onChange={handleClickForeignCard}
                      />
                    </div>
                    {iderror && (
                      <p style={{ color: "red"}}>
                        {iderror}
                      </p>
                    )}
                  </div>
                </>
              )}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "5px",
                }}
              >
                <p>Do you want to create User ID and password OR default</p>
                <Switch checked={checked} onChange={handleToggle} />
              </div>
              {checked ? (
                <div className="password-input">
                  <p>User ID</p>
                  <Input
                    className="custom-placeholder-input"
                    placeholder="Enter your user ID"
                    value={userData.userid}
                    name="userid"
                    onChange={userInputs}
                    style={{ marginBottom: "10px" }}
                  />
                </div>
              ) : (
                ""
              )}

              {checked ? (
                <div className="password-input">
                  <p>Password</p>
                  <Input.Password
                    className="custom-placeholder-input"
                    placeholder="Enter your password"
                    value={userData.password}
                    name="password"
                    onChange={handlePasswordChange}
                    style={{ marginBottom: "10px" }}
                  />
                  <p style={{ color: getStrengthColor(strength) }}>
                    {getStrengthLabel(strength)}
                  </p>
                </div>
              ) : (
                ""
              )}
              <div className="submit-footer">
                <button type="submit" onClick={submit} className="register-Btn">
                  {spin ? <Spin style={{ color: "white" }} /> : "Register"}
                </button>
                <button
                  style={{ backgroundColor: "green", color: "white" }}
                  onClick={home}
                  className="home-Btn"
                >
                  Home
                </button>
                <p style={{ float: "right", color: "white" }}>
                  <NavLink to="/user-login" style={{ color: "white" }}>
                    Already registered Login
                  </NavLink>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserRegistration;
