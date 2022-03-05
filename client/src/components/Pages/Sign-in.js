import React, { useState, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import LoadingButton from "@mui/lab/LoadingButton";
import { CssBaseline, Button } from "@mui/material";
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
import PersonTwoToneIcon from "@mui/icons-material/PersonTwoTone";
import toast from "react-hot-toast";

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
    storeUser: false,
    isLoading: false,
  });
  const history = useNavigate();

  const storedUser = {
    email: localStorage.getItem("email") ? localStorage.getItem("email") : null,
    password: localStorage.getItem("password")
      ? localStorage.getItem("password")
      : null,
  };

  const handleSubmit = async (event) => {
    const userData = userLog.email && userLog.password ? userLog : storedUser;
    event.preventDefault();
    if (!user.isLogged) {
      if (userData.email) {
        try {
          setUserLog((prevState) => ({ ...prevState, isLoading: true }));
          const { data } = await axios.post(
            "https://tour-booking-website.herokuapp.com/api/user/login",
            userData
          );
          if (data.success) {
            setUserLog((prevState) => ({
              ...prevState,
              isLoading: false,
            }));

            toast.success(data.message);
            setUser((prevState) => ({
              ...prevState,
              email: userData.email,
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

            toast.error("some error", data.message);
          }
        } catch (error) {
          toast.error(error.response.data.message);
          setUserLog((prevState) => ({
            ...prevState,
            isLoading: false,
          }));
        }
      } else {
        toast.error("These fields are mandatory");
      }
    } else {
      cookies.remove("token");
      setUser((prevState) => ({
        ...prevState,
        isLogged: !user.isLogged,
      }));
      toast.success("Logged out");
    }
  };
  const handleRememberMe = (event) => {
    setUserLog((prevState) => ({
      ...prevState,
      storeUser: event.target.checked
        ? event.target.checked
        : !userLog.storeUser,
    }));
  };
  if (userLog.storeUser) {
    if (user.isLogged) {
      localStorage.setItem("email", userLog.email);
      localStorage.setItem("password", userLog.password);
    } else {
      localStorage.removeItem("email");
      localStorage.removeItem("password");
    }
  }

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setUserLog((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleForget = () => {
    toast.success("Account Forget Success");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Grid container component="main" sx={{ height: "100%" }}>
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
                          variant="outlined"
                          style={{ marginTop: "10px" }}
                          color="error"
                          onClick={handleForget}
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
                      {storedUser.email && storedUser.password ? (
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
                            <LoadingButton
                              loadingIndicator="Loading..."
                              loading={userLog.isLoading}
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
                            </LoadingButton>
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
                        <LoadingButton
                          loadingIndicator="Loading..."
                          loading={userLog.isLoading}
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                          onClick={handleSubmit}
                        >
                          Sign In
                        </LoadingButton>
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
        </Grid>
      </ThemeProvider>
    </>
  );
}
