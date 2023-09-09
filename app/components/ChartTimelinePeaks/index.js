import React, { useContext } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, ResponsiveContext } from 'grommet';
import * as d3 from 'd3';
import { utcFormat as timeFormat } from 'd3-time-format';

import {
  FlexibleWidthXYPlot,
  LineMarkSeries,
  MarkSeries,
  LineSeries,
  XAxis,
  YAxis,
  Hint,
  // VerticalGridLines,
} from 'react-vis';

import KeyCategoryMarkers from 'components/KeyCategoryMarkers';
import Options from 'components/Options';
import CountryHint from 'components/CountryHint';
import AxisLabel from 'components/AxisLabel';

import { isMinSize } from 'utils/responsive';
import { getHintAlign } from 'utils/charts';

import { mapNodes, groupNodes, getChartHeight, getTickValuesX } from './utils';

const chartMargins = {
  bottom: 30,
  top: 10,
  right: 20,
  left: 70,
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

// https://github.com/d3/d3-time-format
const formatXLabels = ({ v, size }) => {
  if (timeFormat('%m')(v) === '01') {
    return <tspan>{timeFormat('%Y')(v)}</tspan>;
  }
  return (
    <tspan style={{ opacity: 0.75 }}>
      {timeFormat(isMinSize(size, 'medium') ? '%B' : '%b')(v)}
    </tspan>
  );
};
formatXLabels.propTypes = {
  v: PropTypes.number,
  size: PropTypes.string,
};

const getYAxisLabels = yMax => {
  const labels = [];
  /* eslint-disable no-plusplus */
  for (let i = 0; i <= yMax + 1; i++) {
    labels.push(i);
  }
  return labels;
};
// ms per px
// const getDX = ({ xMin, xMax, chartWidth }) => (xMax - xMin) / chartWidth; // in ms
const monthInMS = 1000 * 60 * 60 * 24 * 45;
export function ChartTimelinePeaks({
  data,
  countries,
  config,
  setMouseOver,
  mouseOver,
  setHighlight,
  highlight,
  intl,
}) {
  const size = useContext(ResponsiveContext);
  const { metrics } = config;
  const nodes =
    data &&
    mapNodes({
      data,
      xColumn: 'date',
      yColumn: metrics.doses,
    });
  const seriesNodes = data && groupNodes({ nodes, countries });

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
  const peaks =
    seriesNodes &&
    seriesNodes.map(node => ({
      ...node.max,
      id: node.id,
      fill: node.color,
      stroke: 'transparent',
      color: node.color,
    }));
  const highlightSeries =
    highlight && seriesNodes && seriesNodes.find(n => n.id === highlight);
  const mouseOverSeries =
    mouseOver && seriesNodes && seriesNodes.find(n => n.id === mouseOver);
  const highlightNode =
    highlight && peaks && peaks.find(n => n.id === highlight);
  const mouseOverNode =
    mouseOver && peaks && peaks.find(n => n.id === mouseOver);

  const hintSeries = highlightSeries || mouseOverSeries;
  const hintNode = highlightNode || mouseOverNode;
  const hintAlign =
    hintNode && getHintAlign({ xPosition: hintNode.x, xMin, xMax });

  const margins = isMinSize(size, 'medium') ? chartMargins : chartMarginsSmall;

  return (
    <Styled>
      <Options
        setHighlight={setHighlight}
        highlightNode={highlightSeries}
        data={seriesNodes}
        config={config}
      />
      <AxisLabel axis="y" config={config} chartMarginLeft={margins.left} />
      <FlexibleWidthXYPlot
        xType="time"
        height={getChartHeight(size)}
        margin={margins}
        style={{
          fill: 'transparent',
          // cursor: 'pointer',
          fontFamily: 'ABCMonumentMonoBold',
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
        {data && (
          <XAxis
            tickFormat={v => formatXLabels({ v, size })}
            tickValues={tickValuesX}
            style={{
              ticks: { stroke: '#041733', strokeWidth: 0.5 },
              text: { stroke: 'none', fontSize: '13px' },
            }}
            tickPadding={isMinSize(size, 'medium') ? 5 : 3}
            tickSizeOuter={isMinSize(size, 'medium') ? 10 : 5}
            tickSizeInner={0}
          />
        )}
        {data && (
          <YAxis
            tickFormat={v => `${v}%`}
            tickValues={getYAxisLabels(yMax)}
            style={{
              ticks: { stroke: '#041733', strokeWidth: 0.5 },
              text: { stroke: 'none', fontSize: '13px' },
            }}
            tickPadding={isMinSize(size, 'medium') ? 5 : 3}
            tickSizeOuter={isMinSize(size, 'medium') ? 10 : 5}
            tickSizeInner={0}
          />
        )}
        {seriesNodes &&
          seriesNodes.map(series => (
            <LineSeries
              data={series.data}
              key={series.id}
              style={{
                opacity: 0.8,
                stroke: '#ccc',
                strokeWidth: 0.2,
              }}
            />
          ))}
        {highlightSeries && (
          <LineSeries
            data={highlightSeries.data}
            style={{
              opacity: 1,
              stroke: highlightSeries.color,
              strokeWidth: 1.5,
            }}
          />
        )}
        {mouseOverSeries && (
          <LineSeries
            data={mouseOverSeries.data}
            style={{
              opacity: 1,
              stroke: mouseOverSeries.color,
              strokeWidth: 2,
            }}
          />
        )}
        {peaks && (
          <MarkSeries
            data={peaks}
            size={4}
            strokeType="literal"
            fillType="literal"
            style={{
              opacity: 0.8,
            }}
            onNearestXY={node => {
              if (isMinSize(size, 'small')) {
                setMouseOver(node.id);
              }
            }}
          />
        )}
        {highlightNode && (
          <MarkSeries
            data={[highlightNode]}
            size={4}
            fillType="literal"
            style={{
              opacity: 1,
              stroke: 'black',
            }}
          />
        )}
        {mouseOverNode && (
          <MarkSeries
            data={[mouseOverNode]}
            size={4}
            fillType="literal"
            style={{
              opacity: 1,
              stroke: 'black',
            }}
          />
        )}
        <LineMarkSeries
          data={axisNodes}
          size={2}
          lineStyle={{ stroke: '#041733', strokeWidth: 0.5 }}
          markStyle={{ fill: '#041733', stroke: '#041733' }}
        />
        {hintNode && (
          <Hint
            align={{
              vertical: 'top',
              horizontal: hintAlign,
            }}
            value={hintNode}
            style={{
              pointerEvents: 'all',
              margin: '15px 0',
            }}
          >
            <CountryHint
              onClose={() => setHighlight(null)}
              hasClose={!!highlight}
              country={hintSeries}
              align={hintAlign}
              date={{
                label: config.dateLabel,
                value: intl.formatDate(new Date(hintSeries.max.date)),
              }}
              population={intl.formatNumber(hintSeries.pop)}
              values={
                config &&
                config.hint.map(({ label, column, unit, roundDigits }) => ({
                  label,
                  value: `${intl.formatNumber(
                    Math.round(hintSeries.max[column] * 10 ** roundDigits) /
                      10 ** roundDigits,
                  )}${unit || ''}`,
                }))
              }
            />
          </Hint>
        )}
      </FlexibleWidthXYPlot>
      <AxisLabel axis="x" config={config} />
      <Box margin={{ left: `${margins.left}px` }}>
        <Box margin={{ top: 'medium' }}>
          <KeyCategoryMarkers config={config} />
        </Box>
      </Box>
    </Styled>
  );
}

ChartTimelinePeaks.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  countries: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  config: PropTypes.object,
  mouseOver: PropTypes.string,
  highlight: PropTypes.string,
  setMouseOver: PropTypes.func,
  setHighlight: PropTypes.func,
  intl: intlShape,
};

export default injectIntl(ChartTimelinePeaks);
