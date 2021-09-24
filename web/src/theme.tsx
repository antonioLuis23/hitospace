import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const fonts = {
  mono: `'Menlo', monospace`,
  sansSerif: `'Lato', sans-serif`,
};

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
});
const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};
const theme = extendTheme({
  config,
  // styles: {
  //   global: {
  //     body: {
  //       bg: "#fdfdfd",
  //     },
  //   },
  // },
  // colors: {
  //   black: "#16161D",
  //   gray: {
  //     700: "#fff",
  //   },
  // },
  fonts,
  breakpoints,
});

export default theme;
