import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Footer from "../Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function Register() {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    dateOfBirth: new Date().toDateString(),
    bloodGroup: "",
    address: "",
  });
  const history = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-console
    const data = await axios.post(
      "https://tour-booking-website.herokuapp.com/user/new-user",
      newUser
    );
    console.log(data);
    history("/");
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setNewUser((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={3}
          md={6}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={9} md={6} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 6,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Create New Account
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required={true}
                fullWidth
                id="name"
                label="User Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={newUser.name}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required={true}
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={newUser.email}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required={true}
                fullWidth
                // type="date"
                id="dateOfBirth"
                label="Date Of Birth"
                name="dateOfBirth"
                autoComplete="dateOfBirth"
                value={newUser.dateOfBirth}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required={true}
                fullWidth
                id="bloodGroup"
                label="Blood Group"
                name="bloodGroup"
                autoComplete="bloodGroup"
                value={newUser.bloodGroup}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required={true}
                fullWidth
                id="address"
                label="Address"
                name="address"
                autoComplete="address"
                value={newUser.address}
                onChange={handleChange}
              />
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

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
              >
                Create Account
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
