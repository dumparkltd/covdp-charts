import React from 'react';
import PropTypes from 'prop-types';
// import * as d3 from 'd3';
import { Box, Button } from 'grommet';
import {
  FlexibleWidthXYPlot,
  AreaSeries,
  MarkSeries,
  LineMarkSeries,
  Hint,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
} from 'react-vis';

import { mapNodes } from './utils';

const tickValuesY = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const tickValuesXValues = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const tickValuesX = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
// d3.max(data, d => d.value)
// d3.extent(data, d => d.size)
export function ChartScatter({
  data,
  xRange,
  yRange,
  config,
  setMetric,
  metric,
  setMouseOver,
  mouseOver,
  setHighlight,
  highlight,
}) {
  const nodes = data && mapNodes(data, { mouseOver, highlight });
  // console.log('data', data)
  // console.log('nodes', nodes)
  // console.log('config', config)
  const forceRange = [
    { x: xRange[0], y: yRange[0] },
    { x: xRange[1], y: yRange[1] },
  ];
  const coverRange = [
    { x: 0, y: yRange[1], y0: 0 },
    { x: xRange[1], y: yRange[1], y0: 0 },
    { x: xRange[1], y: 0, y0: 0 },
  ];
  const mouseOverNode = mouseOver && nodes.find(n => n.id === mouseOver);
  const highlightNode = highlight && nodes.find(n => n.id === highlight);
  // console.log(coverRange)
  return (
    <div style={{ background: '#F6F7FC' }}>
      {config.metricOptions && (
        <Box direction="row">
          {config.metricOptions.map(option => (
            <Button
              key={option}
              plain
              label={option}
              onClick={() => setMetric(option)}
              active={option === metric}
            />
          ))}
        </Box>
      )}
      <FlexibleWidthXYPlot
        height={500}
        margin={{
          bottom: 50,
          top: 50,
          right: 50,
          left: 50,
        }}
        style={{
          fill: 'transparent',
          cursor: 'pointer',
        }}
        onMouseLeave={() => setMouseOver(null)}
        onClick={() => {
          if (mouseOver) {
            if (highlightNode && mouseOver === highlightNode.id) {
              setHighlight(null);
            } else {
              setHighlight(mouseOver);
            }
          }
        }}
      >
        {data && <AreaSeries data={forceRange} style={{ opacity: 0 }} />}
        <VerticalGridLines
          tickValues={tickValuesX}
          style={{
            stroke: '#000000',
            strokeWidth: 0.5,
          }}
        />
        <HorizontalGridLines
          tickValues={tickValuesY}
          style={{
            stroke: '#000000',
            strokeWidth: 0.5,
          }}
        />
        {data && (
          <AreaSeries
            data={coverRange}
            style={{ opacity: 1, fill: '#F6F7FC', stroke: '#F6F7FC' }}
          />
        )}
        <XAxis
          style={{
            line: { strokeWidth: 0 },
            text: {
              fontWeight: 700,
            },
          }}
          tickValues={tickValuesXValues}
          tickPadding={1}
        />
        <YAxis
          tickFormat={v => `${v}%`}
          style={{
            line: { strokeWidth: 0 },
            text: {
              fontWeight: 700,
            },
          }}
          tickValues={tickValuesY}
          tickPadding={2}
        />
        <LineMarkSeries
          data={[{ x: 0, y: 105 }, { x: 0, y: 0 }, { x: 105, y: 0 }]}
          size={2}
          style={{ strokeWidth: 0.5 }}
          color="#000"
        />
        {nodes && (
          <MarkSeries
            data={nodes}
            size={3}
            colorType="literal"
            animation={{ nonAnimatedProps: ['opacity', 'color'] }}
            key="id"
            onNearestXY={node => {
              // console.log(node);
              setMouseOver(node.id);
            }}
          />
        )}
        {mouseOverNode && <Hint value={mouseOverNode} />}
        {highlightNode && <Hint value={highlightNode} />}
      </FlexibleWidthXYPlot>
    </div>
  );
}

ChartScatter.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  xRange: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  yRange: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  config: PropTypes.object,
  metric: PropTypes.string,
  mouseOver: PropTypes.string,
  highlight: PropTypes.string,
  setMetric: PropTypes.func,
  setMouseOver: PropTypes.func,
  setHighlight: PropTypes.func,
};

export default ChartScatter;
