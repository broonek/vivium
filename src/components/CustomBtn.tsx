import React from "react";
import { Button, ButtonProps } from "@mui/material";

interface ICustomBtn extends ButtonProps {
  onClick?: () => void;
}
const CustomBtn: React.FC<ICustomBtn> = ({
  children,
  color,
  disabled,
  sx,
  fullWidth,
  type,
  onClick,
  variant,
  endIcon,
}) => {
  return (
    <Button
      disabled={disabled}
      type={type}
      sx={sx}
      fullWidth={fullWidth}
      color={color}
      variant={variant}
      onClick={onClick}
      endIcon={endIcon}
    >
      {children}
    </Button>
  );
};

export default CustomBtn;
