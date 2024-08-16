import React from "react";
import "./Footer.css";
import logo from "../../assets/logo.png";
import { CiFacebook } from "react-icons/ci";
import { TiSocialTwitterCircular } from "react-icons/ti";
import { TiSocialLinkedinCircular } from "react-icons/ti";
const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={logo} alt="" />
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad quidem
            ipsam nisi omnis magnam sit ullam exercitationem sunt vel laborum,
            voluptatem laboriosam quas porro nostrum perspiciatis voluptatum
            beatae minima deleniti.
          </p>
          <div className="footer-social-icons">
            <CiFacebook style={{ fontSize: 38, marginRight: 15 }} />
            <TiSocialTwitterCircular
              style={{ fontSize: 45, marginRight: 15 }}
            />
            <TiSocialLinkedinCircular
              style={{ fontSize: 45, marginRight: 15 }}
            />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+233 513 777 3214</li>
            <li>contact@oregano.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024 &copy; Oregano.com All Rights Reserved
      </p>
    </div>
  );
};

export default Footer;
