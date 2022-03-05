import { Box, Grid, Typography } from "@mui/material";
import React, { useContext } from "react";
import "../../App.css";
import UserContext from "../context";
export default function DashBoard() {
  const { user } = useContext(UserContext);
  console.log("user", user);
  return (
    <>
      <Box>
        <Grid container direction={"row"}>
          <Grid item border={"2px solid black"} flexGrow={1}>
            <Typography m={2} variant="h6" fontWeight={600}>
              User Profile DashBoard
            </Typography>
            <Box m={5}>
              <Box
                sx={{ height: 150, width: 150, flex: 1, borderRadius: 4 }}
                component={"img"}
                src="img/Profile_Image.png"
                alt="Profile Pic"
              />
              <Typography variant="h6" mt={2}>
                {user.email}
              </Typography>
            </Box>
          </Grid>
          <Grid item flexGrow={2}>
            <Typography m={2} variant="h6" fontWeight={600}>
              User Info Section:-
            </Typography>
            <Box m={5}>
              <Typography variant="h6">
                This feature will be added in next version
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
