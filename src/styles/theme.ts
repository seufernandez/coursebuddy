import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const breakpoints = createBreakpoints({
  sm: '560px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '2400px',
});

export const theme = extendTheme({
  breakpoints,

  colors: {
    // --Purple1BC: #15081c;
    // --Purple2: #2d0d32;
    // --Purple3: #3b1348;
    // --Purple4: #531c66;
    // --MainPurple: #ba68c8;
    // --DeepPurple: #9e00ff;

    green: {
      '900': '#003F27',
      '800': '#006941',
      '700': '#008351',
      '600': '#008351',
      '550': '#00AA69',
      '500': '#00B771',
      '400': '#00E68E',
      '300': '#00FE9C',
      '200': '#2DFFAF',
      '100': '#73FFC9',
    },

    purple: {
      '950': '#0A040E',
      '900': '#15081C',
      '800': '#2d0d32',
      '700': '#3b1348',
      '600': '#531c66',
      '550': '#7e3d94',
      '500': '#ba68c8',
      '400': '#BF74CD',
      '300': '#C989D5',
      '200': '#DDB4E4',
      '100': '#E7C9EC',
    },

    gray: {
      '900': '#474747',
      '800': '#5a5a5a',
      '700': '#818181',
      '600': '#959595',
      '500': '#9f9f9f',
      '400': '#c6c6c6',
      '300': '#d3d3d3',
      '200': '#dfdfdf',
      '100': '#ececec',
    },
  },

  // no blue Border
  components: {
    Button: { baseStyle: { _focus: { boxShadow: 'none' } } },
  },

  fonts: {
    heading: 'Inter',
    body: 'Inter',
  },

  fontWeights: {
    normal: 400,
    medium: 500,
    bold: 700,
  },

  styles: {
    global: {
      body: {
        bg: 'purple.900',
        color: '',
      },
    },
  },
});
