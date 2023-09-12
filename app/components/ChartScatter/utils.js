// import * as d3 from 'd3';
// import { cloneDeep } from 'lodash/lang';

import { DATACOLORS } from 'containers/App/constants';
import { SIZES } from 'theme';
export const mapNodes = (data, { mouseOver, highlight }) =>
  // prettier-ignore
  data
    .map(d => {
      let opacity = highlight || mouseOver ? 0.3 : 0.7;
      if (highlight === d.id || mouseOver === d.id) {
        opacity = 1;
      }
      const stroke = (mouseOver === d.id || highlight === d.id)
        ? 'black'
        : 'transparent';
      return ({
        ...d,
        x: Math.min(d.xValue, 100),
        y: Math.min(d.yValue, 100),
        // color: DATACOLORS[d.color],
        fill: DATACOLORS[d.color],
        stroke,
        opacity,
      })
    });

export const getChartHeight = size => SIZES.scatterChartHeight[size];
