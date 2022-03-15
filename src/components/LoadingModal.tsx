import React from "react";
import ReactDOM from "react-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

type Props = {
  show: boolean;
};

const LoadingModal: React.FC<Props> = ({ show }) => {
  return ReactDOM.createPortal(
    <Backdrop sx={{ zIndex: "9999" }} open={show}>
      <CircularProgress />
    </Backdrop>,
    document.getElementById("backdrop") as HTMLFormElement
  );
};

export default LoadingModal;
