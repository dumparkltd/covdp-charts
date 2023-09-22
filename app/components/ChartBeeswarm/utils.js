import * as d3 from 'd3';
import { cloneDeep } from 'lodash/lang';
import { groupBy } from 'lodash/collection';
import forceBoundary from 'd3-force-boundary';
import { DATACOLORS } from 'containers/App/constants';
import { SIZES } from 'theme';

import { getMedian, getAverage } from 'utils/charts';

export const scaleValue = ({ maxHeight, maxValue }) =>
  d3
    .scaleLinear()
    .domain([0, maxValue])
    .range([0, maxHeight]);

export const scaleGroup = ({ maxWidth, maxX }) =>
  d3
    .scaleLinear()
    .domain([0, maxX])
    .range([0, maxWidth]);

export const scaleSize = ({ maxSize, maxDiameter }) =>
  d3
    .scaleSqrt()
    .domain([0, maxSize])
    .range([0, maxDiameter]);

const xStrength = data =>
  d3
    .scalePow()
    .exponent(3)
    .domain(d3.extent(data, d => d.size))
    .range([0.1, 10]);

export const mapNodes = (
  data,
  {
    // minSize,
    maxSize,
    minDiameter,
    maxDiameter,
    maxHeight,
    maxValue,
    maxWidth,
    maxX,
    highlight,
    mouseOver,
  },
) =>
  // prettier-ignore
  data
    .filter((d, i) => i % 1 === 0)
    .map(d => {
      let opacity = highlight ? 0.3 : 0.7;
      if (highlight === d.id || mouseOver === d.id) {
        opacity = 1;
      }
      const stroke = (mouseOver === d.id || highlight === d.id)
        ? 'black'
        : 'transparent';
      return ({
        ...d,
        size: Math.max(scaleSize({ maxSize, maxDiameter })(d.sizeRaw), minDiameter),
        y: scaleValue({ maxHeight, maxValue })(d.value),
        x: scaleGroup({ maxWidth, maxX })(d.groupIndex),
        fill: DATACOLORS[d.group],
        stroke,
        opacity,
      });
    });
// .sort((a, b) => a.size > b.size ? -1 : 1);

export const getNodePosition = (nodes, { maxWidth, maxHeight }) => {
  const nodesC = cloneDeep(nodes);
  const simulation = d3
    .forceSimulation(nodesC)
    .force('boundary', forceBoundary(0, 0, maxWidth, maxHeight).border(1))
    .force(
      'x',
      d3
        .forceX()
        .x(d => d.x)
        .strength(d => xStrength(nodes)(d.size)),
    )
    .force(
      'y',
      d3
        .forceY()
        .y(d => d.y)
        .strength(1.1),
    )
    .force(
      'collide',
      d3
        .forceCollide()
        .radius(d => d.size + 0.5)
        .strength(0.1),
    );

  /* eslint-disable no-plusplus */
  for (
    let i = 0,
      n = Math.ceil(
        Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay()),
      );
    i < n;
    ++i
  ) {
    // console.log(i + '/' + n + '(' + (i / n) * 100 + ')');
    simulation.tick();
  }
  return nodesC;
};

export const getChartHeight = size => SIZES.beeswarmChartHeight[size];

export const getGroupMedians = data => {
  const groups = groupBy(data, d => d.group);
  return Object.keys(groups).reduce(
    (memo, groupId) => ({
      ...memo,
      [groupId]: getMedian(groups[groupId]),
    }),
    {},
  );
};
export const getGroupAverages = data => {
  const groups = groupBy(data, d => d.group);
  return Object.keys(groups).reduce(
    (memo, groupId) => ({
      ...memo,
      [groupId]: getAverage(groups[groupId], 'value', 'sizeRaw'),
    }),
    {},
  );
};
