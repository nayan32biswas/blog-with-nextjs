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

export type ColorModeType = 'light' | 'dark';

const lightPalette = {
  primary: {
    main: 'rgba(0, 0, 0, 0.87)'
  },
  secondary: {
    main: 'rgba(0, 0, 0, 0.6)'
  },
  error: {
    main: red.A400
  },
  mode: 'light'
};
const darkPalette = {
  primary: {
    main: '#fff'
  },
  secondary: {
    main: 'rgba(255, 255, 255, 0.7)'
  },
  error: {
    main: red.A400
  },
  mode: 'dark'
};

export function getTheme(colorMode: ColorModeType = 'dark') {
  let palette: any = null;
  if (colorMode === 'dark') {
    palette = darkPalette;
  } else {
    palette = lightPalette;
  }

  return createTheme({
    palette,
    typography
  });
}

export function setColorMode(colorMode: ColorModeType) {
  if (isServer()) {
    return null;
  }
  localStorage.setItem('mode', colorMode);
}

export function getColorMode(): null | string {
  if (isServer()) {
    return null;
  }
  return localStorage.getItem('mode');
}
