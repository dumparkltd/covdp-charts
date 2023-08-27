import React, { useContext } from 'react';
import PropTypes from 'prop-types';
// import * as d3 from 'd3';
import styled from 'styled-components';
import { Box, Button, Text, ResponsiveContext } from 'grommet';

import CountrySearchSelect from 'components/CountrySearchSelect';

import { isMinSize } from 'utils/responsive';

const LabelChartOption = styled(p => <Text size="xsmall" {...p} />)`
  color: ${({ theme }) => theme.global.colors.textSecondary};
`;

// prettier-ignore
const ButtonSelectMetric = styled(p => <Button plain {...p} />)`
  fill: transparent;
  cursor: pointer;
  font-family: 'ABCMonumentBold';
  padding: 3px 15px;
  background-color: ${({ theme, active }) =>
    active ? theme.global.colors.buttonActiveBG : 'transparent'};
  &:hover {
    background-color: ${({ theme }) =>
    theme.global.colors.buttonHoverBG} !important;
  }
`;

// const tickValuesX = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
// d3.max(data, d => d.value)
// d3.extent(data, d => d.size)
export function Options({
  setMetric,
  metric,
  config,
  data,
  highlightNode,
  setHighlight,
}) {
  const size = useContext(ResponsiveContext);
  return (
    <Box
      margin={{ top: 'small' }}
      direction={isMinSize(size, 'medium') ? 'row' : 'column'}
      gap="medium"
    >
      {config.metricOptions && (
        <Box gap="hair">
          <LabelChartOption>{config.metricOptionLabel}</LabelChartOption>
          <Box direction="row" gap="xsmall">
            {config.metricOptions.map(option => (
              <ButtonSelectMetric
                key={option}
                label={config.meta[option].label}
                onClick={() => setMetric(option)}
                active={option === metric}
              />
            ))}
          </Box>
        </Box>
      )}
      <Box gap="hair">
        <LabelChartOption>Select country or area</LabelChartOption>
        <Box>
          <CountrySearchSelect
            selected={highlightNode}
            onSelect={key => setHighlight(key)}
            options={data}
          />
        </Box>
      </Box>
    </Box>
  );
}

Options.propTypes = {
  metric: PropTypes.string,
  setMetric: PropTypes.func,
  setHighlight: PropTypes.func,
  highlightNode: PropTypes.object,
  config: PropTypes.object,
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

export default Options;
