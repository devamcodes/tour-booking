import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Register.css";
import axios from "axios";

function Register1() {
  const [newUser, setNewUser] = useState({
    username: "",
    gender: "",
    email: "",
    password: "",
    mobile: "",
    dateOfBirth: "",
    bloodgrp: "AB",
  });
  const emailFormat = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
  let history = useNavigate();

  const HandleSubmit = async (event) => {
    event.preventDefault();
    if (newUser.email.match(emailFormat)) {
      if (
        newUser.username.length >= 3 &&
        newUser.username.match(/^[a-zA-Z]+$/)
      ) {
        if (newUser.mobile.length === 10) {
          if (newUser.password.length >= 6) {
            try {
              const { data } = await axios.post(
                "http://localhost:7000/user/new-user",
                newUser
              );
              // toast.success(data.message);
              console.log(data);
              console.log(`newUser`, newUser);
              history("/");
            } catch (err) {
              console.log(err);
              // toast.error(err.response.data.message);
            }
          } else {
            if (newUser.password.length < 6) {
              // toast.error("Password must be of atleast 6 character");
            } /* toast.error("Password is invalid. Please try again"); */ else
              alert("password is invalid.");
          }
        } else {
          if (newUser.mobile.length < 6) {
            // toast.error("Mobile Number must be of 10 digits");
          } /* toast.error("Mobile Number is invalid. Please try again"); */ else
            alert("Mobile number is invalid");
        }
      } else {
        if (newUser.username.length < 3) {
          // toast.error("User Name must be of atleast 3 character");
        } /* toast.error("User Name is invalid. Please try again"); */ else
          alert("User name is invalid");
      }
    } else {
      // toast.error("email format is invalid");
    }
  };
  const handleNewUser = (event) => {
    const { name, value } = event.target;
    setNewUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      {/* <Toaster position="top-right" /> */}
      <h2 className="title">Registration Form</h2>
      <form onSubmit={HandleSubmit} action="">
        <div className="row">
          <div className="col-25">
            <label
              htmlFor="fname"
              style={{ fontSize: "20px", marginTop: "16px" }}
            >
              Email
            </label>
          </div>
          <div className="col-75">
            <input
              type="email"
              id="email"
              className="name"
              value={newUser.email}
              onChange={handleNewUser}
              name="email"
              placeholder="Your email..."
              style={{
                boxSizing: "border-box",
                fontSize: "18px",
                marginTop: "14px",
              }}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label
              htmlFor="name"
              style={{ fontSize: "20px", marginTop: "16px" }}
            >
              User Name
            </label>
          </div>
          <div className="col-75">
            <input
              type="text"
              id="name"
              className="name"
              value={newUser.username}
              onChange={handleNewUser}
              name="username"
              placeholder="Your username.."
              // autoComplete="username"
              style={{
                boxSizing: "border-box",
                fontSize: "18px",
                marginTop: "14px",
              }}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label
              htmlFor="mobile"
              style={{ fontSize: "20px", marginTop: "16px" }}
            >
              Mobile
            </label>
          </div>
          <div className="col-75">
            <input
              type="tel"
              id="lname"
              className="name"
              value={newUser.mobile}
              onChange={handleNewUser}
              name="mobile"
              style={{
                boxSizing: "border-box",
                fontSize: "18px",
                marginTop: "20px",
              }}
              placeholder="Your Mobile Number.."
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label
              htmlFor="password"
              style={{ fontSize: "20px", marginTop: "16px" }}
            >
              Password
            </label>
          </div>
          <div className="col-75">
            <input
              type="password"
              id="password"
              className="name"
              value={newUser.password}
              onChange={handleNewUser}
              name="password"
              placeholder="Your password..."
              // autoComplete="current-password"
              style={{
                boxSizing: "border-box",
                fontSize: "18px",
                marginTop: "14px",
              }}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label
              htmlFor="dateOfBirth"
              style={{ fontSize: "20px", marginTop: "16px" }}
            >
              Date Of Birth
            </label>
          </div>
          <div className="col-75">
            <input
              type="date"
              id="dateOfBirth"
              className="name"
              value={newUser.dateOfBirth}
              onChange={handleNewUser}
              name="dateOfBirth"
              placeholder="Your Date Of Birth..."
              style={{
                boxSizing: "border-box",
                fontSize: "18px",
                marginTop: "14px",
              }}
              required
            />
          </div>
        </div>
        <div
          className="row"
          style={{
            fontSize: "20px",
            marginTop: "20px",
          }}
        >
          <div className="col-25">
            <label
              htmlFor="gender"
              style={{ fontSize: "20px", marginTop: "16px" }}
            >
              Gender
            </label>
          </div>
          <div className="col-75">
            <div style={{ float: "left" }}>
              <label>Male</label>
              <input
                type="radio"
                value="male"
                name="gender"
                onClick={handleNewUser}
              />
            </div>
            <div style={{ float: "left", marginLeft: "30px" }}>
              <label>Female</label>
              <input
                type="radio"
                value="female"
                name="gender"
                onClick={handleNewUser}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <button type="submit" value="Submit" className="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default React.memo(Register1);
