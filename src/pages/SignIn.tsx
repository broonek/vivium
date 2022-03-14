import { useState, useEffect } from "react";
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
import checkSignInData from "../components/checkSignInData";

interface IFormInput {
  email: string;
  password: string;
}
interface ISignIn {
  isError: boolean;
  message: string | undefined;
}

const SignIn = () => {
  const [isError, setIsError] = useState<ISignIn>({
    isError: false,
    message: "",
  });
  const [isFormDisabled, setIsFormDisabled] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    if (Object.keys(errors).length !== 0) {
      setIsError((prevState) => ({
        ...prevState,
        message: errors.email?.message || errors.password?.message,
        isError: true,
      }));
    } else {
      return;
    }
  }, [errors]);
  const setAuth = () => {
    dispatch({ type: "setAuth" });
  };
  const clearAllErrors = () => {
    clearErrors();
    setIsError((prevState) => ({
      ...prevState,
      isError: false,
    }));
  };
  const onSubmit: SubmitHandler<IFormInput> = (userInput) => {
    setIsError((prevState) => ({
      ...prevState,
      isError: false,
    }));
    setIsFormDisabled(true);

    //fake timeout to simulate fetch data
    setTimeout(() => {
      fetch("http://localhost:8000/users")
        .then((res) => res.json())
        .then((data) =>
          checkSignInData({
            email: data.email,
            password: data.password,
            userInputEmail: userInput.email,
            userInputPassword: userInput.password,
          })
        )
        .then((data) => {
          if (data) {
            setAuth();
            reset();
            navigate("/");
          } else {
            setIsFormDisabled(false);
            setIsError({
              isError: true,
              message: "User not found",
            });
            return;
          }
        })
        .catch((err) => {
          setIsFormDisabled(false);
          setIsError({
            isError: true,
            message: "Something went wrong",
          });
          return;
        });
      setIsFormDisabled(false);
    }, 2000);
  };
  const isSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("sm")
  );
  const paperProps = isSmallScreen
    ? { variant: "elevation0" as "elevation" }
    : { variant: "outlined" as "outlined" };
  const modalError = (
    <Modal
      show={isError.isError}
      severity="error"
      message={isError.message}
      onClose={() => {
        clearAllErrors();
      }}
    />
  );
  return (
    <>
      {modalError}
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
                    disabled={isFormDisabled}
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
                    disabled={isFormDisabled}
                    error={Boolean(errors.password)}
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
                disabled={isFormDisabled}
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
