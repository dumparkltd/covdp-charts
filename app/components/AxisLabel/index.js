import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text } from 'grommet';

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
const AxisLabelWrap = styled.div`
  pointer-events: none;
  margin-top: 15px;
  margin-bottom: 8px;
  margin-left: 5px;
  line-height: 12px;
  text-align: ${({ axis }) => axis === 'x' ? 'center' : 'auto'};
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    margin-left: 0;
    text-align: center;
    width: ${({ axis, marginLeft }) =>
    axis === 'y' && marginLeft ? getWidthPx(marginLeft) : 'auto'};
  }
`;
const AxisText = styled(p => <Text size="xsmall" {...p} />)`
  text-transform: uppercase;
  font-family: 'ABCMonumentMonoBold';
  color: #041733;
`;

export function AxisLabel({ chartMarginLeft, config, axis }) {
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
    <AxisLabelWrap axis={axis} marginLeft={chartMarginLeft}>
      <div>
        <AxisText>{label}</AxisText>
      </div>
      {labelAdd && (
        <div>
          <AxisText>{labelAdd}</AxisText>
        </div>
      )}
    </AxisLabelWrap>
  );
}

AxisLabel.propTypes = {
  chartMarginLeft: PropTypes.number,
  config: PropTypes.object,
  axis: PropTypes.string,
};

export default AxisLabel;
