// import React from "react";
import ReactDOM from "react-dom";
import { Alert, Snackbar } from "@mui/material";
import { FieldError } from "react-hook-form";

type Props = {
  show: boolean;
  severity: "error" | "success" | "info" | "warning" | undefined;
  message: string | undefined;
};

const Modal: React.FC<Props> = ({ show, severity, message }) => {
  return ReactDOM.createPortal(
    <>
      <Snackbar
        open={show}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Alert elevation={6} variant="filled" severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </>,
    document.getElementById("modal") as HTMLFormElement
  );
};

export default Modal;
