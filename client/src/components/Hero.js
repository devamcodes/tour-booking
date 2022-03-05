import React from "react";
// import "../App.css";
import "./Hero.css";
import { Buttons } from "./Buttons";
import { FaPlayCircle } from "react-icons/fa";
import { Parallax } from "react-parallax";
function Hero() {
  const image1 =
    "https://img.traveltriangle.com/blog/wp-content/tr:w-700,h-400/uploads/2017/08/Parvati-Valley.jpg";
  return (
    <>
      <Parallax
        bgImage={image1}
        strength={500}
        blur={{ min: -4, max: 5 }}
        className="hero-container"
      >
        <h1 className="hero-container-heading">ADVENTURE AWAITS</h1>
        <p className="hero-container-para">What are you waiting for?</p>
        <Buttons
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
        >
          GET STARTED !!!
        </Buttons>
        <Buttons
          className="btns"
          buttonStyle="btn--primary"
          buttonSize="btn--large"
        >
          WATCH TRAILER
          <i className="far fa-play-circle">
            <FaPlayCircle />
          </i>
        </Buttons>
      </Parallax>
    </>
  );
}

export default Hero;
