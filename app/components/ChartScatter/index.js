import React, { useContext } from 'react';
import PropTypes from 'prop-types';
// import * as d3 from 'd3';
import styled from 'styled-components';
import { Text, ResponsiveContext } from 'grommet';
import {
  FlexibleWidthXYPlot,
  AreaSeries,
  MarkSeries,
  LineMarkSeries,
  Hint,
  XAxis,
  YAxis,
  // HorizontalGridLines,
  // VerticalGridLines,
} from 'react-vis';

import CountryHint from 'components/CountryHint';
import Title from 'components/Title';
import KeyCategoryMarkers from 'components/KeyCategoryMarkers';
import Options from 'components/Options';

import { mapNodes, getChartHeight } from './utils';

const Styled = styled.div`
  padding-bottom: 10px;
`;
const XAxisLabelWrap = styled.div`
  margin-bottom: 20px;
  margin-right: 10px;
  text-align: right;
`;
const YAxisLabelWrap = styled.div`
  margin-top: 20px;
  margin-left: 50px;
`;
const AxisLabel = styled(p => <Text size="xxsmall" {...p} />)`
  text-transform: uppercase;
  font-family: 'ABCMonumentBold';
  color: white;
  background-color: #041733;
  padding: 1px 5px;
`;

const tickValuesY = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const tickValuesXValues = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const axisNodes = [{ x: 0, y: 100 }, { x: 0, y: 0 }, { x: 100, y: 0 }];
// const tickValuesX = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
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
  xAxisLabel,
  yAxisLabel,
}) {
  const size = useContext(ResponsiveContext);
  const nodes = data && mapNodes(data, { mouseOver, highlight });
  // console.log('nodes', nodes)
  // console.log('config', config)
  const forceRange = [
    { x: xRange[0], y: yRange[0] },
    { x: xRange[1], y: yRange[1] },
  ];
  // const coverRange = [
  //   { x: 0, y: yRange[1], y0: 0 },
  //   { x: xRange[1], y: yRange[1], y0: 0 },
  //   { x: xRange[1], y: 0, y0: 0 },
  // ];
  const mouseOverNode = mouseOver && nodes.find(n => n.id === mouseOver);
  const highlightNode = highlight && nodes.find(n => n.id === highlight);
  // console.log(coverRange)
  return (
    <Styled style={{ border: '1px solid white' }}>
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
        <AxisLabel>{xAxisLabel}</AxisLabel>
      </YAxisLabelWrap>
      <FlexibleWidthXYPlot
        height={getChartHeight(size)}
        margin={{
          bottom: 30,
          top: 10,
          right: 20,
          left: 50,
        }}
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
        {data && <AreaSeries data={forceRange} style={{ opacity: 0 }} />}
        <XAxis
          style={{
            ticks: { stroke: '#041733', strokeWidth: 0.5 },
            text: { stroke: 'none' },
          }}
          tickValues={tickValuesXValues}
          tickPadding={5}
          tickSizeOuter={10}
          tickSizeInner={0}
        />
        <YAxis
          tickFormat={v => `${v}%`}
          style={{
            ticks: { stroke: '#041733', strokeWidth: 0.5 },
            text: { stroke: 'none' },
          }}
          tickValues={tickValuesY}
          tickPadding={5}
          tickSizeOuter={10}
          tickSizeInner={0}
        />
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
              setMouseOver(node.id);
            }}
          />
        )}
        {(highlightNode || mouseOverNode) && (
          <Hint
            align={{ vertical: 'top', horizontal: 'left' }}
            value={highlightNode || mouseOverNode}
            style={{
              pointerEvents: 'none',
              margin: '15px 0',
            }}
          >
            <CountryHint
              country={highlightNode || mouseOverNode}
              config={config}
            />
          </Hint>
        )}
      </FlexibleWidthXYPlot>
      <XAxisLabelWrap>
        <AxisLabel>{yAxisLabel}</AxisLabel>
      </XAxisLabelWrap>
      <KeyCategoryMarkers categories={config.keyCategories} />
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
  xRange: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  yRange: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  config: PropTypes.object,
  metric: PropTypes.string,
  mouseOver: PropTypes.string,
  highlight: PropTypes.string,
  xAxisLabel: PropTypes.string,
  yAxisLabel: PropTypes.string,
  setMetric: PropTypes.func,
  setMouseOver: PropTypes.func,
  setHighlight: PropTypes.func,
};

export default ChartScatter;
