import React, { useEffect } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Typography, TextField, Grid, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { API_ROUTES } from "../../services/constants";
// import axios from "axios";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { createOrEditBlog } from "../../services/blog.service";
const { PRIVATE_ROUTE } = API_ROUTES;
export default function BlogForm() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    defaultValues: {
      Title: "",
      Description: "",
    },
  });
  useEffect(() => {
    setValue("Title", state ? state?.data?.Title : "");
    setValue("Description", state ? state?.data?.Description : "");
  }, [setValue, state]);

  const METHOD = state?.status
    ? PRIVATE_ROUTE?.EDIT_BLOG
    : PRIVATE_ROUTE?.CREATE_NEW_BLOG;
  const handleState = () => {
    setValue("Title", "");
    setValue("Description", "");
  };
  const handleSubmitButton = async (dat) => {
    try {
      const { data } = await createOrEditBlog(METHOD, dat, state?.data?._id);
      // console.log("response", data);
      if (!data.success) {
        toast.error(data.message);
      }
      toast.success(data.message);
      handleState();
      navigate("/Blog");
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };
  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit(handleSubmitButton)}
    >
      <Box m={5} border={"2px solid black"} p={8} borderRadius={4}>
        <Typography variant="h4" gutterBottom>
          {state?.data?._id ? "Edit Blog" : "Create New Blog About Our Site"}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              defaultValue={state ? state?.data.Title : ""}
              {...register("Title", {
                required: "This field is required",
                min: 4,
                pattern: {
                  value: /^[A-Za-z]/,
                  message: "invalid input type",
                },
              })}
              label="Blog Title"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              error={Boolean(errors.Title)}
              helperText={errors.Title?.message}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register("Description", {
                required: "This field is required",
                min: 4,
              })}
              label="Description"
              fullWidth
              variant="standard"
              error={Boolean(errors.Description)}
              helperText={errors.Description?.message}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField disabled label="Images" variant="standard" />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="error"
          style={{ float: "right", margin: "6px" }}
          onClick={() => {
            handleState();
            navigate("/Blog");
          }}
        >
          Cancel
        </Button>
        <LoadingButton
          variant="contained"
          // color="primary"
          loading={isSubmitting}
          style={{ float: "right", margin: "6px" }}
          type="submit"
        >
          Submit
        </LoadingButton>
      </Box>
    </form>
  );
}
