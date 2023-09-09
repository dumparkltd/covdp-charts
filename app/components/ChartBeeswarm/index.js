import React, {
  useContext,
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text, ResponsiveContext } from 'grommet';
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
import Title from 'components/Title';
import KeyCategoryMarkers from 'components/KeyCategoryMarkers';
import KeyTarget from 'components/KeyTarget';
import Options from 'components/Options';
// import { CATEGORIES } from 'containers/App/constants';

import { isMinSize } from 'utils/responsive';
import { getHintAlign, formatNumberLabel } from 'utils/charts';

import {
  mapNodes,
  getNodePosition,
  getChartHeight,
  scaleValue,
  scaleGroup,
  getGroupMedians,
} from './utils';

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
  @media (min-width: ${({ theme }) => theme.breakpointsMin.small}) {
    margin-left: 50px;
  }
`;
const XAxisLabelWrap = styled.div`
  margin-bottom: 10px;
  margin-right: 2px;
  text-align: right;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.small}) {
    margin-bottom: 20px;
    margin-right: 20px;
  }
`;
const AxisLabel = styled(p => <Text size="xxsmall" {...p} />)`
  text-transform: uppercase;
  font-family: 'ABCMonumentBold';
  color: white;
  background-color: #041733;
  padding: 1px 2px;
  line-height: 11px;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.small}) {
    padding: 1px 5px;
    line-height: ${({ theme }) => theme.text.xxsmall.height};
  }
`;
const myXAxisLabelFormatter = (v, size, scaleX, groups) => {
  const index = Math.round(scaleX.invert(v) - 0.5);
  // prettier-ignore
  return (
    <tspan style={{ fontFamily: 'ABCMonumentBold' }}>
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
  groups,
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
  const minSize = data && d3.min(data, d => d.sizeRaw);
  const maxSize = config.maxSize || (data && d3.max(data, d => d.sizeRaw));
  const chartHeight = getChartHeight(size);
  const maxHeight = chartHeight - margins.top - margins.bottom;
  const maxWidth = chartWidth - margins.left - margins.right;
  const minDiameter = isMinSize(size, 'small') ? 2 : 2; // px
  const maxDiameter = Math.min(maxHeight * 0.05, maxWidth * 0.04); // px

  const nodes =
    data &&
    mapNodes(data, {
      minSize,
      maxSize,
      minDiameter,
      maxDiameter,
      maxValue,
      maxHeight,
      maxWidth: maxWidth * (maxX / (maxX + 0.75)),
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
    maxWidth: maxWidth * (maxX / (maxX + 0.75)),
    maxX,
  });
  const mouseOverNode = mouseOver && positions.find(n => n.id === mouseOver);
  const highlightNode = highlight && positions.find(n => n.id === highlight);
  const hintNode = highlightNode || mouseOverNode;
  const hintAlign =
    hintNode &&
    getHintAlign({
      xPosition: hintNode.x,
      xMin: 0,
      xMax: maxWidth * (maxX / (maxX + 0.75)),
    });
  const tickValuesY = getTickValuesY({
    maxValue,
    scaleY,
  });

  let medians;
  if (showGroupMedian && config.groupByColumn) {
    medians = getGroupMedians(data);
  }

  const maxOffset =
    positions && d3.max(positions, p => Math.abs(scaleX(p.groupIndex) - p.x));
  return (
    <Styled ref={chartRef}>
      <Title>{config.chartTitle}</Title>
      <Options
        metric={metric}
        setMetric={setMetric}
        setHighlight={setHighlight}
        highlightNode={highlightNode}
        data={data}
        config={config}
      />
      <YAxisLabelWrap>
        <AxisLabel>{config.meta[metric].axisLabel}</AxisLabel>
      </YAxisLabelWrap>
      <FlexibleWidthXYPlot
        height={chartHeight}
        margin={margins}
        style={{
          fill: 'transparent',
          cursor: 'pointer',
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
        <XAxis
          style={{
            ticks: { stroke: '#041733', strokeWidth: 0.5 },
            text: { stroke: 'none' },
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
            text: { stroke: 'none' },
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
                  fontFamily: 'ABCMonument',
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
                  fontFamily: 'ABCMonument',
                  fill: '#041733',
                  fontSize: 12,
                  opacity: 1,
                  maxWidth: '30px',
                }}
                labelAnchorX="start"
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
              fontFamily: 'ABCMonument',
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
              fontFamily: 'ABCMonument',
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
      {!isMinSize(size, 'medium') && (
        <XAxisLabelWrap>
          <AxisLabel>{config.xAxisLabel}</AxisLabel>
        </XAxisLabelWrap>
      )}
      {!isMinSize(size, 'medium') && (
        <KeyCategoryMarkers config={config} includeGroupIDs medians={medians} />
      )}
      {!isMinSize(size, 'medium') && target && <KeyTarget target={target} />}
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
};

export default ChartBeeswarm;
