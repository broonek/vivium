import ReactDOM from "react-dom";
import { Alert, Snackbar } from "@mui/material";

type Props = {
  show: boolean;
  severity: "error" | "success" | "info" | "warning" | undefined;
  message: string | undefined;
  onClose: () => void;
};

const Modal: React.FC<Props> = ({ show, severity, message, onClose }) => {
  return ReactDOM.createPortal(
    <>
      <Snackbar
        open={show}
        autoHideDuration={3000}
        onClose={() => onClose()}
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
