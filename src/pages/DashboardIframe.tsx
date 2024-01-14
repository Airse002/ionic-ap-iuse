// DashboardIframe.js
import React from 'react';
import './DashboardIframe.css'; // Make sure the CSS file is in the same directory

const DashboardIframe = () => {
  return (
    <div className="iframe-container">
      <iframe
        className="responsive-iframe"
        src="https://elfsight.com/google-maps-widget/iframe/"   //https://dashboard.satnogs.org/goto/zWeN2S5Ik
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default DashboardIframe;
