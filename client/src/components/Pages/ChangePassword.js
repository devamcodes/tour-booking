import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function ChangePassword() {
  //   const { setUser } = useContext(UserContext);
  const [newUser, setNewUser] = useState({
    id: "",
    email: "",
    found: false,
    password: "",
    confirmPassword: "",
  });
  const emailFormat = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
  let history = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!newUser.found) {
      if (newUser.email.match(emailFormat)) {
        //this step can be removed by joi
        const { data } = await axios.post(
          "https://evening-retreat-75152.herokuapp.com/api/user/check-user",
          newUser
        );

        if (data.id) {
          setNewUser((prevState) => ({
            ...prevState,
            id: data.id,
            found: true,
          }));
        } else {
          toast.error("some error occurred try again");
        }
      } else {
        toast.error("email format is invalid");
      }
    } else if (newUser.id) {
      //this step can be removed by joi
      if (newUser.password === newUser.confirmPassword) {
        try {
          const { data } = await axios.put(
            `https://evening-retreat-75152.herokuapp.com/user/${newUser.id}`,
            newUser
          );
          console.log(`data`, data);
          if (data.success) {
            history("/sign-in");
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          // console.log(error);
          toast.error(error.response.data.message);
        }
      } else {
        toast.error("Passwords do not match ");
      }
    } else {
      toast.error("please try again after some time...");
      history("/sign-in");
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Change Password
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required={true}
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={newUser.email}
            onChange={handleChange}
          />
          {newUser.found ? (
            <>
              <TextField
                margin="normal"
                required={true}
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={newUser.password}
                autoComplete="current-password"
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required={true}
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="password"
                value={newUser.confirmPassword}
                autoComplete="current-password"
                onChange={handleChange}
              />
            </>
          ) : null}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            {newUser.found ? <>ChangePassword</> : <>Check Email</>}
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default React.memo(ChangePassword);
