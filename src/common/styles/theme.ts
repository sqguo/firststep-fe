import { createTheme } from "@mui/material/styles";
import { v5 as uuidv5 } from "uuid";
import _ from "lodash";

const APP_UUID = process.env.APP_UUID as string;

const theme = createTheme({
  palette: {
    primary: {
      light: "rgba(0, 0, 0, 0.6)",
      main: "#000000",
      dark: "#000000",
    },
  },
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

export const randomColorPicker = (key?: string) => {
  if (key) {
    // TODO: should be a better way
    const gen = uuidv5(key, APP_UUID);
    const sum = gen.split('').reduce((acc, val) => acc + val.charCodeAt(0), 0)
    return randomColors[sum % (randomColors.length-1)]
  }
  const rIndex = _.random(0, randomColors.length-1);
  return randomColors[rIndex];
}

export default theme;
