import * as React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Typography, TextField, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { API_ROUTES } from "../../services/constants";
import axios from "axios";
import toast from "react-hot-toast";
const { PRIVATE_ROUTE } = API_ROUTES;
export default function BlogForm() {
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
  const handleState = () => {
    setValue("Title", "");
    setValue("Description", "");
  };
  const handleSubmitButton = async (data) => {
    try {
      const response = await axios.post(
        `https://tour-booking-website.herokuapp.com/api/${PRIVATE_ROUTE?.CREATE_NEW_BLOG}`,
        data
      );
      if (!response.success) {
        console.log(response.data.message);
      }
      toast.success(response.data.message);
      handleState();
    } catch (err) {
      toast.error(err.response.data.message);
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
          Create New Blog About Our Site
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
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
