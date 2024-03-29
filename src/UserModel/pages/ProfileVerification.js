import React, { useState, useEffect } from "react";
import "../../css/ProfileVerification.css";
import verification_photo from "../../img/verification_instruction.JPG";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { RxCrossCircled } from "react-icons/rx";
import aadarFront from "../../img/Aadhaar-Card-front.jpg";
import aadharBack from "../../img/Aadhaar-Card-back.jpg";
import { ToastContainer, toast } from "react-toastify";
import panCard from "../../img/sample-pan-card.jpg";
import axios from "axios";
import { message, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi"
import baseUrl from "../../baseUrl";

const apiurl = baseUrl.apiUrl;

function ProfileVerification() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState("");
  const [aadharImage, setAadharImage] = useState({
    placeholder: aadarFront,
    file: null,
  });
  const [aadharBackImage, setAadharBackImage] = useState({
    placeholder: aadharBack,
    file: null,
  });
  const [panImage, setPanImage] = useState({
    placeholder: panCard,
    file: null,
  });
  const [otherCountryImage, setOtherCountryImage] = useState({
    placeholder: aadarFront,
    file: null,
  });
  const handleClickAadharFrontImage = (e) => {
    e.preventDefault();
    document.getElementById("file-input-front").click();
    if (
      e.target.files[0].type === "image/png" ||
      e.target.files[0].type === "image/jpeg"
    ) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAadharImage({
          placeholder: reader.result,
          file: e.target.files[0],
        });
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      toast.error("Invalid File !! ");
      aadharImage.file = null;
    }
  };
  const handleClickAadharBackImage = (e) => {
    e.preventDefault();
    document.getElementById("file-input-back").click();
    if (
      e.target.files[0].type === "image/png" ||
      e.target.files[0].type === "image/jpeg"
    ) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAadharBackImage({
          placeholder: reader.result,
          file: e.target.files[0],
        });
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      toast.error("Invalid File !! ");
      aadharImage.file = null;
    }
  };
  const handleClickPanImage = (e) => {
    e.preventDefault();
    document.getElementById("file-input-pan").click();
    if (
      e.target.files[0].type === "image/png" ||
      e.target.files[0].type === "image/jpeg"
    ) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPanImage({
          placeholder: reader.result,
          file: e.target.files[0],
        });
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      toast.error("Invalid File !! ");
      aadharImage.file = null;
    }
  };

  const handleClickOhterCountryImage = (e) => {
    e.preventDefault();
    document.getElementById("file-input-other").click();
    if (
      e.target.files[0].type === "image/png" ||
      e.target.files[0].type === "image/jpeg"
    ) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setOtherCountryImage({
          placeholder: reader.result,
          file: e.target.files[0],
        });
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      toast.error("Invalid File !! ");
      otherCountryImage.file = null;
    }
  };
  useEffect(() => {
    fetchUserDocuments();
    setUserType(localStorage.getItem("userType"));
  }, []);

  const fetchUserDocuments = () => {
    const token = localStorage.getItem("token");
    let data = {
      _id: localStorage.getItem("user"),
    };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(`${apiurl}` + "/user/fetch-user-details-userside", data, config)
      .then((result) => {
        if (result.data.data === "token expired") {
          navigate("/logout");
        } else {
          setAadharImage({ placeholder: result.data.result.aadhar_front_side });
          setAadharBackImage({
            placeholder: result.data.result.aadhar_back_side,
          });
          setPanImage({ placeholder: result.data.result.pan_card });
          setOtherCountryImage({ placeholder: result.data.result.ID_Card });
        }
      })
      .catch((error) => {});
  };

  const submitRequest = () => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    setLoading(true);
    formData.append("userid", localStorage.getItem("user"));
    formData.append("aadhar_front_side", aadharImage.file);
    formData.append("aadhar_back_side", aadharBackImage.file);
    formData.append("pan_card", panImage.file);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(`${apiurl}` + "/user/profileVerification", formData, config)
      .then((data) => {
        message.success("Documents uploaded successfully");
        setLoading(false);
        fetchUserDocuments();
      })
      .catch((error) => {
        setLoading(false);
        message.warning(error.response.data.message);
      });
  };

  const submitOtherRequest = () => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    setLoading(true);
    formData.append("userid", localStorage.getItem("userid"));
    formData.append("ID_Card", otherCountryImage.file);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(
        `${apiurl}` + "/user/users/other-country-profile-verification",
        formData,
        config
      )
      .then((data) => {
        message.success("Documents uploaded successfully");
        setLoading(false);
        fetchUserDocuments();
      })
      .catch((error) => {});
  };

  const gotoDashboard = ()=>{
    navigate('/userdashboard/dashboard')
  }

  return (
    <>
      <div className="profile_verification">
        <div className="verification_card">
          <div className="row">
            <div className="verification_heading col-md-12">
              <p> <BiArrowBack onClick={gotoDashboard} style={{cursor:'pointer'}}/>&nbsp;Change your document</p>
            </div>
          </div>
          <div className="row">
            <div className="verification_select_and_para">
              <div className="verificatin_box col-md-6">
                {userType === "indian" ? (
                  <div class="selectWrapper">
                    <select class="selectBox">
                      <option value="<FaRegIdCard/>">
                        Aadhar and Pan Card
                      </option>
                    </select>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>

          <div className="row">
            {userType === "indian" ? (
              <>
                <div className="verification_file_area">
                  <div className="verification_file_select col-md-8">
                    <div className="aadhar_front_div col-md-6">
                      <input
                        id="file-input-front"
                        type="file"
                        style={{ display: "none" }}
                        onChange={handleClickAadharFrontImage}
                      />
                      <label htmlFor="file-input-front">
                        <img
                          src={aadharImage.placeholder}
                          alt=""
                          width={230}
                          height={120}
                        />
                      </label>

                      <div className="aadhar_front_heading">
                        <span>Front side</span>
                        <p>
                          Provide files in <strong>JPG</strong> <br /> format,{" "}
                          <strong>2MB</strong> <br /> maximum
                        </p>
                      </div>
                    </div>

                    <div className="aadhar_back_div col-md-6">
                      <input
                        id="file-input-back"
                        type="file"
                        style={{ display: "none" }}
                        onChange={handleClickAadharBackImage}
                      />
                      <label htmlFor="file-input-back">
                        <img
                          src={aadharBackImage.placeholder}
                          alt=""
                          width={230}
                          height={120}
                        />
                      </label>
                      <div className="aadhar_front_heading">
                        <span>Reverse side</span>
                        <p>
                          Provide files in <strong>JPG</strong> <br /> format,{" "}
                          <strong>2MB</strong> <br /> maximum
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="verification_image mt-3 col-md-4">
                    <input
                      id="file-input-pan"
                      type="file"
                      style={{ display: "none" }}
                      onChange={handleClickPanImage}
                    />
                    <label htmlFor="file-input-pan">
                      <img
                        src={panImage.placeholder}
                        alt=""
                        width={230}
                        height={120}
                      />
                    </label>
                    <div className="aadhar_front_heading">
                      <span>Pan Card</span>
                      <p>
                        Provide files in <strong>JPG</strong> <br /> format,{" "}
                        <strong>2MB</strong> <br /> maximum
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="aadhar_front_div col-md-6">
                  <input
                    id="file-input-other"
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleClickOhterCountryImage}
                  />
                  <label htmlFor="file-input-other">
                    <img
                      src={otherCountryImage.placeholder}
                      alt=""
                      width={200}
                      height={100}
                    />
                  </label>

                  <div className="aadhar_front_heading">
                    <span>ID Card</span>
                    <p>
                      Provide files in <strong>JPG</strong> <br /> format,{" "}
                      <strong>2MB</strong> <br /> maximum
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
          <hr />
          <div className="verification_footer row">
            <div className="check">
              <span>
                <BsFillCheckCircleFill />
              </span>
              &nbsp;
              <strong>
                Upload a colourful full-size (4 sides visible) photo of the
                document.
              </strong>
            </div>
            <div className="uncheck">
              <span>
                <RxCrossCircled />
              </span>
              &nbsp;
              <strong>
                Do not upload selfies, screenshots and do not modify the images
                in graphic editors.
              </strong>
            </div>
          </div>
          <div className="verification_submit_button ">
            {userType === "indian" ? (
              <button className="btn btn-primary" onClick={submitRequest}>
                {loading ? <Spin /> : "Submit Request"}
              </button>
            ) : (
              <button className="btn btn-primary" onClick={submitOtherRequest}>
                {loading ? <Spin /> : "Submit Request"}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileVerification;
