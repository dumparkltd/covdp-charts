import React, { useContext } from 'react';
import PropTypes from 'prop-types';
// import * as d3 from 'd3';
import styled from 'styled-components';
import { Box, ResponsiveContext } from 'grommet';
import {
  FlexibleWidthXYPlot,
  MarkSeries,
  LineMarkSeries,
  LabelSeries,
  LineSeries,
  Hint,
  XAxis,
  YAxis,
  // HorizontalGridLines,
  // VerticalGridLines,
} from 'react-vis';

import CountryHint from 'components/CountryHint';
import KeyCategoryMarkers from 'components/KeyCategoryMarkers';
import Options from 'components/Options';
import KeyTarget from 'components/KeyTarget';
import AxisLabel from 'components/AxisLabel';

import { isMinSize } from 'utils/responsive';
import { getMedian } from 'utils/charts';

import { mapNodes, getChartHeight } from './utils';

const chartMargins = {
  bottom: 30,
  top: 10,
  right: 20,
  left: 70,
};
const chartMarginsSmall = {
  bottom: 20,
  top: 7,
  right: 12,
  left: 40,
};

const Styled = styled.div`
  padding-bottom: 10px;
`;
const tickValuesY = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const tickValuesYSmall = [0, 20, 40, 60, 80, 100];
const tickValuesX = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const axisNodes = [{ x: 0, y: 100 }, { x: 0, y: 0 }, { x: 100, y: 0 }];
// const tickValuesX = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
// d3.max(data, d => d.value)
// d3.extent(data, d => d.size)
export function ChartScatter({
  data,
  config,
  setMetric,
  metric,
  setMouseOver,
  mouseOver,
  setHighlight,
  highlight,
  medianX,
  medianY,
  countries,
}) {
  const size = useContext(ResponsiveContext);
  const nodes = data && mapNodes(data, { mouseOver, highlight });

  const medianYValue = data && medianY && getMedian(data, 'yValue');
  const medianXValue = data && medianX && getMedian(data, 'xValue');

  // const forceRange = [
  //   { x: xRange[0], y: yRange[0] },
  //   { x: xRange[1], y: yRange[1] },
  // ];
  // const coverRange = [
  //   { x: 0, y: yRange[1], y0: 0 },
  //   { x: xRange[1], y: yRange[1], y0: 0 },
  //   { x: xRange[1], y: 0, y0: 0 },
  // ];
  const mouseOverNode = mouseOver && nodes.find(n => n.id === mouseOver);
  const highlightNode = highlight && nodes.find(n => n.id === highlight);
  const margins = isMinSize(size, 'medium') ? chartMargins : chartMarginsSmall;

  return (
    <Styled>
      <Box margin={{ bottom: 'medium' }}>
        <Options
          metric={metric}
          setMetric={setMetric}
          setHighlight={setHighlight}
          highlightNode={highlightNode}
          data={data}
          config={config}
          countries={countries}
        />
      </Box>
      <AxisLabel axis="y" config={config} chartMargins={margins} />
      <FlexibleWidthXYPlot
        height={getChartHeight(size)}
        margin={margins}
        style={{
          fill: 'transparent',
          cursor: 'pointer',
          fontFamily: "'roboto-mono-bold', monospace",
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
        <XAxis
          style={{
            ticks: { stroke: '#041733', strokeWidth: 0.5 },
            text: { fill: '#041733', stroke: 'none', fontSize: '13px' },
          }}
          tickValues={tickValuesX}
          tickPadding={isMinSize(size, 'medium') ? 5 : 3}
          tickSizeOuter={isMinSize(size, 'medium') ? 10 : 5}
          tickSizeInner={0}
        />
        <YAxis
          tickFormat={v => `${v}%`}
          style={{
            ticks: { stroke: '#041733', strokeWidth: 0.5 },
            text: { fill: '#041733', stroke: 'none', fontSize: '13px' },
          }}
          tickValues={
            isMinSize(size, 'medium') ? tickValuesY : tickValuesYSmall
          }
          tickPadding={isMinSize(size, 'medium') ? 5 : 3}
          tickSizeOuter={isMinSize(size, 'medium') ? 10 : 5}
          tickSizeInner={0}
        />
        {medianYValue && (
          <LineSeries
            data={[
              {
                x: 0,
                y: medianYValue,
              },
              {
                x: 100,
                y: medianYValue,
              },
            ]}
            style={{ stroke: '#041733', strokeWidth: 0.5, opacity: 0.6 }}
            strokeDasharray={[8, 4]}
            animation
          />
        )}
        {medianXValue && (
          <LineSeries
            data={[
              {
                x: medianXValue,
                y: 0,
              },
              {
                x: medianXValue,
                y: 100,
              },
            ]}
            style={{ stroke: '#041733', strokeWidth: 0.5, opacity: 0.6 }}
            strokeDasharray={[8, 4]}
            animation
          />
        )}
        {isMinSize(size, 'medium') && medianYValue && (
          <LabelSeries
            data={[
              {
                x: 0,
                y: medianYValue,
                yOffset: 15,
                xOffset: 15,
                label: `Average (median)`,
              },
            ]}
            style={{
              fontFamily: "'aktiv-grotesk', sans-serif",
              fill: '#041733',
              fontSize: 12,
              opacity: 0.8,
            }}
            labelAnchorX="start"
            labelAnchorY="text-bottom"
            allowOffsetToBeReversed={false}
            animation
          />
        )}
        <LineMarkSeries
          data={axisNodes}
          size={2}
          lineStyle={{ stroke: '#041733', strokeWidth: 0.5 }}
          markStyle={{ fill: '#041733', stroke: '#041733' }}
        />
        {nodes && (
          <MarkSeries
            data={nodes}
            size={4}
            strokeType="literal"
            fillType="literal"
            animation={{ nonAnimatedProps: ['opacity'] }}
            key="id"
            onNearestXY={node => {
              // console.log(node);
              if (isMinSize(size, 'small')) {
                setMouseOver(node.id);
              }
            }}
          />
        )}
        {isMinSize(size, 'medium') && (highlightNode || mouseOverNode) && (
          <Hint
            align={{ vertical: 'top', horizontal: 'left' }}
            value={highlightNode || mouseOverNode}
            style={{
              pointerEvents: 'none',
              margin: '15px 0',
            }}
          >
            <CountryHint
              onClose={() => setHighlight(null)}
              hasClose={!!highlight}
              country={highlightNode || mouseOverNode}
              config={config}
            />
          </Hint>
        )}
      </FlexibleWidthXYPlot>
      <AxisLabel axis="x" config={config} chartMargins={margins} />
      <Box margin={{ left: `${margins.left}px` }}>
        <Box margin={{ top: 'medium' }}>
          <KeyCategoryMarkers config={config} />
        </Box>
        {!isMinSize(size, 'medium') && medianYValue && (
          <Box margin={{ top: 'small' }}>
            <KeyTarget
              target={{ label: 'Averages (median)' }}
              strokeDasharray={[8, 4]}
            />
          </Box>
        )}
      </Box>
    </Styled>
  );
}

// <VerticalGridLines
//   tickValues={tickValuesX}
//   style={{
//     stroke: '#000000',
//     strokeWidth: 0.5,
//   }}
// />
// <HorizontalGridLines
//   tickValues={tickValuesY}
//   style={{
//     stroke: '#000000',
//     strokeWidth: 0.5,
//   }}
// />
// <AreaSeries
//   data={coverRange}
//   style={{ opacity: 1, fill: '#F6F7FC', stroke: '#F6F7FC' }}
// />

ChartScatter.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  config: PropTypes.object,
  metric: PropTypes.string,
  mouseOver: PropTypes.string,
  highlight: PropTypes.string,
  setMetric: PropTypes.func,
  setMouseOver: PropTypes.func,
  setHighlight: PropTypes.func,
  medianX: PropTypes.bool,
  medianY: PropTypes.bool,
  countries: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

export default ChartScatter;
