import React, { useState } from "react";
import { message, Modal } from "antd";
import share from "../img/share-icon.png";
import { FaCopy } from "react-icons/fa";
import "../css/InviteFriend.css";
import {
  EmailShareButton,
  FacebookShareButton,
  InstapaperShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  EmailIcon,
  FacebookIcon,
  InstapaperIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
const InviteFriend = () => {
  const inviteCode = localStorage.getItem("refferal");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleImageClick = () => {
    setIsModalVisible(true);
  };
  const handleModalClose = () => {
    setIsModalVisible(false);
  };
  const handleShareWhatsApp = () => {
    const link = "http://trader.jettradefx.in/user-registration";
    const message = `Join us with invite code: ${inviteCode}\n\n${link}`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };
  const handleShareFacebookApp = () => {
    const link = "http://trader.jettradefx.in/user-registration";
    const message = `Join us with invite code: ${inviteCode}`;
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      link
    )}&quote=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };
  const handleShareInstagram = () => {
    const link = "http://trader.jettradefx.in/user-registration";
    const message = `Join us with invite code: ${inviteCode}  #referralprogram #invitefriends\n`;
    const url = `https://www.instagram.com/share?url=${encodeURIComponent(
      link
    )}&caption=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };
  const handleShareTwitter = () => {
    const link = "http://trader.jettradefx.in/user-registration";
    const message = `Join us with invite code: ${inviteCode}\n\n${link}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };
  const handleShareEmail = () => {
    const link = "http://trader.jettradefx.in/user-registration";
    const subject = "Join us with my referral link";
    const body = `Join us with invite code: ${inviteCode}\n\n${link}`;
    const url = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.open(url);
  };
  const handleCopyToClipboard = () => {
    const link = "http://trader.jettradefx.in/user-registration";
    const textToCopy = `Join us with invite code: ${inviteCode}\n\n${link}`;
    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    message.success("Copied successful!");
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <div>
          <img
            src={share}
            alt="Image"
            onClick={handleImageClick}
            style={{ width: "225px", height: "225px" }}
          />
          <p style={{ fontFamily: "Calibri" }}>
            Share Now, Reffer and Earn Money
          </p>
        </div>
        <Modal
          open={isModalVisible}
          onCancel={handleModalClose}
          onOk={handleModalClose}
          footer={null}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "20px",
            }}
          >
            <div className="image-container">
              <WhatsappShareButton
                url="http://trader.jettradefx.in/user-registration"
                title={`Join us with invite code: ${inviteCode}`}
                onClick={handleShareWhatsApp}
              >
                <WhatsappIcon
                  logoFillColor={"white"}
                  round={true}
                  onClick={handleShareWhatsApp}
                ></WhatsappIcon>
              </WhatsappShareButton>
              <FacebookShareButton
                url="http://trader.jettradefx.in/user-registration"
                quote={`Join us with invite code: ${inviteCode}`}
                onClick={handleShareFacebookApp}
              >
                <FacebookIcon
                  logoFillColor={"white"}
                  round={true}
                ></FacebookIcon>
              </FacebookShareButton>
              <TwitterShareButton
                url={"http://trader.jettradefx.in/user-registration"}
                title={`Join us with invite code: ${inviteCode}`}
                onClick={handleShareTwitter}
              >
                <TwitterIcon logoFillColor={"white"} round={true}></TwitterIcon>
              </TwitterShareButton>
              <InstapaperShareButton
                url={"http://trader.jettradefx.in/user-registration"}
                title={`Join us with invite code: ${inviteCode}`}
              >
                <InstapaperIcon
                  logoFillColor={"white"}
                  round={true}
                ></InstapaperIcon>
              </InstapaperShareButton>
              <EmailShareButton
                url="http://trader.jettradefx.in/user-registration"
                subject={`Join us with my referral link`}
                body={`Join us with invite code: ${inviteCode}`}
                onClick={handleShareEmail}
              >
                <EmailIcon logoFillColor={"white"} round={true}></EmailIcon>
              </EmailShareButton>
              <FaCopy
                onClick={handleCopyToClipboard}
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "20px",
                  cursor: "pointer",
                }}
              />
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};
export default InviteFriend;
