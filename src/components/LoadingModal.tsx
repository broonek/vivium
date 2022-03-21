import React from "react";
import ReactDOM from "react-dom";
import { Backdrop, CircularProgress } from "@mui/material";
import { IShowModal } from "../utils/Interfaces";

const LoadingModal: React.FC<IShowModal> = ({ show }) => {
  return ReactDOM.createPortal(
    <Backdrop sx={{ zIndex: "9999" }} open={show}>
      <CircularProgress />
    </Backdrop>,
    document.getElementById("backdrop") as HTMLFormElement
  );
};

export default LoadingModal;
