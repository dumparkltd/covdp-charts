import React, { useContext } from 'react';
import PropTypes from 'prop-types';
// import * as d3 from 'd3';
import styled from 'styled-components';
import { Box, Button, Text, ResponsiveContext } from 'grommet';

import CountrySearchSelect from 'components/CountrySearchSelect';

import { isMinSize } from 'utils/responsive';

const LabelChartOption = styled(p => <Text {...p} />)`
  text-align: ${({ align }) => align || 'left'};
  font-size: ${({ theme }) => theme.text.xxsmall.size};
  line-height: ${({ theme }) => theme.text.xxsmall.height};
  color: ${({ theme }) => theme.global.colors.textSecondary};
  @media (min-width: ${({ theme }) => theme.breakpointsMin.small}) {
    font-size: ${({ theme }) => theme.text.xsmall.size};
    line-height: ${({ theme }) => theme.text.xsmall.height};
  }
`;

const ButtonSelectMetricText = styled(p => <Text {...p} />)`
  font-size: ${({ theme }) => theme.text.xsmall.size};
  line-height: ${({ theme }) => theme.text.xsmall.height};
  @media (min-width: ${({ theme }) => theme.breakpointsMin.small}) {
    font-size: ${({ theme }) => theme.text.small.size};
    line-height: ${({ theme }) => theme.text.small.height};
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    font-size: ${({ theme }) => theme.text.medium.size};
    line-height: ${({ theme }) => theme.text.medium.height};
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    font-size: ${({ theme }) => theme.text.large.size};
    line-height: ${({ theme }) => theme.text.large.height};
  }
`;
// prettier-ignore
const ButtonSelectMetric = styled(p => <Button plain {...p} />)`
  fill: transparent;
  cursor: ${({ active }) => active ? 'default' : 'pointer'};
  font-family: 'ABCMonumentBold';
  padding: 3px 8px;
  color: ${({ theme, active }) =>
    active ? theme.global.colors.white : theme.global.colors.black};
  background-color: ${({ theme, active }) =>
    active ? theme.global.colors.buttonActiveBG : theme.global.colors.buttonBG};
  &:hover {
    background-color: ${({ theme, active }) =>
    active ? theme.global.colors.buttonActiveBG : theme.global.colors.buttonHoverBG} !important;
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.small}) {
    padding: 3px 15px;
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
  let wrap = false;
  if (
    config.metricOptions &&
    !isMinSize(size, 'medium') &&
    config.metricOptions.length > 2
  ) {
    wrap = true;
  }
  return (
    <Box
      direction={wrap ? 'column' : 'row'}
      gap={wrap ? 'medium' : null}
      justify={wrap ? 'start' : 'between'}
      align={wrap ? 'start' : 'end'}
    >
      {!config.metricOptions && <Box />}
      {config.metricOptions && (
        <Box gap="hair">
          <LabelChartOption>{config.metricOptionLabel}</LabelChartOption>
          <Box
            direction="row"
            gap={isMinSize(size, 'medium') ? 'xsmall' : 'xxsmall'}
          >
            {config.metricOptions.map(option => (
              <ButtonSelectMetric
                key={option}
                onClick={() => setMetric(option)}
                active={option === metric}
              >
                <Box>
                  <ButtonSelectMetricText>
                    {config.meta[option].label}
                  </ButtonSelectMetricText>
                </Box>
              </ButtonSelectMetric>
            ))}
          </Box>
        </Box>
      )}
      <Box gap="hair">
        {isMinSize(size, 'medium') && (
          <LabelChartOption align={wrap ? 'left' : 'right'}>
            Search country
          </LabelChartOption>
        )}
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
