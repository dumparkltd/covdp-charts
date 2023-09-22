import React, {
  useContext,
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { Box, ResponsiveContext } from 'grommet';
import * as d3 from 'd3';
import {
  FlexibleWidthXYPlot,
  LineMarkSeries,
  MarkSeries,
  LineSeries,
  YAxis,
  XAxis,
  LabelSeries,
  Hint,
} from 'react-vis';

import CountryHint from 'components/CountryHint';
import NoDataHint from 'components/NoDataHint';
import KeyCategoryMarkers from 'components/KeyCategoryMarkers';
import KeyTarget from 'components/KeyTarget';
import KeyMedian from 'components/KeyMedian';
import KeyAverage from 'components/KeyAverage';
import KeyPopulation from 'components/KeyPopulation';
import Options from 'components/Options';
import AxisLabel from 'components/AxisLabel';
// import { CATEGORIES } from 'containers/App/constants';

import { isMinSize } from 'utils/responsive';
import { getHintAlign, formatNumberLabel } from 'utils/charts';

import {
  mapNodes,
  getNodePosition,
  getChartHeight,
  scaleValue,
  scaleGroup,
  scaleSize,
  getGroupMedians,
  getGroupAverages,
} from './utils';

const chartMargins = {
  bottom: 30,
  top: 10,
  right: 20,
  left: 80,
};
const chartMarginsSmall = {
  bottom: 20,
  top: 10,
  right: 12,
  left: 40,
};

const Styled = styled.div`
  padding-bottom: 10px;
`;

const myXAxisLabelFormatter = (v, size, scaleX, groups) => {
  const index = Math.round(scaleX.invert(v) - 0.5);
  // prettier-ignore
  return (
    <tspan>
      {isMinSize(size, 'medium')
        ? Object.values(groups)[index]
        : Object.keys(groups)[index]
      }
    </tspan>
  );
};
// (value) {
//   return <MyLabel>{value}</MyLabel>;
// }

const getTickValuesY = ({ maxValue, scaleY }) => {
  if (maxValue >= 100) {
    return [0, scaleY(20), scaleY(40), scaleY(60), scaleY(80), scaleY(100)];
  }
  return [0, scaleY(2), scaleY(4), scaleY(6), scaleY(8), scaleY(10)];
};
const spaceRight = 0.5;
const spaceRightWithTarget = 1;
export function ChartBeeswarm({
  data,
  config,
  metric,
  setMetric,
  setHighlight,
  highlight,
  target,
  setMouseOver,
  mouseOver,
  showGroupMedian,
  showGroupAverage,
  groups,
  countries,
}) {
  const size = useContext(ResponsiveContext);
  const margins = isMinSize(size, 'medium') ? chartMargins : chartMarginsSmall;

  const chartRef = useRef();
  const [chartWidth, setChartWidth] = useState(0);
  const handleResize = () => {
    if (chartRef.current) {
      setChartWidth(chartRef.current.offsetWidth);
    }
  };
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useLayoutEffect(() => {
    handleResize();
  }, []);

  const maxValue =
    config.maxValue || (data && Math.ceil(d3.max(data, d => d.value)));
  const maxX = data && d3.max(data, d => d.groupIndex);
  // const minSize = data && d3.min(data, d => d.sizeRaw);
  const maxSize = config.maxSize || (data && d3.max(data, d => d.sizeRaw));
  const chartHeight = getChartHeight(size);
  const maxHeight = chartHeight - margins.top - margins.bottom;
  const maxWidth = chartWidth - margins.left - margins.right;
  let minDiameter = config.minDiameter || 2.2; // in px scales to 10million
  if (!isMinSize(size, 'medium')) {
    minDiameter = config.minDiameterSmall || 2; // in px scales to 10million
  }
  const maxDiameter = isMinSize(size, 'medium')
    ? Math.min(maxHeight * 0.06, maxWidth * 0.05)
    : Math.min(maxHeight * 0.05, maxWidth * 0.05); // px
  const spaceRightFinal =
    isMinSize(size, 'medium') && target ? spaceRightWithTarget : spaceRight;

  const nodes =
    data &&
    mapNodes(data, {
      maxSize,
      minDiameter,
      maxDiameter,
      maxValue,
      maxHeight,
      maxWidth: maxWidth * (maxX / (maxX + spaceRightFinal)),
      maxX,
      mouseOver,
      highlight,
    });
  const positions = nodes && getNodePosition(nodes, { maxWidth, maxHeight });

  // prettier-ignore
  const axisNodes = [
    { x: 0, y: maxHeight },
    { x: 0, y: 0 },
    { x: maxWidth, y: 0 },
  ];
  const scaleY = scaleValue({ maxHeight, maxValue });
  const scaleX = scaleGroup({
    maxWidth: maxWidth * (maxX / (maxX + spaceRightFinal)),
    maxX,
  });
  const scaleZ = scaleSize({ maxSize, maxDiameter });
  const mouseOverNode = mouseOver && positions.find(n => n.id === mouseOver);
  const highlightNode = highlight && positions.find(n => n.id === highlight);
  let highlightAlt;
  if (highlight && !highlightNode && countries) {
    highlightAlt = countries.find(c => c.iso === highlight);
    highlightAlt.label = highlightAlt.name_short;
  }
  const hintNode = highlightNode || mouseOverNode;
  const hintAlign =
    hintNode &&
    getHintAlign({
      xPosition: hintNode.x,
      xMin: 0,
      xMax: maxWidth * (maxX / (maxX + spaceRightFinal)),
    });
  const tickValuesY = getTickValuesY({
    maxValue,
    scaleY,
  });

  let medians;
  if (showGroupMedian && config.groupByColumn) {
    medians = getGroupMedians(data);
  }
  let averages;
  if (showGroupAverage && config.groupByColumn) {
    averages = getGroupAverages(data);
  }

  const maxOffset =
    positions && d3.max(positions, p => Math.abs(scaleX(p.groupIndex) - p.x));
  const minValue =
    minDiameter && Math.round(scaleZ.invert(minDiameter) / 1000000);

  return (
    <Styled ref={chartRef}>
      <Box margin={{ bottom: 'large' }}>
        <Options
          metric={metric}
          setMetric={setMetric}
          setHighlight={setHighlight}
          highlightNode={highlightNode || highlightAlt}
          data={data}
          config={config}
          countries={countries}
        />
      </Box>
      <AxisLabel
        axis="y"
        config={{
          yAxisLabel: config.meta[metric].axisLabel,
          yAxisLabelAdditional: config.meta[metric].axisLabelAdditional,
        }}
        chartMargins={margins}
      />

      <FlexibleWidthXYPlot
        height={chartHeight}
        margin={margins}
        style={{
          fill: 'transparent',
          cursor: 'pointer',
          fontFamily: 'roboto-mono-bold',
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
          tickFormat={v => myXAxisLabelFormatter(v, size, scaleX, groups)}
          tickValues={[scaleX(0.5), scaleX(1.5), scaleX(2.5), scaleX(3.5)]}
          tickPadding={isMinSize(size, 'medium') ? 5 : 3}
          tickSizeOuter={isMinSize(size, 'medium') ? 10 : 5}
          tickSizeInner={0}
        />
        <YAxis
          style={{
            ticks: { stroke: '#041733', strokeWidth: 0.5 },
            text: { fill: '#041733', stroke: 'none', fontSize: '13px' },
          }}
          tickFormat={v =>
            config.isPercentage
              ? `${Math.round(scaleY.invert(v))}%`
              : Math.round(scaleY.invert(v))
          }
          tickValues={tickValuesY}
          tickPadding={isMinSize(size, 'medium') ? 5 : 3}
          tickSizeOuter={isMinSize(size, 'medium') ? 10 : 5}
          tickSizeInner={0}
        />
        {target && (
          <LineSeries
            data={[
              {
                x: 0,
                y: scaleY(target.value),
              },
              {
                x: maxWidth,
                y: scaleY(target.value),
              },
            ]}
            style={{ stroke: '#041733', strokeWidth: 0.5, opacity: 0.6 }}
            strokeDasharray={[8, 4]}
          />
        )}
        {medians &&
          Object.keys(medians).map(groupId => {
            const groupIndex = Object.keys(groups).indexOf(groupId);
            const x = scaleX(groupIndex + 0.5);
            return (
              <LineSeries
                key={groupId}
                animation
                data={[
                  {
                    x: x - maxOffset * 1.2,
                    y: scaleY(medians[groupId]),
                  },
                  {
                    x: x + maxOffset * 1.2,
                    y: scaleY(medians[groupId]),
                  },
                ]}
                style={{ stroke: '#041733', strokeWidth: 1, opacity: 1 }}
              />
            );
          })}
        {medians &&
          isMinSize(size, 'medium') &&
          Object.keys(medians).map(groupId => {
            const groupIndex = Object.keys(groups).indexOf(groupId);
            const x = scaleX(groupIndex + 0.5);
            return (
              <LabelSeries
                key={groupId}
                animation
                data={[
                  {
                    x: x + maxOffset * 1.2,
                    y: scaleY(medians[groupId]),
                    label: formatNumberLabel({
                      value: medians[groupId],
                      isPercentage: config.isPercentage,
                    }),
                    xOffset: 5,
                  },
                ]}
                style={{
                  fontFamily: "'aktiv-grotesk', sans-serif",
                  stroke: '#F6F7FC',
                  strokeWidth: '6px',
                  fontSize: 12,
                  opacity: 1,
                  maxWidth: '30px',
                }}
                labelAnchorX="start"
                labelAnchorY="middle"
              />
            );
          })}
        {medians &&
          Object.keys(medians).map(groupId => {
            const groupIndex = Object.keys(groups).indexOf(groupId);
            let x = scaleX(groupIndex + 0.5);
            let labelAnchorX;
            let xOffset;
            if (
              isMinSize(size, 'small') ||
              !config.medianPosition ||
              !config.medianPosition[groupId] ||
              config.medianPosition[groupId] === 'start'
            ) {
              labelAnchorX = 'start';
              xOffset = isMinSize(size, 'small') ? 5 : 2;
              x += maxOffset * 1.2;
            } else {
              labelAnchorX = config.medianPosition[groupId];
              xOffset = -2;
              x -= maxOffset * 1.2;
            }
            return (
              <LabelSeries
                key={groupId}
                animation
                data={[
                  {
                    x,
                    y: scaleY(medians[groupId]),
                    label: formatNumberLabel({
                      value: medians[groupId],
                      isPercentage: config.isPercentage,
                    }),
                    xOffset,
                  },
                ]}
                style={{
                  fontFamily: "'aktiv-grotesk', sans-serif",
                  fill: '#041733',
                  fontSize: isMinSize(size, 'small') ? 12 : 11,
                  opacity: 1,
                  maxWidth: '30px',
                }}
                labelAnchorX={labelAnchorX}
                labelAnchorY="middle"
              />
            );
          })}
        {averages &&
          Object.keys(averages).map(groupId => {
            const groupIndex = Object.keys(groups).indexOf(groupId);
            const x = scaleX(groupIndex + 0.5);
            return (
              <LineSeries
                key={groupId}
                animation
                data={[
                  {
                    x: x - maxOffset * 1.2,
                    y: scaleY(averages[groupId]),
                  },
                  {
                    x: x + maxOffset * 1.2,
                    y: scaleY(averages[groupId]),
                  },
                ]}
                style={{ stroke: '#041733', strokeWidth: 1, opacity: 1 }}
              />
            );
          })}
        {averages &&
          isMinSize(size, 'medium') &&
          Object.keys(averages).map(groupId => {
            const groupIndex = Object.keys(groups).indexOf(groupId);
            const x = scaleX(groupIndex + 0.5);
            return (
              <LabelSeries
                key={groupId}
                animation
                data={[
                  {
                    x: x + maxOffset * 1.2,
                    y: scaleY(averages[groupId]),
                    label: formatNumberLabel({
                      value: averages[groupId],
                      isPercentage: config.isPercentage,
                    }),
                    xOffset: 5,
                  },
                ]}
                style={{
                  fontFamily: "'aktiv-grotesk', sans-serif",
                  stroke: '#F6F7FC',
                  strokeWidth: '6px',
                  fontSize: 12,
                  opacity: 1,
                  maxWidth: '30px',
                }}
                labelAnchorX="start"
                labelAnchorY="middle"
              />
            );
          })}
        {averages &&
          Object.keys(averages).map(groupId => {
            const groupIndex = Object.keys(groups).indexOf(groupId);
            let x = scaleX(groupIndex + 0.5);
            let labelAnchorX;
            let xOffset;
            if (
              isMinSize(size, 'small') ||
              !config.medianPosition ||
              !config.medianPosition[groupId] ||
              config.medianPosition[groupId] === 'start'
            ) {
              labelAnchorX = 'start';
              xOffset = isMinSize(size, 'small') ? 5 : 2;
              x += maxOffset * 1.2;
            } else {
              labelAnchorX = config.medianPosition[groupId];
              xOffset = -2;
              x -= maxOffset * 1.2;
            }
            return (
              <LabelSeries
                key={groupId}
                animation
                data={[
                  {
                    x,
                    y: scaleY(averages[groupId]),
                    label: formatNumberLabel({
                      value: averages[groupId],
                      isPercentage: config.isPercentage,
                    }),
                    xOffset,
                  },
                ]}
                style={{
                  fontFamily: "'aktiv-grotesk', sans-serif",
                  fill: '#041733',
                  fontSize: isMinSize(size, 'small') ? 12 : 11,
                  opacity: 1,
                  maxWidth: '30px',
                }}
                labelAnchorX={labelAnchorX}
                labelAnchorY="middle"
              />
            );
          })}
        {target && isMinSize(size, 'medium') && (
          <LabelSeries
            data={[
              {
                x: maxWidth,
                y: scaleY(target.value),
                yOffset: target.label2 ? -20 : -8,
                label: target.label,
              },
            ]}
            style={{
              fontFamily: "'aktiv-grotesk', sans-serif",
              fill: '#041733',
              fontSize: 12,
              opacity: 0.8,
              maxWidth: '30px',
            }}
            labelAnchorX="end"
            labelAnchorY="text-bottom"
            allowOffsetToBeReversed={false}
          />
        )}
        {isMinSize(size, 'medium') && target && target.label2 && (
          <LabelSeries
            data={[
              {
                x: maxWidth,
                y: scaleY(target.value),
                yOffset: -8,
                label: target.label2,
              },
            ]}
            style={{
              fontFamily: "'aktiv-grotesk', sans-serif",
              fill: '#041733',
              fontSize: 12,
              opacity: 0.8,
              maxWidth: '30px',
            }}
            labelAnchorX="end"
            labelAnchorY="text-bottom"
            allowOffsetToBeReversed={false}
          />
        )}
        {positions && (
          <MarkSeries
            data={positions}
            sizeType="literal"
            fillType="literal"
            strokeType="literal"
            onNearestXY={node => {
              // console.log(node);
              if (isMinSize(size, 'small')) {
                setMouseOver(node.id);
              }
            }}
          />
        )}
        <LineMarkSeries
          data={axisNodes}
          size={2}
          lineStyle={{ stroke: '#041733', strokeWidth: 0.5 }}
          markStyle={{ fill: '#041733', stroke: '#041733' }}
        />
        {highlightAlt && (
          <Hint
            align={{
              vertical: 'top',
              horizontal: 'right',
            }}
            value={{
              x: maxWidth / 2,
              y: maxHeight / 2,
            }}
            style={{
              pointerEvents: 'all',
              margin: '15px 0',
            }}
          >
            <NoDataHint country={highlightAlt} metricType={config.metricType} />
          </Hint>
        )}
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
              country={hintNode}
              align={hintAlign}
            />
          </Hint>
        )}
      </FlexibleWidthXYPlot>
      <AxisLabel axis="x" config={config} chartMargins={margins} />
      {!isMinSize(size, 'medium') && (
        <Box margin={{ left: `${margins.left}px` }} gap="small">
          <Box margin={{ top: 'medium' }}>
            <KeyCategoryMarkers config={config} includeGroupIDs />
          </Box>
          {medians && <KeyMedian />}
          {averages && <KeyAverage />}
          {target && <KeyTarget target={target} strokeDasharray={[8, 4]} />}
          {scaleZ && (
            <Box margin={{ top: 'small' }}>
              <KeyPopulation scaleSize={scaleZ} minValue={minValue} />
            </Box>
          )}
        </Box>
      )}
      {isMinSize(size, 'medium') && (
        <Box
          margin={{ top: 'medium' }}
          gap="medium"
          align="center"
          justify="center"
          direction="row"
        >
          {scaleZ && minValue && (
            <KeyPopulation scaleSize={scaleZ} minValue={minValue} />
          )}
          {medians && <KeyMedian />}
          {averages && <KeyAverage />}
        </Box>
      )}
    </Styled>
  );
}

ChartBeeswarm.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  config: PropTypes.object,
  target: PropTypes.object,
  groups: PropTypes.object,
  metric: PropTypes.string,
  setMetric: PropTypes.func,
  mouseOver: PropTypes.string,
  setMouseOver: PropTypes.func,
  highlight: PropTypes.string,
  setHighlight: PropTypes.func,
  showGroupMedian: PropTypes.bool,
  showGroupAverage: PropTypes.bool,
  countries: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

export default ChartBeeswarm;
