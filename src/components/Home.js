import React from "react";
import "../css/Home.css";
import { NavLink } from "react-router-dom";
import ForexTricker from "./ForexTricker";

function Home() {
  return (
    <>
      <div className="home_container">
        <div className="home_heading1">
          {/* <MoveStuffAround/> */}
          <div className="forex-ticker d-block">
            <p>
              ETHUSDT see forex chart{" "}
              <NavLink to={"/chart"} target="_blank">
                View
              </NavLink>
            </p>
            {/* <marquee behavior="" direction=""><img src={forexChart} alt="" width={300} height={40}/></marquee> */}
            <marquee behavior="" direction="">
              <ForexTricker />
            </marquee>
          </div>
          WELCOME TO
          <p>JETTRADE FX</p>
          <div className="jettrade">
            <p>ADVANCE & SMART FOREX TRADING PLATFORM</p>
          </div>
          <div className="home-footer">
            <p>PARTNER WITH CENTUM WORLD</p>
          </div>
          <div className="imagecontainer">
            <div className="trader-div">
              <a href="http://trader.jettradefx.in/user-login" className="trader-link">
                <img
                  src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngall.com%2Fwp-content%2Fuploads%2F5%2FProfile-Avatar-PNG.png&f=1&nofb=1&ipt=898df0dc90c94146f53f56bcfb8bd89443003c32348a2586945b44e27fc0f051&ipo=images"
                  className="trader-img"
                  height={50}
                  width={50}
                />
                <div>
                  <span className="trader">I am a Trader</span>
                </div>
              </a>
            </div>

            <div className="trader-div">
              <a href="http://refferal.jettradefx.in/member-login" className="trader-link">
                <img
                  src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.theventuretours.com%2Fwp-content%2Fuploads%2F2020%2F03%2Favatar-icon-png-1-1024x1024.png&f=1&nofb=1&ipt=27488ea40ec7c6393731fb14d125744674216f24dd8b0e490354f6f905a2fa00&ipo=images"
                  className="trader-img"
                  height={50}
                  width={50}
                />
                <div>
                  <span className="trader">I am a Refferal</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
