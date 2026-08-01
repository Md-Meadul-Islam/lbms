// src/theme/darkTheme.js

import { MD3DarkTheme } from "react-native-paper";
import { Colors } from "./colors";

export const DarkTheme = {
  ...MD3DarkTheme,

  colors: {
    ...MD3DarkTheme.colors,

    primary: Colors.primary,

    secondary: Colors.secondary,

    background: "#0F172A",

    surface: "#1E293B",

    text: Colors.white,

    error: Colors.error,
  },
};
