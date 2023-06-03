import { NextFont } from 'next/dist/compiled/@next/font';
import { Roboto } from 'next/font/google';

import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

import { isServer } from './utils/utils';

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

export const MODE = {
  DARK: 'DARK',
  LIGHT: 'LIGHT'
};

export function setDarkMode() {
  localStorage.setItem('mode', MODE.DARK);
}

export function setLightMode() {
  localStorage.setItem('mode', MODE.LIGHT);
}

export function getPreferMode() {
  if (isServer()) {
    return null;
  }
  return localStorage.getItem('mode');
}
