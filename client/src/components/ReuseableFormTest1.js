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
/* import UserContext from "../context";
import { useNavigate } from "react-router-dom"; */
/* import Cookies from "universal-cookie";*/
import PersonTwoToneIcon from "@mui/icons-material/PersonTwoTone";
const theme = createTheme();

function ReuseableFormTest1(title) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Grid container component="main" sx={{ height: "100%" }}>
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
                  <>
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                      <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                      {title}
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
                        // value={userLog.email}
                        // onChange={handleChange}
                      />
                      <TextField
                        margin="normal"
                        required={true}
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        // value={userLog.password}
                        autoComplete="current-password"
                        // onChange={handleChange}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            value="remember"
                            color="primary"
                            // onClick={handleRememberMe}
                          />
                        }
                        label="Remember me"
                      />
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        // onClick={handleSubmit}
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
                    </Box>
                  </>
                </Box>
              </Grid>
            </>
          </>
        </Grid>
      </ThemeProvider>
    </>
  );
}

export default ReuseableFormTest1;
