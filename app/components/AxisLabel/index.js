import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text, Box, ResponsiveContext } from 'grommet';

import { isMinSize } from 'utils/responsive';

// const XAxisLabelWrap = styled.div`
//   margin-bottom: 10px;
//   margin-right: 2px;
//   text-align: right;
//   @media (min-width: ${({ theme }) => theme.breakpointsMin.small}) {
//     margin-bottom: 20px;
//     margin-right: 20px;
//   }
// `;

const getWidthPx = margin => `${margin * 2}px`;

// prettier-ignore
const AxisLabelWrap = styled(p => <Box {...p} />)`
  pointer-events: none;
  margin-top: 12px;
  margin-bottom: 3px;
  margin-left:  ${({ axis, chartMargins }) =>
    axis !== 'y' && chartMargins && chartMargins.left ? chartMargins.left : 5}px;
  margin-right:  ${({ axis, chartMargins }) =>
    axis !== 'y' && chartMargins && chartMargins.right ? chartMargins.right : 5}px;
  line-height: 12px;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    margin-top: 15px;
    margin-bottom: 8px;
    text-align: center;
    width: ${({ axis, chartMargins }) =>
    axis === 'y' && chartMargins && chartMargins.left
      ? getWidthPx(chartMargins.left)
      : 'auto'};
  }
`;
const AxisText = styled(p => <Text size="xsmall" {...p} />)`
  text-transform: uppercase;
  font-family: 'Roboto Mono', monospace;
  font-weight: 700;
  color: #041733;
`;

export function AxisLabel({ chartMargins, config, axis }) {
  const size = useContext(ResponsiveContext);
  const {
    yAxisLabel,
    xAxisLabel,
    yAxisLabelAdditional,
    xAxisLabelAdditional,
  } = config;
  let label = 'unspecified';
  if (axis === 'y' && yAxisLabel) {
    label = yAxisLabel;
  } else if (axis === 'x' && xAxisLabel) {
    label = xAxisLabel;
  }
  let labelAdd;
  if (axis === 'y' && yAxisLabelAdditional) {
    labelAdd = yAxisLabelAdditional;
  } else if (axis === 'x' && xAxisLabelAdditional) {
    labelAdd = xAxisLabelAdditional;
  }
  return (
    <AxisLabelWrap
      direction={isMinSize(size, 'medium') ? 'column' : 'row'}
      justify={axis === 'x' ? 'center' : 'start'}
      wrap={!isMinSize(size, 'medium')}
      axis={axis}
      chartMargins={chartMargins}
    >
      <Box>
        <AxisText>{label}</AxisText>
      </Box>
      {!isMinSize(size, 'medium') && <span>&nbsp;</span>}
      {labelAdd && (
        <Box>
          <AxisText>{labelAdd}</AxisText>
        </Box>
      )}
    </AxisLabelWrap>
  );
}

AxisLabel.propTypes = {
  chartMargins: PropTypes.object,
  config: PropTypes.object,
  axis: PropTypes.string,
};

export default AxisLabel;
