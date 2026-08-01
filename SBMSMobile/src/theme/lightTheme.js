// src/theme/lightTheme.js

import { MD3LightTheme } from "react-native-paper";
import { Colors } from "./colors";

export const LightTheme = {
  ...MD3LightTheme,

  colors: {
    ...MD3LightTheme.colors,

    primary: Colors.primary,
    secondary: Colors.secondary,

    background: Colors.gray50,
    surface: Colors.white,

    error: Colors.error,

    text: Colors.gray900,

    outline: Colors.gray300,
  },
};
