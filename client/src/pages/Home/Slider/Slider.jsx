import React from "react";
import "./Slider.css";
import Slider from "react-slick";
const HomeSlider = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <section className="homeSlider w-100">
      <div className="container-fluid w-100">
        <Slider {...settings}>
          <div className="item ">
            <img src="/IMG/Home/Slider1.png" alt="" />
          </div>
          <div className="item">
            <img src="/IMG/Home/Slider2.png" alt="" />
          </div>
          <div className="item">
            <img src="/IMG/Home/Slider3.png" alt="" />
          </div>
          <div className="item">
            <img src="/IMG/Home/Slider4.png" alt="" />
          </div>
        </Slider>
      </div>
    </section>
  );
};

export default HomeSlider;
