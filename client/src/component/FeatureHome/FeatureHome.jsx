import React from "react";
import "./FeatureHome.css";

const FeatureHome = () => {
  return (
    <div className="FeatureHomeSection">
      <div className="FeatureHomeSectionCtn">
        <div className="row">
          <div className="col-md-6">
            <div className="feature-img-container">
              <img src="/IMG/Home/collection.png" alt="" className="main-img" />
              <div className="split-images">
                <img src="/IMG/Home/Feature1.png" alt="" className="half-img" />
                <img src="/IMG/Home/fash.png" alt="" className="half-img" />
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <img src="/IMG/Home/Feature2.png" alt="" className="side-img1" />
          </div>
          <div className="col-md-3">
            <img src="/IMG/Home/Feature3.png" alt="" className="side-img" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureHome;
