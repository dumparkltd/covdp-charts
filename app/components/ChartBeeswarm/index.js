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
  Hint,
  YAxis,
  XAxis,
} from 'react-vis';

import CountryHint from 'components/CountryHint';
import Title from 'components/Title';
import KeyCategoryMarkers from 'components/KeyCategoryMarkers';
import Options from 'components/Options';
import { CATEGORIES } from 'containers/App/constants';

import { isMinSize } from 'utils/responsive';

import {
  mapNodes,
  getNodePosition,
  getChartHeight,
  scaleValue,
  scaleGroup,
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
  @media (min-width: ${({ theme }) => theme.breakpoints.small}) {
    margin-left: 50px;
  }
`;
const XAxisLabelWrap = styled.div`
  margin-bottom: 10px;
  margin-right: 2px;
  text-align: right;
  @media (min-width: ${({ theme }) => theme.breakpoints.small}) {
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
  @media (min-width: ${({ theme }) => theme.breakpoints.small}) {
    padding: 1px 5px;
    line-height: ${({ theme }) => theme.text.xxsmall.height};
  }
`;
const myXAxisLabelFormatter = (v, size, scaleX) => {
  const index = scaleX.invert(v) + 0.5;
  // prettier-ignore
  return (
    <tspan style={{ fontFamily: 'ABCMonumentBold' }}>
      {isMinSize(size, 'medium')
        ? Object.values(CATEGORIES.INCOME)[
          Object.keys(CATEGORIES.INCOME).length - index
        ]
        : Object.keys(CATEGORIES.INCOME)[
          Object.keys(CATEGORIES.INCOME).length - index
        ]}
    </tspan>
  );
};
// (value) {
//   return <MyLabel>{value}</MyLabel>;
// }

export function ChartBeeswarm({
  data,
  config,
  metric,
  setMetric,
  setHighlight,
  highlightNode,
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

  const maxValue = config.maxValue || (data && d3.max(data, d => d.value));
  const maxX = data && d3.max(data, d => d.groupIndex);
  const minSize = data && d3.min(data, d => d.sizeRaw);
  const maxSize = data && d3.max(data, d => d.sizeRaw);
  const chartHeight = getChartHeight(size);
  const maxHeight = chartHeight - margins.top - margins.bottom;
  const maxWidth = chartWidth - margins.left - margins.right;
  const minDiameter = isMinSize(size, 'small') ? 3 : 2; // px
  const maxDiameter = Math.min(maxHeight * 0.05, maxWidth * 0.04); // px

  const nodes =
    data &&
    mapNodes(data, {
      minSize,
      maxSize,
      minDiameter,
      maxDiameter,
      maxValue,
      maxHeight: maxHeight * 0.9,
      maxWidth: maxWidth * (maxX / (maxX + 0.5)),
      maxX,
    });
  const positions = nodes && getNodePosition(nodes);

  // prettier-ignore
  const axisNodes = [
    { x: 0, y: maxHeight },
    { x: 0, y: 0 },
    { x: maxWidth, y: 0 },
  ];
  console.log('data', data)
  console.log('config', config)
  const scaleY = scaleValue({ maxHeight: maxHeight * 0.9, maxValue });
  const scaleX = scaleGroup({
    maxWidth: maxWidth * (maxX / (maxX + 0.5)),
    maxX,
  });
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
      >
        <XAxis
          style={{
            ticks: { stroke: '#041733', strokeWidth: 0.5 },
            text: { stroke: 'none' },
          }}
          tickFormat={v => myXAxisLabelFormatter(v, size, scaleX)}
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
          tickFormat={v => scaleY.invert(v)}
          tickValues={[
            0,
            scaleY(2),
            scaleY(4),
            scaleY(6),
            scaleY(8),
            scaleY(10),
          ]}
          tickPadding={isMinSize(size, 'medium') ? 5 : 3}
          tickSizeOuter={isMinSize(size, 'medium') ? 10 : 5}
          tickSizeInner={0}
        />
        {positions && (
          <MarkSeries
            data={positions}
            sizeType="literal"
            colorType="literal"
            style={{ opacity: 0.8 }}
          />
        )}
        <LineMarkSeries
          data={axisNodes}
          size={2}
          lineStyle={{ stroke: '#041733', strokeWidth: 0.5 }}
          markStyle={{ fill: '#041733', stroke: '#041733' }}
        />
      </FlexibleWidthXYPlot>
      {!isMinSize(size, 'medium') && (
        <XAxisLabelWrap>
          <AxisLabel>{config.xAxisLabel}</AxisLabel>
        </XAxisLabelWrap>
      )}
      {!isMinSize(size, 'medium') && (
        <KeyCategoryMarkers categories={config.keyCategories} includeKeys />
      )}
    </Styled>
  );
}

ChartBeeswarm.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  config: PropTypes.object,
};

export default ChartBeeswarm;
