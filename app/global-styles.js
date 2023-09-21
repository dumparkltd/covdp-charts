import { createGlobalStyle } from 'styled-components';

import RobotoMonoBold from './fonts/RobotoMono-Bold.ttf';
// import RobotoMonoBoldItalic from './fonts/RobotoMono-BoldItalic.ttf';
// import RobotoMonoItalic from './fonts/RobotoMono-Italic.ttf';
// import RobotoMono from './fonts/RobotoMono-Regular.ttf';

const GlobalStyle = createGlobalStyle`
  /*
  * The Typekit service used to deliver this font or fonts for use on websites
  * is provided by Adobe and is subject to these Terms of Use
  * http://www.adobe.com/products/eulas/tou_typekit. For font license
  * information, see the list below.
  *
  * aktiv-grotesk:
  *   - http://typekit.com/eulas/000000000000000077359d4f
  *   - http://typekit.com/eulas/000000000000000077359d51
  *   - http://typekit.com/eulas/000000000000000077359d55
  *   - http://typekit.com/eulas/000000000000000077359d58
  *   - http://typekit.com/eulas/000000000000000077359d5e
  *   - http://typekit.com/eulas/000000000000000077359d5f
  *
  * © 2009-2023 Adobe Systems Incorporated. All Rights Reserved.
  */
  /*{"last_published":"2023-09-14 22:51:59 UTC"}*/

  @import url("https://p.typekit.net/p.css?s=1&k=lty6guh&ht=tk&f=14032.14033.14034.14035.14038.14039.28900.28901.28904.28905&a=113780656&app=typekit&e=css");

  @font-face
  {
  font-family:"aktiv-grotesk";
  src:url("https://use.typekit.net/af/ab3e12/000000000000000077359d4f/30/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3") format("woff2"),url("https://use.typekit.net/af/ab3e12/000000000000000077359d4f/30/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3") format("woff"),url("https://use.typekit.net/af/ab3e12/000000000000000077359d4f/30/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3") format("opentype");
  font-display:auto;font-style:normal;font-weight:400;font-stretch:normal;
  }

  @font-face {
    font-family: 'roboto-mono-bold';
    src: url(${RobotoMonoBold}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  html,
  body {
    height: 100%;
    width: 100%;
    line-height: 1.5;
  }

  body {
    font-family: 'aktiv-grotesk', 'Helvetica Neue', Helvetica, Arial, sans-serif;
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
