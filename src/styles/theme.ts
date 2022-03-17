import { PaletteMode } from "@mui/material";
import { lightBlue, pink, grey, blue } from "@mui/material/colors";

const getDesignTokens = (mode: PaletteMode) => ({
  typography: {
    fontFamily: [
      "Raleway",
      "Arial",
      '"Helvetica Neue"',
      "Helvetica",
      "sans-serif",
    ].join(","),
  },
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: {
            main: lightBlue[200],
          },
          secondary: {
            main: pink[200],
          },
          divider: grey[300],
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: blue[600],
          },
          // divider: deepOrange[700],
          background: {
            default: "rgb(0, 20, 40)",
            paper: blue[900],
          },
          text: {
            primary: "#fff",
            secondary: grey[500],
          },
        }),
  },
});

export default getDesignTokens;
