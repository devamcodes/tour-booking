import React from "react";
import { Link } from "react-router-dom";
import { Buttons } from "./Buttons";
import "./Footer.css";
import { FaFacebookF, FaUserNinja } from "react-icons/fa";
import Grid from "@mui/material/Grid";

function Footer() {
  return (
    <Grid className="footer-container" container>
      <Grid className="footer-subscription" item direction={"column"}>
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
      </Grid>
      <Grid container spacing={2} style={{ marginLeft: "10rem" }}>
        <Grid
          className="footer-links"
          item
          container
          spacing={1}
          marginBottom="10px"
        >
          <div className="footer-link-warpper">
            <div className="footer-link-items">
              <h2>About Us</h2>
              <Link /* className="footer-link-items a" */ to="/sign-in">
                How it works
              </Link>
              <Link to="/sign-in">Testimonials</Link>
              <Link to="/sign-in">careers</Link>
            </div>
          </div>
        </Grid>
        <Grid className="social-media" item container spacing={3}>
          <div className="social-media-wrap">
            <Grid className="footer-logo" item>
              <Link to="/" className="social-logo">
                DAA{" "}
                <i className="fas fa-user-ninja">
                  <FaUserNinja />
                </i>
              </Link>
            </Grid>
            <Grid item className="website-rights">
              DAA © 2021
            </Grid>
            <Grid item className="social-icons">
              <Link
                to="/"
                target="_blank"
                arial-label="Facebook"
                className="social-icon-link facebook"
              >
                <FaFacebookF />
              </Link>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Footer;
