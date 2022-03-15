import * as React from "react";
import { createTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { breakpoints } from "@mui/system";

const primaryColor = "#069FA6";

export const theme = createTheme({
  palette: {
    basic: {
      main: primaryColor,
      contrastText: "#fff",
    },
  },
  typography: {
    fontSize: 14,
  },
});

// const isSmallScreen = useMediaQuery((theme: any) =>
//   theme.breakpoints.down("sm")
// );
// export const paperProps = isSmallScreen
//   ? { variant: "elevation0" as "elevation" }
//   : { variant: "outlined" as "outlined" };

declare module "@mui/material/styles" {
  interface Palette {
    basic: Palette["primary"];
  }

  interface PaletteOptions {
    basic?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    basic: true;
  }
}
declare module "@mui/material/TextField" {
  interface TextFieldPropsColorOverrides {
    basic: true;
  }
}
