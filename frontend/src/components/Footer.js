import React from "react";
import { Link } from "react-router-dom";
import { Buttons } from "./Buttons";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer-container">
      <section className="footer-subscription">
        <p className="footer-subscription-heading">
          Join the Adventure newsletter to receive our best vacation deals.
        </p>
        <p className="footer-subscription-text">
          You can unsubscribe at any time.
        </p>
        <div className="input-areas">
          <form>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="footer-input"
            />
            <Buttons buttonStyle="btn--outline">Subscibe</Buttons>
          </form>
        </div>
      </section>
      <div className="footer-links">
        <div className="footer-link-warpper">
          <div className="footer-link-items">
            <h2>About Us</h2>
            <Link to="/sign-up">How it works</Link>
            <Link to="/sign-up">Testimonials</Link>
            <Link to="/sign-up">careers</Link>
          </div>
        </div>
      </div>
      <section className="social-media">
        <div className="social-media-wrap">
          <div className="footer-logo">
            <Link to="/" className="social-logo">
              DAA <i className="fas fa-user-ninja"></i>
            </Link>
          </div>
          <small className="website-rights">DAA © 2021</small>
          <div className="social-icons">
            <Link
              to="/"
              target="_blank"
              arial-label="Facebook"
              className="social-icon-link facebook"
            >
              <i className="fab fa-facebook-f" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
