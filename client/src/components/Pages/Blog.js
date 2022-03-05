import { Box, Button, Typography, Paper } from "@mui/material";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import UserContext from "../context";
import { API_ROUTES } from "../../services/constants";
import axios from "axios";
import toast from "react-hot-toast";
const { PRIVATE_ROUTE } = API_ROUTES;

export default function Blog() {
  const { user } = useContext(UserContext);
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  const GetAllBlogs = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/${PRIVATE_ROUTE.GET_ALL_BLOGS}`
      );
      setBlogs(data.data);
      // console.log("blogs", data.data);
    } catch (err) {
      console.log("err.response.data.message", err.response.data.message);
    }
  }, []);
  useEffect(() => {
    GetAllBlogs();
  }, [GetAllBlogs]);

  const handleNewBlog = () => {
    const auth = user.isLogged;
    if (auth) {
      console.log("Redirecting to New Blog Form");
      navigate("/new-blog");
    } else {
      toast.error("You are not Authorised... Try Loging In again");
      navigate("/sign-in");
    }
  };
  // blogs.map((item) => console.log(item.Title));
  return (
    <>
      <Box m={5} p={5}>
        <Button
          variant="contained"
          color="primary"
          style={{
            textAlign: "right",
            justifyContent: "right",
            marginLeft: "15px",
          }}
          onClick={handleNewBlog}
        >
          New Blog
        </Button>
        <Box>
          <Typography
            variant="h4"
            style={{ color: "black", margin: "10px 15px" }}
          >
            Blogs
          </Typography>
          {blogs.length === 0 ? (
            <Paper
              style={{
                margin: "10px",
                display: "flex",
                flexDirection: "column",
                padding: "10px",
                textAlign: "center",
              }}
              elevation={6}
            >
              <Typography variant="h6">No Data Found</Typography>
            </Paper>
          ) : (
            blogs.map((item) => (
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  marginLeft: "10px",
                }}
              >
                <Paper
                  style={{
                    margin: "10px",
                    display: "flex",
                    flexDirection: "column",
                    padding: "10px",
                  }}
                  elevation={6}
                >
                  <Typography variant="h6">{item.Title}</Typography>
                  {item.Description}
                </Paper>
              </Box>
            ))
          )}
        </Box>
      </Box>
    </>
  );
}
