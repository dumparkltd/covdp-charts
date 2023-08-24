import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

import { FlexibleWidthXYPlot, AreaSeries, MarkSeries } from 'react-vis';

import { groupData, mapNodes, getNodePosition, scaleValues } from './utils';
// d3.max(data, d => d.value)
// d3.extent(data, d => d.size)
export function ChartBeeswarm({ data }) {
  const maxValue = data && d3.max(data, d => d.value);
  const minSize = data && d3.min(data, d => d.size);
  const maxSize = data && d3.max(data, d => d.size);
  const minDiameter = 0; // px
  const maxDiameter = 50; // px
  const maxHeight = 400; // px
  const nodes =
    data &&
    mapNodes(data, {
      minSize,
      maxSize,
      minDiameter,
      maxDiameter,
      maxValue,
      maxHeight,
    });
  const grouped = data && groupData(nodes);

  const groupedWithPositions =
    data &&
    Object.keys(grouped).reduce((m, groupId) => {
      const nodesForGroup = grouped[groupId];
      const nodesWithPosition =
        nodesForGroup &&
        getNodePosition(nodesForGroup, {
          maxValue,
          minSize,
          maxSize,
          maxHeight, // px
          nodePadding: 0,
        });
      return {
        ...m,
        [groupId]: nodesWithPosition,
      };
    }, {});

  // console.log('groupedWithPositions', groupedWithPositions);

  const forceRange = data && [
    {
      x: -350,
      y: scaleValues({ maxValue, maxHeight })(d3.max(data, d => d.value)),
    },
    {
      x: 350,
      y: scaleValues({ maxValue, maxHeight })(d3.max(data, d => d.value)),
    },
    { x: 350, y: 0 },
  ];
  return (
    <div>
      <FlexibleWidthXYPlot
        height={600}
        margin={{
          bottom: 50,
          top: 50,
          right: 50,
          left: 50,
        }}
      >
        {data && <AreaSeries data={forceRange} style={{ opacity: 1 }} />}
        {groupedWithPositions && (
          <MarkSeries
            data={groupedWithPositions.UMIC}
            stroke="black"
            fill="black"
          />
        )}
      </FlexibleWidthXYPlot>
    </div>
  );
}

ChartBeeswarm.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

export default ChartBeeswarm;
