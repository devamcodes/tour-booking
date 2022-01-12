import React, { useState, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import UserContext from "../context";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import Cookies from "universal-cookie";
import CircularProgress from "@mui/material/CircularProgress";
import PersonTwoToneIcon from "@mui/icons-material/PersonTwoTone";

const cookies = new Cookies();

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https:website-six-ashy.vercel.app">
        The Adventure Awaits
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const { user, setUser } = useContext(UserContext);
  const [userLog, setUserLog] = useState({
    email: "",
    password: "",
    isLoading: false,
  });
  const history = useNavigate();

  const storedUser = {
    email: localStorage.getItem("email") ? localStorage.getItem("email") : "",
    password: localStorage.getItem("password")
      ? localStorage.getItem("password")
      : "",
  };

  const handleSubmit = async (event) => {
    const userData = userLog.email ? userLog : storedUser;

    event.preventDefault();
    if (!user.isLogged) {
      if (userLog.email || storedUser.email) {
        setUserLog((prevState) => ({ ...prevState, isLoading: true }));
        const { data } = await axios.post(
          "https://tour-booking-website.herokuapp.com/user",
          userData
        );
        console.log(`data`, Response, data.message);
        try {
          if (data.success) {
            setUserLog((prevState) => ({
              ...prevState,
              isLoading: false,
            }));

            alert("sccessful");
            setUser((prevState) => ({
              ...prevState,
              isLogged: !user.isLogged,
            }));
            cookies.remove("token");
            cookies.set("token", data.token);
            history("/dash-board");
          } else {
            setUserLog((prevState) => ({
              ...prevState,
              isLoading: false,
            }));

            alert("some error", data.message);
          }
        } catch (error) {
          console.log(`error`, error);
        }
      } else {
        alert("These fields are mandatory");
      }
    } else {
      cookies.remove("token");
      setUser((prevState) => ({
        ...prevState,
        isLogged: !user.isLogged,
      }));
      alert("Logged out");
    }
  };
  const handleRememberMe = (event) => {
    if (event.target.checked) {
      if (!user.isLogged) {
        localStorage.setItem("email", userLog.email);
        localStorage.setItem("password", userLog.password);
      } else if (user.isLogged) {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
      }
    } else {
      localStorage.clear();
    }
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setUserLog((prevState) => ({ ...prevState, [name]: value }));
  };

  // const storedUser = localStorage.getItem("user");

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Grid container component="main" sx={{ height: "100%" }}>
          {userLog.isLoading ? (
            <>
              <CircularProgress color="primary" />
              <Typography>Loading...</Typography>
            </>
          ) : (
            <>
              {user.isLogged ? (
                <>
                  <Grid
                    item
                    xs={17}
                    sm={14}
                    md={11}
                    m={10}
                    component={Paper}
                    elevation={6}
                    square
                  >
                    <Box
                      sx={{
                        my: 8,
                        mx: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                      </Avatar>
                      <Typography component="h1" variant="h5">
                        Sign Out
                      </Typography>
                      <Box component="form" noValidate sx={{ mt: 1 }}>
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          color="secondary"
                          sx={{ mt: 3, mb: 2 }}
                          onClick={handleSubmit}
                        >
                          Sign Out
                        </Button>
                      </Box>
                      <Divider
                        style={{
                          border: "1px solid black",
                          width: "80%",
                          borderRadius: "50%",
                          marginBottom: "10px",
                        }}
                      />
                      {localStorage.getItem("email") ? (
                        <>
                          <Divider />
                          <Button
                            // variant="contained"
                            style={{ marginTop: "10px" }}
                            color="success"
                            onClick={handleRememberMe}
                          >
                            Forget Account
                          </Button>
                        </>
                      ) : null}
                    </Box>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid
                    item
                    xs={false}
                    sm={3}
                    md={6}
                    sx={{
                      backgroundImage:
                        "url(https://source.unsplash.com/random)",
                      backgroundRepeat: "no-repeat",
                      backgroundColor: (t) =>
                        t.palette.mode === "light"
                          ? t.palette.grey[50]
                          : t.palette.grey[900],
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <>
                    <Grid
                      item
                      xs={12}
                      sm={9}
                      md={6}
                      component={Paper}
                      elevation={6}
                      square
                    >
                      <Box
                        sx={{
                          my: 8,
                          mx: 4,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        {localStorage.getItem("email") &&
                        localStorage.getItem("password") &&
                        !user.isLogged ? (
                          <>
                            <Box
                              sx={{
                                marginTop: 8,
                                // background:""
                                marginBottom: 4,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                border: "2px solid grey",
                                borderRadius: "55px",
                                boxShadow: "inset 2px 2px grey ",
                                width: "fit-content",
                              }}
                            >
                              {/* <Grid container direction="row" alignContent="center"> */}
                              <Button
                                style={{ color: "grey", width: "fit-content" }}
                                onClick={handleSubmit}
                              >
                                <Grid item>
                                  <Avatar
                                    sx={{ m: 1, bgcolor: "secondary.main" }}
                                  >
                                    <PersonTwoToneIcon />
                                  </Avatar>
                                </Grid>
                                <Grid item>
                                  <Typography
                                    component="h1"
                                    variant="h5"
                                    style={{ fontFamily: "cursive" }}
                                  >
                                    {localStorage.getItem("email")}
                                  </Typography>
                                </Grid>
                              </Button>
                            </Box>
                            OR
                          </>
                        ) : null}
                        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                          <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                          Sign in
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
                            value={userLog.email}
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
                            value={userLog.password}
                            autoComplete="current-password"
                            onChange={handleChange}
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                value="remember"
                                color="primary"
                                onClick={handleRememberMe}
                              />
                            }
                            label="Remember me"
                          />
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleSubmit}
                          >
                            Sign In
                          </Button>
                          <Grid container>
                            <Grid item xs>
                              <Link href="/change-password" variant="body2">
                                Forgot password?
                              </Link>
                            </Grid>
                            <Grid item>
                              <Link href="/register" variant="body2">
                                {"Don't have an account? Sign Up"}
                              </Link>
                            </Grid>
                          </Grid>
                          <Copyright sx={{ mt: 5 }} />
                        </Box>
                      </Box>
                    </Grid>
                  </>
                </>
              )}
            </>
          )}
        </Grid>
      </ThemeProvider>
    </>
  );
}
