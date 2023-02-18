import { createTheme } from "@mui/material/styles";
import _ from "lodash";

const theme = createTheme({
  palette: {
    primary: {
      light: "rgba(0, 0, 0, 0.6)",
      main: "#000000",
      dark: "#000000",
    },
  },
});

export const defaultTheme = createTheme({      
  typography: {
    fontFamily: `"Nunito", serif`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    button: {
      textTransform: 'none'
    }
  }
});

export const randomColors = [
  "#99bfa3",
  "#d0b4ef",
  "#99acba",
  "#c9c6a3",
  "#d9aaa3",
  "#b8d9a3",
  "#a3b2d9",
  "#d9b2a3",
];

export const randomColorPicker = () => {
  const rIndex = _.random(0, randomColors.length-1);
  return randomColors[rIndex];
}

export default theme;
