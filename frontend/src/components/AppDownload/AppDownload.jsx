import React from "react";
import "./AppDownload.css";
import playStoreLogo from "../../assets/download-google-play.png";
import appStoreLogo from "../../assets/download-app-store.png";
const AppDownload = () => {
  return (
    <div className="app-download" id="app-download">
      <p>
        For better experience Download <br /> Oregano App
      </p>
      <div className="app-download-platforms">
        <img src={playStoreLogo} alt="" />
        <img src={appStoreLogo} alt="" />
      </div>
    </div>
  );
};

export default AppDownload;
