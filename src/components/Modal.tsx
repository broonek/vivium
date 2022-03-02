// import React from "react";
import ReactDOM from "react-dom";
import { Alert, Snackbar } from "@mui/material";
import { FieldError } from "react-hook-form";

type Props = {
  show: boolean;
  severity: "error" | "success" | "info" | "warning" | undefined;
  message: string | undefined;
  isLoading: boolean;
};

const Modal: React.FC<Props> = ({ show, severity, message, isLoading }) => {
  //   const handleCloseSnackBar = (event, reason) => {
  //     if (reason === "close") {
  //       props.setModal({
  //         ...isModal,
  //         show: false,
  //       });
  //       return;
  //     } else if (event === "success") {
  //       props.setModal({
  //         ...isModal,
  //         show: true,
  //       });
  //       return;
  //     }
  //     if (event === "info") {
  //       props.setModal({
  //         ...isModal,
  //         show: false,
  //       });
  //       return;
  //     }
  //     props.setModal({
  //       ...isModal,
  //       show: false,
  //     });
  //     if (props.loadData) {
  //       props.loadData();
  //     }
  //   };

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
