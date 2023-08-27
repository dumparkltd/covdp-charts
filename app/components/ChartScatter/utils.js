// import * as d3 from 'd3';
// import { cloneDeep } from 'lodash/lang';

import { DATACOLORS } from 'containers/App/constants';
import { SIZES } from 'theme';
export const mapNodes = (data, { mouseOver, highlight }) =>
  // prettier-ignore
  data
    .map(d => {
      let opacity = highlight ? 0.3 : 0.6;
      if (highlight === d.id || mouseOver === d.id) {
        opacity = 1;
      }
      return ({
        ...d,
        color: DATACOLORS[d.color],
        // fill: DATACOLORS[d.color],
        x: Math.min(d.xValue, 100),
        y: Math.min(d.yValue, 100),
        opacity,
      })
    });

export const getChartHeight = size => SIZES.scatterChartHeight[size];
