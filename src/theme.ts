import { NextFont } from 'next/dist/compiled/@next/font';
import { Roboto } from 'next/font/google';

import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export const roboto: NextFont = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif']
});
const typography: any = {
  fontFamily: roboto.style.fontFamily,
  button: {
    textTransform: 'none'
  }
};

const lightPalette = {
  primary: {
    main: '#556cd6'
  },
  secondary: {
    main: '#19857b'
  },
  error: {
    main: red.A400
  },
  mode: 'light'
};
const darkPalette = {
  primary: {
    main: '#556cd6'
  },
  secondary: {
    main: '#19857b'
  },
  error: {
    main: red.A400
  },
  mode: 'dark'
};

export function getTheme(prefersDarkMode: boolean) {
  let palette: any = null;
  if (prefersDarkMode === true) {
    palette = darkPalette;
  } else {
    palette = lightPalette;
  }

  return createTheme({
    palette,
    typography
  });
}
