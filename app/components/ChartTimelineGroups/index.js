import React, {
  useContext,
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ResponsiveContext, Box } from 'grommet';
import * as d3 from 'd3';
import { utcFormat as timeFormat } from 'd3-time-format';
import { injectIntl, intlShape } from 'react-intl';

import {
  FlexibleWidthXYPlot,
  LineMarkSeries,
  MarkSeries,
  LineSeries,
  LabelSeries,
  XAxis,
  YAxis,
  AreaSeries,
  Hint,
  // HorizontalGridLines,
  // VerticalGridLines,
} from 'react-vis';

import KeyCategoryMarkers from 'components/KeyCategoryMarkers';
import KeyLineRange from 'components/KeyLineRange';
import KeyTarget from 'components/KeyTarget';
import AxisLabel from 'components/AxisLabel';
import CountryHint from 'components/CountryHint';
import Options from 'components/Options';

import { isMinSize } from 'utils/responsive';
import { getHintAlign } from 'utils/charts';

import {
  mapNodes,
  mapRangeNodes,
  groupNodes,
  getChartHeight,
  getTickValuesX,
  getHintValues,
} from './utils';

const chartMargins = {
  bottom: 30,
  top: 10,
  right: 70,
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
const SeriesLabelWrap = styled.div`
  max-width: ${({ marginRight }) => marginRight}px;
  padding-left: 3px;
  transform: translateY(
    ${({ value }) => (value.position === 'center' ? 50 : 0)}%
  );
  @media (min-width: ${({ theme }) => theme.breakpointsMin.small}) {
    padding-left: 9px;
  }
`;
const SeriesLabel = styled.div`
  font-family: 'ABCMonument';
  color: #041733;
  font-size: 13px;
  line-height: 15px;
  background-color: #f6f7fc;
  padding-left: 4px;
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

// ms per px
// const getDX = ({ xMin, xMax, chartWidth }) => (xMax - xMin) / chartWidth; // in ms
const monthInMS = 1000 * 60 * 60 * 24 * 45;
export function ChartTimelineGroups({
  data,
  config,
  seriesColumn,
  seriesLabels,
  target,
  seriesLabelsPosition,
  setMouseOver,
  mouseOver,
  seriesMouseOver,
  setSeriesMouseOver,
  intl,
  metric,
  setMetric,
}) {
  const [chartWidth, setChartWidth] = useState(0);
  const targetRef = useRef();
  const handleResize = () => {
    if (targetRef.current) {
      setChartWidth(targetRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useLayoutEffect(() => {
    handleResize();
  }, []);

  const size = useContext(ResponsiveContext);

  const nodes = data && mapNodes({ data, seriesColumn, seriesLabels });
  const seriesNodes = data && groupNodes({ nodes, seriesColumn });
  const range =
    metric === 'median' &&
    data &&
    config.metrics.lower &&
    config.metrics.upper &&
    mapRangeNodes(data);

  const seriesRange = range && groupNodes({ nodes: range, seriesColumn });
  // const seriesRangeF =
  //   seriesRange && mouseOver && seriesRange.filter(s => s.id === mouseOver);
  const labelData =
    data &&
    seriesNodes.map(series => {
      const lastNode = series.data[series.data.length - 1];
      const position = seriesLabelsPosition
        ? seriesLabelsPosition[series.id]
        : 'center';
      return {
        id: series.id,
        label: seriesLabels[series.id],
        x: lastNode.x,
        y: lastNode.y,
        position,
        yOffset: position === 'top' ? -13 : 15,
      };
    });
  const xRange = data ? d3.extent(nodes, d => d.x) : [0, 100];
  let yRange = [0, 10];
  if (range) {
    yRange = d3.extent(nodes, d => d.yValueUpper);
  } else if (data) {
    yRange = d3.extent(nodes, d => d.y);
  }

  const xMin = xRange[0] - monthInMS;
  const xMax = isMinSize(size, 'medium')
    ? xRange[1] + monthInMS
    : xRange[1] + 2 * monthInMS;
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

  const margins = isMinSize(size, 'medium') ? chartMargins : chartMarginsSmall;
  const dx = (xMax - xMin) / chartWidth; // in ms
  const chartPaddingRight = monthInMS / dx;
  const hintAlign =
    mouseOver &&
    getHintAlign({
      xPosition: mouseOver.x,
      xMin,
      xMax,
      threshold: 0.3,
    });
  return (
    <Styled ref={targetRef}>
      {config.metricOptions && (
        <Box margin={{ bottom: 'medium' }}>
          <Options metric={metric} setMetric={setMetric} config={config} />
        </Box>
      )}
      <AxisLabel axis="y" config={config} chartMargins={margins} />
      <FlexibleWidthXYPlot
        xType="time"
        height={getChartHeight(size)}
        margin={margins}
        style={{
          fill: 'transparent',
          cursor: 'pointer',
          fontFamily: 'ABCMonumentMonoBold',
        }}
        onMouseLeave={() => {
          if (setMouseOver) setMouseOver(null);
          if (setSeriesMouseOver) setSeriesMouseOver(null);
        }}
      >
        {data && (
          <XAxis
            tickFormat={v => formatXLabels({ v, size })}
            tickValues={tickValuesX}
            style={{
              ticks: { stroke: '#041733', strokeWidth: 0.5 },
              text: { fill: '#041733', stroke: 'none', fontSize: '13px' },
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
              text: { fill: '#041733', stroke: 'none', fontSize: '13px' },
            }}
            tickPadding={isMinSize(size, 'medium') ? 5 : 3}
            tickSizeOuter={isMinSize(size, 'medium') ? 10 : 5}
            tickSizeInner={0}
          />
        )}
        {seriesNodes &&
          labelData &&
          labelData.map(label => (
            <Hint
              key={label.id}
              value={label}
              align={{
                horizontal: 'right',
                vertical: label.position === 'bottom' ? 'bottom' : 'top',
              }}
            >
              <SeriesLabelWrap
                value={label}
                marginRight={
                  isMinSize(size, 'medium')
                    ? margins.right + chartPaddingRight
                    : margins.right + chartPaddingRight * 2
                }
              >
                <SeriesLabel>
                  {isMinSize(size, 'medium') ? label.label : label.id}
                </SeriesLabel>
              </SeriesLabelWrap>
            </Hint>
          ))}
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
        {seriesRange &&
          seriesRange.map(series => (
            <AreaSeries
              data={series.data}
              key={series.id}
              opacity={series.id === seriesMouseOver ? 0.15 : 0.04}
              style={{
                fill: series.color,
                stroke: 'transparent',
                strokeWidth: 0,
              }}
            />
          ))}
        {seriesNodes &&
          seriesNodes.map(series => (
            <LineSeries
              animation
              data={series.data}
              key={series.id}
              style={{
                stroke: series.color,
                strokeWidth: isMinSize(size, 'medium') ? 2 : 1.5,
              }}
            />
          ))}
        {nodes && (
          <MarkSeries
            animation
            data={nodes}
            size={isMinSize(size, 'medium') ? 3.5 : 2.5}
            colorType="literal"
            onNearestXY={value => {
              if (setSeriesMouseOver) {
                setSeriesMouseOver(value[seriesColumn]);
              }
              if (setMouseOver) {
                setMouseOver(value);
              }
            }}
          />
        )}
        {isMinSize(size, 'small') && nodes && mouseOver && (
          <MarkSeries
            data={[mouseOver]}
            size={isMinSize(size, 'medium') ? 3.5 : 2.5}
            colorType="literal"
            style={{ stroke: 'black' }}
          />
        )}
        {isMinSize(size, 'medium') && target && (
          <LabelSeries
            data={[
              {
                x: xMax,
                y: target.value,
                yOffset: 15,
                xOffset: -120,
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
        <LineMarkSeries
          data={axisNodes}
          size={2}
          lineStyle={{ stroke: '#041733', strokeWidth: 0.5 }}
          markStyle={{ fill: '#041733', stroke: '#041733' }}
          style={{ pointerEvents: 'none' }}
        />
        {isMinSize(size, 'medium') && mouseOver && (
          <Hint
            value={mouseOver}
            align={{
              vertical: 'top',
              horizontal: hintAlign,
            }}
            style={{
              pointerEvents: 'none',
              margin: '15px 0',
            }}
          >
            <CountryHint
              align={hintAlign}
              date={{
                label: config.xAxisLabel,
                value: intl.formatDate(new Date(mouseOver.x), {
                  year: 'numeric',
                  month: 'long',
                }),
              }}
              valueGroupTitle={`${config.yAxisLabel} ${
                config.yAxisLabelAdditional
              }`}
              values={getHintValues({
                hint: mouseOver,
                metrics: config.metrics,
                metric,
              })}
            />
          </Hint>
        )}
      </FlexibleWidthXYPlot>
      <AxisLabel axis="x" config={config} chartMargins={margins} />
      <Box margin={{ left: `${margins.left}px` }}>
        {!isMinSize(size, 'medium') && config.keyCategories && (
          <Box margin={{ top: 'medium' }}>
            <KeyCategoryMarkers config={config} includeGroupIDs />
          </Box>
        )}
        {metric === 'median' && range && (
          <Box margin={{ top: 'medium' }}>
            <KeyLineRange />
          </Box>
        )}
        {!isMinSize(size, 'medium') && target && (
          <Box margin={{ top: 'small' }}>
            <KeyTarget target={target} strokeDasharray={[8, 4]} />
          </Box>
        )}
      </Box>
    </Styled>
  );
}

ChartTimelineGroups.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  config: PropTypes.object,
  seriesColumn: PropTypes.string,
  seriesLabels: PropTypes.object,
  seriesLabelsPosition: PropTypes.object,
  target: PropTypes.object,
  mouseOver: PropTypes.object,
  setMouseOver: PropTypes.func,
  seriesMouseOver: PropTypes.string,
  setSeriesMouseOver: PropTypes.func,
  setMetric: PropTypes.func,
  metric: PropTypes.string,
  intl: intlShape,
};

export default injectIntl(ChartTimelineGroups);
