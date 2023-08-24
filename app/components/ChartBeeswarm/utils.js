import * as d3 from 'd3';
import { groupBy } from 'lodash/collection';
import { cloneDeep } from 'lodash/lang';

export const groupData = data => groupBy(data, ({ group }) => group);
export const mapNodes = (
  data,
  { minSize, maxSize, minDiameter, maxDiameter, maxValue, maxHeight },
) =>
  // prettier-ignore
  data
    .map(d => ({
      ...d,
      // radius: scaleSize({ minSize, maxSize, minDiameter, maxDiameter })(d.size),
      size: scaleSize({ minSize, maxSize, minDiameter, maxDiameter })(d.size),
      color: '#ff7f0e',
      y: scaleValues({ maxValue, maxHeight })(d.value),
      x: 0,
    }));
// .sort((a, b) => a.size > b.size ? -1 : 1);

export const getNodePosition = (
  nodes,
  // { maxValue, maxHeight, nodePadding },
  { nodePadding },
) => {
  const nodesC = cloneDeep(nodes);
  const simulation = d3
    .forceSimulation(nodesC)
    // .force(
    //   'charge',
    //   d3
    //     .forceManyBody()
    //     .strength(1)
    //     .distanceMin(0.1),
    // )
    // .force('charge', d => d.size * d.size * d.size)
    // .force('center', d3.forceCenter(width / 2, height / 2))
    .force(
      'forceY',
      d3
        .forceY()
        .y(d => d.y)
        .strength(0.8),
    )
    .force('forceX', d3.forceX(d => d.x).strength(0.5))
    // .force(
    //   'forceX',
    //   d3
    //     .forceX(() => 0)
    //     .strength(d =>
    //       scaleStrengthCenter({ minSize, maxSize, range: [0, 0.1] })(d.size),
    //     ),
    // )
    .force(
      'collide',
      d3
        .forceCollide()
        .radius(d => d.size + nodePadding)
        .strength(1),
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
    // console.log(i+"/"+n+"("+ (i/n*100) + ")")
    simulation.tick();
  }
  return nodesC;
};

// .force('forceX', d3.forceX().x((d) => xScale(d.x)).strength((d) => xStrength(d.size)))

export const scaleValues = ({ maxValue, maxHeight }) =>
  d3
    .scaleLinear()
    .domain([0, maxValue])
    .range([0, maxHeight]);

export const scaleSize = ({ minSize, maxSize, minDiameter, maxDiameter }) =>
  d3
    .scaleSqrt()
    .domain([minSize, maxSize])
    .range([minDiameter, maxDiameter]);

export const scaleStrengthCenter = ({ minSize, maxSize, range }) =>
  d3
    .scalePow()
    .exponent(3)
    .domain([minSize, maxSize])
    .range(range); // [0.1, 2]

// minSize, maxSize,
