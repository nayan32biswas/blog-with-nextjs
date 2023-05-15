import { NextFont } from "next/dist/compiled/@next/font";
import { Roboto } from "next/font/google";

import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const roboto: NextFont = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"]
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6"
    },
    secondary: {
      main: "#19857b"
    },
    error: {
      main: red.A400
    }
  },
  typography: {
    fontFamily: roboto.style.fontFamily
  }
});

export default theme;
