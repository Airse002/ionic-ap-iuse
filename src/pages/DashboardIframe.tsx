// DashboardIframe.js
import React from 'react';
import './DashboardIframe.css'; // Make sure the CSS file is in the same directory

const DashboardIframe = () => {
  return (
    <div className="iframe-container">
      <iframe
        className="responsive-iframe"
        src="https://rss.app/embed/v1/list/trm4QTTl8rN509nE"   //https://dashboard.satnogs.org/goto/zWeN2S5Ik //https://elfsight.com/youtube-channel-plugin-yottie/iframe/
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default DashboardIframe;
