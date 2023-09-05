import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text, ResponsiveContext } from 'grommet';
import * as d3 from 'd3';
import { utcFormat as timeFormat } from 'd3-time-format';

import {
  FlexibleWidthXYPlot,
  LineMarkSeries,
  LineSeries,
  LabelSeries,
  XAxis,
  YAxis,
  // HorizontalGridLines,
  // VerticalGridLines,
} from 'react-vis';

import Title from 'components/Title';
import KeyCategoryMarkers from 'components/KeyCategoryMarkers';

import { isMinSize } from 'utils/responsive';

import { mapNodes, groupNodes, getChartHeight, getTickValuesX } from './utils';

const chartMargins = {
  bottom: 30,
  top: 10,
  right: 20,
  left: 50,
};
const chartMarginsSmall = {
  bottom: 20,
  top: 5,
  right: 12,
  left: 40,
};

const Styled = styled.div`
  padding-bottom: 10px;
`;

const YAxisLabelWrap = styled.div`
  margin-top: 5px;
  margin-left: 40px;
  @media (min-width: ${({ theme }) => theme.breakpoints.small}) {
    margin-left: 50px;
  }
`;
const AxisLabel = styled(p => <Text size="xxsmall" {...p} />)`
  text-transform: uppercase;
  font-family: 'ABCMonumentBold';
  color: white;
  background-color: #041733;
  padding: 1px 2px;
  line-height: 11px;
  @media (min-width: ${({ theme }) => theme.breakpoints.small}) {
    padding: 1px 5px;
    line-height: ${({ theme }) => theme.text.xxsmall.height};
  }
`;
const formatXLabels = v => {
  if (timeFormat('%m')(v) === '01') {
    return timeFormat('%Y')(v);
  }
  return <tspan style={{ opacity: 0.5 }}>{timeFormat('%m')(v)}</tspan>;
};
// ms per px
// const getDX = ({ xMin, xMax, chartWidth }) => (xMax - xMin) / chartWidth; // in ms
const monthInMS = 1000 * 60 * 60 * 24 * 45;
export function ChartTimelineSimple({
  data,
  config,
  yAxisLabel,
  seriesColumn,
  seriesLabels,
  target,
}) {
  const size = useContext(ResponsiveContext);

  const nodes = data && mapNodes({ data, seriesColumn });
  const seriesNodes = data && groupNodes({ nodes, seriesColumn });
  const labelData =
    data &&
    seriesNodes.map(series => {
      const lastNode = series.data[series.data.length - 1];
      return {
        label: seriesLabels[series.id],
        x: lastNode.x,
        y: lastNode.y,
        yOffset: -10,
      };
    });
  const xRange = data && d3.extent(nodes, d => d.x);
  const yRange = data && d3.extent(nodes, d => d.y);

  const xMin = xRange[0] - monthInMS;
  const xMax = xRange[1] + monthInMS;
  const yMax = Math.ceil(yRange[1]) + 0.2;
  // prettier-ignore
  const axisNodes = data
    ? [
      { x: xMin, y: yMax },
      { x: xMin, y: 0 },
      { x: xMax, y: 0 },
    ]
    : [
      { x: 0, y: 100 },
      { x: 0, y: 0 },
      { x: 100, y: 0 },
    ];
  const tickValuesX = getTickValuesX({ range: xRange, size });
  return (
    <Styled>
      <Title>{config.chartTitle}</Title>
      <YAxisLabelWrap>
        <AxisLabel>{yAxisLabel}</AxisLabel>
      </YAxisLabelWrap>
      <FlexibleWidthXYPlot
        xType="time"
        height={getChartHeight(size)}
        margin={isMinSize(size, 'medium') ? chartMargins : chartMarginsSmall}
        style={{
          fill: 'transparent',
          // cursor: 'pointer',
          fontFamily: 'ABCMonumentMonoBold',
        }}
      >
        {data && (
          <XAxis
            tickFormat={v => formatXLabels(v)}
            tickValues={tickValuesX}
            style={{
              ticks: { stroke: '#041733', strokeWidth: 0.5 },
              text: { stroke: 'none' },
            }}
            tickPadding={isMinSize(size, 'medium') ? 5 : 3}
            tickSizeOuter={isMinSize(size, 'medium') ? 10 : 5}
            tickSizeInner={0}
          />
        )}
        {data && (
          <YAxis
            style={{
              ticks: { stroke: '#041733', strokeWidth: 0.5 },
              text: { stroke: 'none' },
            }}
            tickPadding={isMinSize(size, 'medium') ? 5 : 3}
            tickSizeOuter={isMinSize(size, 'medium') ? 10 : 5}
            tickSizeInner={0}
          />
        )}
        <LineMarkSeries
          data={axisNodes}
          size={2}
          lineStyle={{ stroke: '#041733', strokeWidth: 0.5 }}
          markStyle={{ fill: '#041733', stroke: '#041733' }}
        />
        {target && (
          <LineSeries
            data={[
              {
                x: xMin,
                y: target.value,
              },
              {
                x: xMax,
                y: target.value,
              },
            ]}
            style={{ stroke: '#041733', strokeWidth: 0.5, opacity: 0.6 }}
            strokeDasharray={[8, 4]}
          />
        )}
        {seriesNodes &&
          seriesNodes.map(series => (
            <LineMarkSeries
              data={series.data}
              key={series.id}
              size={isMinSize(size, 'medium') ? 3.5 : 2.5}
              lineStyle={{
                stroke: series.color,
                strokeWidth: isMinSize(size, 'medium') ? 2 : 1.5,
              }}
              markStyle={{ fill: series.color, stroke: series.color }}
            />
          ))}
        {seriesNodes && isMinSize(size, 'small') && (
          <LabelSeries
            data={labelData}
            style={{
              fill: '#041733',
              fontSize: 12,
              fontFamily: 'ABCMonumentBold',
            }}
            labelAnchorX="end"
            labelAnchorY="text-top"
            allowOffsetToBeReversed={false}
          />
        )}
        {target && (
          <LabelSeries
            data={[
              {
                x: xMax,
                y: target.value,
                yOffset: 15,
                label: target.label,
              },
            ]}
            style={{
              fontFamily: 'ABCMonument',
              fill: '#041733',
              fontSize: 12,
              opacity: 0.8,
            }}
            labelAnchorX="end"
            labelAnchorY="text-bottom"
            allowOffsetToBeReversed={false}
          />
        )}
      </FlexibleWidthXYPlot>
      {!isMinSize(size, 'small') && config.keyCategories && (
        <KeyCategoryMarkers config={config} />
      )}
    </Styled>
  );
}

ChartTimelineSimple.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  config: PropTypes.object,
  seriesColumn: PropTypes.string,
  yAxisLabel: PropTypes.string,
  seriesLabels: PropTypes.object,
  target: PropTypes.object,
};

export default ChartTimelineSimple;
