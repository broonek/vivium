import { useState } from "react";
import pageLogo from "../assets/images/vivium-logo.png";
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Box,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../App.css";
import Modal from "../components/Modal";
import { schema } from "../assets/validationSchema/schema";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

interface IFormInput {
  email: string;
  password: string;
}

const SignIn = () => {
  const dispatch = useDispatch();
  const setAuth = () => {
    dispatch({ type: "setAuth" });
  };
  const navigate = useNavigate();
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const timeout = setTimeout(() => {
      fetch("http://localhost:8000/users")
        .then((res) => res.json())
        .then((data) => console.log(data));

      setAuth();
      reset();
      navigate("/");
      clearTimeout(timeout);
    }, 2000);
  };
  const isSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("sm")
  );
  const paperProps = isSmallScreen
    ? { variant: "elevation0" as "elevation" }
    : { variant: "outlined" as "outlined" };

  return (
    <>
      {errors.email?.message || errors.password?.message ? (
        <Modal
          show={true}
          severity="error"
          message={errors.email?.message || errors.password?.message}
        />
      ) : (
        <Modal
          show={false}
          severity="error"
          message={errors.email?.message || errors.password?.message}
        />
      )}

      <Grid
        height="100vh"
        container
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Paper
            {...paperProps}
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 1.5,
              px: 3,
              py: 3,
              minHeight: "50vh",
            }}
          >
            <Box
              component="img"
              src={pageLogo}
              sx={{
                width: "70%",
                objectFit: "contain",
              }}
            ></Box>
            <Typography
              variant="h3"
              sx={{
                flexBasis: "100%",
                fontSize: "1.4rem",
              }}
              align="center"
            >
              Sign in
            </Typography>
            <form className="SignIn_form" onSubmit={handleSubmit(onSubmit)}>
              <Controller
                defaultValue=""
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    // variant="h3"
                    error={Boolean(errors.email)}
                    fullWidth
                    id="email"
                    label="Email"
                    variant="standard"
                    {...field}
                    sx={{
                      my: 1.3,
                    }}
                  />
                )}
              />

              <Controller
                defaultValue=""
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    error={Boolean(errors.password)}
                    // size="medium"
                    fullWidth
                    type="password"
                    id="password"
                    label="Password"
                    variant="standard"
                    autoComplete="current-password"
                    {...field}
                    sx={{
                      my: 1.3,
                    }}
                  />
                )}
              />

              <Button
                type="submit"
                sx={{
                  p: 0.7,
                  my: 2,
                  lineHeight: 1.2,
                }}
                fullWidth
                color="basic"
                variant="contained"
              >
                Sign in
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default SignIn;
