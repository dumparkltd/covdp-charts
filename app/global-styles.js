import { createGlobalStyle } from 'styled-components';

import ABCMonumentGroteskBoldWOFF from './fonts/ABCMonumentGrotesk-Bold-Trial.woff';
import ABCMonumentGroteskBoldOTF from './fonts/ABCMonumentGrotesk-Bold-Trial.otf';
import ABCMonumentGroteskRegularWOFF from './fonts/ABCMonumentGrotesk-Regular-Trial.woff';
import ABCMonumentGroteskRegularOTF from './fonts/ABCMonumentGrotesk-Regular-Trial.otf';
import ABCMonumentGroteskMonoBoldWOFF from './fonts/ABCMonumentGroteskMono-Bold-Trial.woff';
import ABCMonumentGroteskMonoBoldOTF from './fonts/ABCMonumentGroteskMono-Bold-Trial.otf';
import ABCMonumentGroteskMonoRegularWOFF from './fonts/ABCMonumentGroteskMono-Regular-Trial.woff';
import ABCMonumentGroteskMonoRegularOTF from './fonts/ABCMonumentGroteskMono-Regular-Trial.otf';
import PPFragmentSerifThinOTF from './fonts/PPFragment-SerifThin.otf';
import PPFragmentSerifThinWOFF from './fonts/PPFragment-SerifThin.woff';
import PPFragmentSerifThinTTF from './fonts/PPFragment-SerifThin.ttf';
import PPFragmentSerifThinItalicOTF from './fonts/PPFragment-SerifThinItalic.otf';
import PPFragmentSerifThinItalicWOFF from './fonts/PPFragment-SerifThinItalic.woff';
import PPFragmentSerifThinItalicTTF from './fonts/PPFragment-SerifThinItalic.ttf';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'ABCMonument';
    src: url(${ABCMonumentGroteskRegularWOFF}) format('woff'),
      url(${ABCMonumentGroteskRegularOTF}) format('opentype');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'ABCMonumentBold';
    src: url(${ABCMonumentGroteskBoldWOFF}) format('woff'),
      url(${ABCMonumentGroteskBoldOTF}) format('opentype');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'ABCMonumentMono';
    src: url(${ABCMonumentGroteskMonoRegularWOFF}) format('woff'),
      url(${ABCMonumentGroteskMonoRegularOTF}) format('opentype');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'ABCMonumentMonoBold';
    src: url(${ABCMonumentGroteskMonoBoldWOFF}) format('woff'),
      url(${ABCMonumentGroteskMonoBoldOTF}) format('opentype');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'PPFragment';
    src: url(${PPFragmentSerifThinWOFF}) format('woff'),
      url(${PPFragmentSerifThinTTF}) format('truetype'),
      url(${PPFragmentSerifThinOTF}) format('opentype');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'PPFragmentItalic';
    src: url(${PPFragmentSerifThinItalicWOFF}) format('woff'),
      url(${PPFragmentSerifThinItalicTTF}) format('truetype'),
      url(${PPFragmentSerifThinItalicOTF}) format('opentype');
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
    font-family: 'ABCMonument', 'Helvetica Neue', Helvetica, Arial, sans-serif;
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
`;

export default GlobalStyle;
