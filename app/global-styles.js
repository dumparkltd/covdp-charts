import { createGlobalStyle } from 'styled-components';

import DMSansTTF from './fonts/dm-sans-v14-latin-regular.ttf';
import DMSansBoldTTF from './fonts/dm-sans-v14-latin-700.ttf';
import DMSansWOFF from './fonts/dm-sans-v14-latin-regular.woff2';
import DMSansBoldWOFF from './fonts/dm-sans-v14-latin-700.woff2';
import RobotoMonoBoldTTF from './fonts/roboto-mono-v23-latin-700.ttf';
import RobotoMonoBoldWOFF from './fonts/roboto-mono-v23-latin-700.woff2';

const GlobalStyle = createGlobalStyle`

  /* roboto-mono-700 - latin */
  @font-face {
    font-display: swap; /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
    font-family: 'Roboto Mono';
    font-style: normal;
    font-weight: 700;
    descent-override: 40%;
    src: url(${RobotoMonoBoldWOFF}) format('woff2'), /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
         url(${RobotoMonoBoldTTF}) format('truetype'); /* Chrome 4+, Firefox 3.5+, IE 9+, Safari 3.1+, iOS 4.2+, Android Browser 2.2+ */
  }
  /* dm-sans-regular - latin */
  @font-face {
    font-display: swap; /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
    font-family: 'DM Sans';
    font-style: normal;
    font-weight: 400;
    descent-override: 35%;
    src: url(${DMSansWOFF}) format('woff2'), /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
         url(${DMSansTTF}) format('truetype'); /* Chrome 4+, Firefox 3.5+, IE 9+, Safari 3.1+, iOS 4.2+, Android Browser 2.2+ */
  }
  /* dm-sans-700 - latin */
  @font-face {
    font-display: swap; /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
    font-family: 'DM Sans';
    font-style: normal;
    font-weight: 700;
    descent-override: 35%;
    src: url(${DMSansBoldWOFF}) format('woff2'), /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
         url(${DMSansBoldTTF}) format('truetype'); /* Chrome 4+, Firefox 3.5+, IE 9+, Safari 3.1+, iOS 4.2+, Android Browser 2.2+ */
  }
  html,
  body {
    height: 100%;
    width: 100%;
    line-height: 1.5;
  }

  body {
    font-family: 'DM Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    color: #041733;
  }

  // body.fontLoaded {
  //   font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  // }

  #app {
    background-color: #F6F7FC;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  // copied from https://unpkg.com/react-vis/dist/style.css
  .react-vis-magic-css-import-rule
  {
    display: inherit;
  }

  .rv-treemap
  {
    font-size: 12px;
    position: relative;
  }

  .rv-treemap__leaf
  {
    overflow: hidden;
    position: absolute;
  }

  .rv-treemap__leaf--circle
  {
    align-items: center;
    border-radius: 100%;
    display: flex;
    justify-content: center;
  }

  .rv-treemap__leaf__content
  {
    overflow: hidden;
    padding: 10px;
    text-overflow: ellipsis;
  }

  .rv-xy-plot
  {
    color: #c3c3c3;
    position: relative;
  }

  .rv-xy-plot canvas
  {
    pointer-events: none;
  }

  .rv-xy-plot .rv-xy-canvas
  {
    pointer-events: none;
    position: absolute;
  }

  .rv-xy-plot__inner
  {
    display: block;
  }

  .rv-xy-plot__axis__line
  {
    fill: none;
    stroke-width: 2px;
    stroke: #e6e6e9;
  }

  .rv-xy-plot__axis__tick__line
  {
    stroke: #e6e6e9;
  }

  .rv-xy-plot__axis__tick__text
  {
    fill: #6b6b76;
    font-size: 11px;
  }

  .rv-xy-plot__axis__title text
  {
    fill: #6b6b76;
    font-size: 11px;
  }

  .rv-xy-plot__grid-lines__line
  {
    stroke: #e6e6e9;
  }

  .rv-xy-plot__circular-grid-lines__line
  {
    fill-opacity: 0;
    stroke: #e6e6e9;
  }

  .rv-xy-plot__series,.rv-xy-plot__series path
  {
    pointer-events: all;
  }

  .rv-xy-plot__series--line
  {
    fill: none;
    stroke: #000;
    stroke-width: 2px;
  }

  .rv-crosshair
  {
    position: absolute;
    font-size: 11px;
    pointer-events: none;
  }

  .rv-crosshair__line
  {
    background: #47d3d9;
    width: 1px;
  }

  .rv-crosshair__inner
  {
    position: absolute;
    text-align: left;
    top: 0;
  }

  .rv-crosshair__inner__content
  {
    border-radius: 4px;
    background: #3a3a48;
    color: #fff;
    font-size: 12px;
    padding: 7px 10px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.5);
  }

  .rv-crosshair__inner--left
  {
    right: 4px;
  }

  .rv-crosshair__inner--right
  {
    left: 4px;
  }

  .rv-crosshair__title
  {
    font-weight: bold;
    white-space: nowrap;
  }

  .rv-crosshair__item
  {
    white-space: nowrap;
  }

  .rv-hint
  {
    position: absolute;
    pointer-events: none;
  }

  .rv-hint__content
  {
    border-radius: 4px;
    padding: 7px 10px;
    font-size: 12px;
    background: #3a3a48;
    box-shadow: 0 2px 4px rgba(0,0,0,0.5);
    color: #fff;
    text-align: left;
    white-space: nowrap;
  }

  .rv-discrete-color-legend
  {
    box-sizing: border-box;
    overflow-y: auto;
    font-size: 12px;
  }

  .rv-discrete-color-legend.horizontal
  {
    white-space: nowrap;
  }

  .rv-discrete-color-legend-item
  {
    color: #3a3a48;
    border-radius: 1px;
    padding: 9px 10px;
  }

  .rv-discrete-color-legend-item.horizontal
  {
    display: inline-block;
  }

  .rv-discrete-color-legend-item.horizontal .rv-discrete-color-legend-item__title
  {
    margin-left: 0;
    display: block;
  }

  .rv-discrete-color-legend-item__color
  {
    display: inline-block;
    vertical-align: middle;
    overflow: visible;
  }

  .rv-discrete-color-legend-item__color__path
  {
    stroke: #dcdcdc;
    stroke-width: 2px;
  }

  .rv-discrete-color-legend-item__title
  {
    margin-left: 10px;
  }

  .rv-discrete-color-legend-item.disabled
  {
    color: #b8b8b8;
  }

  .rv-discrete-color-legend-item.clickable
  {
    cursor: pointer;
  }

  .rv-discrete-color-legend-item.clickable:hover
  {
    background: #f9f9f9;
  }

  .rv-search-wrapper
  {
    display: flex;
    flex-direction: column;
  }

  .rv-search-wrapper__form
  {
    flex: 0;
  }

  .rv-search-wrapper__form__input
  {
    width: 100%;
    color: #a6a6a5;
    border: 1px solid #e5e5e4;
    padding: 7px 10px;
    font-size: 12px;
    box-sizing: border-box;
    border-radius: 2px;
    margin: 0 0 9px;
    outline: 0;
  }

  .rv-search-wrapper__contents
  {
    flex: 1;
    overflow: auto;
  }

  .rv-continuous-color-legend
  {
    font-size: 12px;
  }

  .rv-continuous-color-legend .rv-gradient
  {
    height: 4px;
    border-radius: 2px;
    margin-bottom: 5px;
  }

  .rv-continuous-size-legend
  {
    font-size: 12px;
  }

  .rv-continuous-size-legend .rv-bubbles
  {
    text-align: justify;
    overflow: hidden;
    margin-bottom: 5px;
    width: 100%;
  }

  .rv-continuous-size-legend .rv-bubble
  {
    background: #d8d9dc;
    display: inline-block;
    vertical-align: bottom;
  }

  .rv-continuous-size-legend .rv-spacer
  {
    display: inline-block;
    font-size: 0;
    line-height: 0;
    width: 100%;
  }

  .rv-legend-titles
  {
    height: 16px;
    position: relative;
  }

  .rv-legend-titles__left,.rv-legend-titles__right,.rv-legend-titles__center
  {
    position: absolute;
    white-space: nowrap;
    overflow: hidden;
  }

  .rv-legend-titles__center
  {
    display: block;
    text-align: center;
    width: 100%;
  }

  .rv-legend-titles__right
  {
    right: 0;
  }

  .rv-radial-chart .rv-xy-plot__series--label
  {
    pointer-events: none;
  }
`;

export default GlobalStyle;
