import React from "react";
const loadingImg = `${process.env.PUBLIC_URL}/loading.svg`;

const Loading = () => (
  <div style={{ position: 'absolute', display: 'flex', justifyContent: 'centre', height: '100vh', width: '100vh', top: 0, bottom: 0, left: 0, right: 0 , margin: "0 auto"}} >
    <img src={loadingImg} alt="Loading..." />
  </div>
);

export default Loading;
