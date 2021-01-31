import React from "react";
const loadingImg = `${process.env.PUBLIC_URL}/loading.svg`;

const LoadingSmall = () => (
  <>
    <div className="row justify-content-center" >
      <img src={loadingImg} alt="Loading..." />
    </div>
    <div className="row justify-content-center" >

      <h3>Loading...</h3>
    </div>
  </>
);

export default LoadingSmall;
