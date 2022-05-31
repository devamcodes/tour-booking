import {
  Box,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Grid,
} from "@mui/material";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import UserContext from "../context";
import toast from "react-hot-toast";
import LoadingButton from "@mui/lab/LoadingButton";
import { deleteBlogs, getBlogs } from "../../services/blog.service";

export default function Blog() {
  const { user } = useContext(UserContext);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const GetAllBlogs = useCallback(async () => {
    try {
      setLoading((prev) => !prev);
      const { data } = await getBlogs();
      setLoading((prev) => !prev);
      setBlogs(data?.data);
    } catch (err) {
      setLoading(false);
      // console.log("err.response.data.message", err.message);
    }
  }, []);
  useEffect(() => {
    GetAllBlogs();
  }, [GetAllBlogs]);

  const handleNewBlog = () => {
    const auth = user.isLogged;
    if (auth) {
      // console.log("Redirecting to New Blog Form");
      navigate("/new-blog");
    } else {
      toast.error("You are not Authorised... Try Loging In again");
      navigate("/sign-in");
    }
  };
  const deleteBlogHandler = async (id) => {
    try {
      // setBlogs(blogs.map((blog) => blog._id !== id));
      const { data } = await deleteBlogs(id);
      GetAllBlogs();
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <Box m={5} p={5}>
        <Button
          variant="contained"
          color="secondary"
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
          {loading ? (
            <Paper
              style={{
                margin: "10px",
                display: "flex",
                flexDirection: "column",
                padding: "10px",
                alignItems: "center",
              }}
              elevation={6}
            >
              <CircularProgress />
            </Paper>
          ) : blogs.length === 0 ? (
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
                key={item.id}
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
                  <Grid container>
                    <Grid item flexGrow={2}>
                      <Typography variant="h6">{item.Title}</Typography>
                      {item.Description}
                    </Grid>
                    <Grid item>
                      <Button
                        variant="outlined"
                        color="primary"
                        sx={{ m: "10px 0px" }}
                        onClick={() =>
                          navigate("/new-blog", {
                            state: { data: item, status: "edit" },
                          })
                        }
                      >
                        Update
                      </Button>
                    </Grid>
                  </Grid>

                  <LoadingButton
                    color="error"
                    variant="outlined"
                    onClick={() => deleteBlogHandler(item._id)}
                  >
                    Delete
                  </LoadingButton>
                </Paper>
              </Box>
            ))
          )}
        </Box>
      </Box>
    </>
  );
}
