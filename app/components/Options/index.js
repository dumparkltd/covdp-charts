import React, { useContext } from 'react';
import PropTypes from 'prop-types';
// import * as d3 from 'd3';
import styled from 'styled-components';
import { Box, Button, Text, ResponsiveContext } from 'grommet';

import CountrySearchSelect from 'components/CountrySearchSelect';

import { isMinSize } from 'utils/responsive';

const LabelChartOption = styled(p => <Text {...p} />)`
  text-align: ${({ align }) => align || 'left'};
  font-size: ${({ theme }) => theme.text.xsmall.size};
  line-height: ${({ theme }) => theme.text.xsmall.height};
  color: ${({ theme }) => theme.global.colors.text};
  @media (min-width: ${({ theme }) => theme.breakpointsMin.small}) {
    font-size: ${({ theme }) => theme.text.small.size};
    line-height: ${({ theme }) => theme.text.small.height};
  }
`;

const ButtonSelectMetricText = styled(p => <Text {...p} />)`
  font-family: 'DM Sans', sans-serif;
  font-weight: 700;
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
const ButtonSelectMetricTextSecondary = styled(p => <Text {...p} />)`
  font-family: 'DM Sans', sans-serif;
  font-weight: 400;
  font-size: ${({ theme }) => theme.text.xxsmall.size};
  line-height: ${({ theme }) => theme.text.xxsmall.height};
  @media (min-width: ${({ theme }) => theme.breakpointsMin.small}) {
    font-size: ${({ theme }) => theme.text.xxsmall.size};
    line-height: ${({ theme }) => theme.text.xxsmall.height};
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    font-size: ${({ theme }) => theme.text.xsmall.size};
    line-height: ${({ theme }) => theme.text.xsmall.height};
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    font-size: ${({ theme }) => theme.text.small.size};
    line-height: ${({ theme }) => theme.text.small.height};
  }
`;
// prettier-ignore
const ButtonSelectMetric = styled(p => <Button plain {...p} />)`
  fill: transparent;
  cursor: ${({ active }) => active ? 'default' : 'pointer'};
  padding: 3px 8px;
  text-align: center;
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
  let justify = config.metricOptions ? 'between' : 'end';
  if (!isMinSize(size, 'medium')) {
    wrap = true;
    justify = 'start';
  }
  return (
    <Box
      direction={wrap ? 'column' : 'row'}
      gap={wrap ? 'medium' : null}
      justify={justify}
      align={wrap ? 'start' : 'end'}
    >
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
                  {config.meta[option].labelAdditional && (
                    <ButtonSelectMetricTextSecondary>
                      {`(${config.meta[option].labelAdditional})`}
                    </ButtonSelectMetricTextSecondary>
                  )}
                </Box>
              </ButtonSelectMetric>
            ))}
          </Box>
        </Box>
      )}
      {data && (
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
      )}
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
