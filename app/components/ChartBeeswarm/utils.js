import * as d3 from 'd3';
import { cloneDeep } from 'lodash/lang';

import { DATACOLORS } from 'containers/App/constants';
import { SIZES } from 'theme';

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

const scaleSize = ({ minSize, maxSize, minDiameter, maxDiameter }) =>
  d3
    .scaleSqrt()
    .domain([minSize, maxSize])
    .range([minDiameter, maxDiameter]);

const xStrength = data =>
  d3
    .scalePow()
    .exponent(3)
    .domain(d3.extent(data, d => d.size))
    .range([0.1, 10]);

export const mapNodes = (
  data,
  {
    minSize,
    maxSize,
    minDiameter,
    maxDiameter,
    maxHeight,
    maxValue,
    maxWidth,
    maxX,
  },
) =>
  // prettier-ignore
  data
    .filter((d, i) => i % 1 === 0)
    .map(d => ({
      ...d,
      size: scaleSize({ minSize, maxSize, minDiameter, maxDiameter })(d.sizeRaw),
      size0: d.sizeRaw, // scaleSize({ minSize, maxSize, minDiameter, maxDiameter })(d.sizeRaw),
      color: DATACOLORS[d.group],
      y0: d.value,
      x0: parseInt(d.groupIndex, 10),
      y: scaleValue({ maxHeight, maxValue })(d.value),
      x: scaleGroup({ maxWidth, maxX })(d.groupIndex),
    }))
    .sort((a, b) => a.size > b.size ? -1 : 1);

export const getNodePosition = nodes => {
  const nodesC = cloneDeep(nodes);
  const simulation = d3
    .forceSimulation(nodesC)
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
        .strength(0.8),
    )
    .force(
      'collide',
      d3
        .forceCollide()
        .radius(d => d.size + 0.8)
        .strength(0.1),
    );

  /* eslint-disable no-plusplus */
  for (let i = 0; i < 1000; ++i) {
    // console.log('tick', i, n, (i/n)*100)
    simulation.tick();
  }
  return nodesC;
};

export const getChartHeight = size => SIZES.beeswarmChartHeight[size];
