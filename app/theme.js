export const SIZES = {
  maxContainerWidth: 1000,
  scatterChartHeight: {
    xsmall: 200,
    small: 320,
    medium: 440,
    large: 460,
    xlarge: 480,
    xxlarge: 480,
  },
  timelineSimpleChartHeight: {
    xsmall: 200,
    small: 420,
    medium: 440,
    large: 460,
    xlarge: 480,
    xxlarge: 480,
  },
  timelinePeakChartHeight: {
    xsmall: 220,
    small: 420,
    medium: 440,
    large: 460,
    xlarge: 480,
    xxlarge: 480,
  },
  beeswarmChartHeight: {
    xsmall: 220,
    small: 420,
    medium: 440,
    large: 460,
    xlarge: 480,
    xxlarge: 480,
  },
};

// theme defining breakpoints, colors, sizes, grid gutters
// breakpoints:
// < 720px (45em): small (mobile)
// 0: < 960px (60em): medium (tablet portrait)
// 1: < 1152px (72em): large (tablet landscape, desktop)
// 2: > 1152px (72em): xlarge
// const myBreakpoints = [720, 992, 1152, 10000];
export const BREAKPOINTS = {
  xsmall: {
    min: 0,
    max: 480, // inclusive
    name: 'mobile',
    index: 0,
  },
  small: {
    min: 480, // exclusive
    max: 768,
    name: 'mobile (landscape)',
    index: 1,
  },
  medium: {
    min: 768, // exclusive
    max: 976,
    name: 'tablet (portrait)',
    index: 2,
  },
  large: {
    min: 976, // exclusive
    max: 1024,
    name: 'laptop/tablet (landscape)',
    index: 3,
  },
  xlarge: {
    min: 1024, // exclusive
    max: 1440,
    name: 'desktop',
    index: 4,
  },
  xxlarge: {
    min: 1440, // exclusive
    max: 99999999,
    name: 'large desktop',
    index: 5,
  },
};

const text = {
  xxxlarge: { size: '60px', height: '75px', maxWidth: '800px' },
  xxlarge: { size: '30px', height: '36px', maxWidth: '800px' },
  xlarge: { size: '21px', height: '28px', maxWidth: '800px' },
  large: { size: '18px', height: '24px', maxWidth: '800px' },
  medium: { size: '16px', height: '21px', maxWidth: '800px' },
  mediumTight: { size: '16px', height: '18px', maxWidth: '800px' },
  small: { size: '14px', height: '18px', maxWidth: '700px' },
  xsmall: { size: '13px', height: '16px', maxWidth: '600px' },
  xxsmall: { size: '11px', height: '13px', maxWidth: '500px' },
};
const icon = {
  size: {
    xsmall: '10px',
    small: '14px',
    medium: '16px',
    large: '20px',
    xlarge: '24px',
    xxlarge: '32px',
    xxxlarge: '48px',
  },
};
const edgeSize = {
  hair: '1px',
  xxsmall: '3px',
  xsmall: '6px',
  small: '12px',
  ms: '16px',
  medium: '24px',
  ml: '36px',
  large: '48px',
  xlarge: '64px',
  xxlarge: '100px',
};

const theme = {
  sizes: SIZES,
  // used for grommet
  text,
  paragraph: text,
  breakpoints: {
    xsmall: `${BREAKPOINTS.xsmall.min}px`, // max
    small: `${BREAKPOINTS.small.min}px`, // max
    medium: `${BREAKPOINTS.medium.min}px`, // min
    large: `${BREAKPOINTS.large.min}px`, // min
    xlarge: `${BREAKPOINTS.xlarge.min}px`, // min
    xxlarge: `${BREAKPOINTS.xxlarge.min}px`, // min
  },
  breakpointsMin: {
    xsmall: `${BREAKPOINTS.xsmall.min + 1}px`, // min
    small: `${BREAKPOINTS.small.min + 1}px`, // min
    medium: `${BREAKPOINTS.medium.min + 1}px`, // min
    large: `${BREAKPOINTS.large.min + 1}px`, // min
    xlarge: `${BREAKPOINTS.xlarge.min + 1}px`, // min
    xxlarge: `${BREAKPOINTS.xxlarge.min + 1}px`, // min
  },
  icon,
  global: {
    outline:
      '0 0 3px #ffffff, 0 0 3px #ffffff, 0 0 3px #ffffff, 0 0 3px #ffffff, 0 0 3px #ffffff, 0 0 3px #ffffff, 0 0 3px #ffffff, 0 0 3px #ffffff, 0 0 3px #ffffff, 0 0 3px #ffffff',
    input: {
      padding: '2px',
      weight: 300,
      size: '10px',
      font: {
        size: '10px',
        weight: 300,
      },
    },
    font: {
      family: 'aktiv-grotesk',
    },
    colors: {
      black: '#041733',
      white: '#FFFFFF',
      text: '#041733',
      textSecondary: '#888',
      focus: 'transparent',
      buttonBG: '#e4e6ec',
      buttonActiveBG: '#041733',
      buttonHoverBG: '#cbccd2',
    },
    // margins & paddings
    edgeSize,
    breakpoints: {
      xsmall: {
        value: BREAKPOINTS.xsmall.max,
      },
      small: {
        value: BREAKPOINTS.small.max,
      },
      medium: {
        value: BREAKPOINTS.medium.max,
      },
      large: {
        value: BREAKPOINTS.large.max,
      },
      xlarge: {
        value: BREAKPOINTS.xlarge.max,
      },
      xxlarge: {},
    },
  },
};

export default theme;
