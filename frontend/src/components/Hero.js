import React from "react";
import "../App.css";
import "./Hero.css";
import { Buttons } from "./Buttons";

function Hero() {
  return (
    <div className="hero-container">
      {/* <video sc="/assets/video-2.mp4" autoPlay loop muted />s */}
      <h1>ADVENTURE AWAITS</h1>
      <p>What are you waiting for?</p>
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
        <i className="far fa-play-circle" />
      </Buttons>
    </div>
  );
}

export default Hero;
