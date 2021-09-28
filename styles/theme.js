import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// Create a theme instance.
let theme = createTheme({
  palette: {
    primary: {
        main: "#51ff00",
        light: "#84ff58",
        dark: "#00fc00"
    },
    secondary: {
        light: "#4b5661",
        dark: "#2d3842",
        main: "#0d1821"
    },
  },
  typography: {
      fontFamily: "Open Sans",
  }
});

// theme = responsiveFontSizes(theme);

export default theme;