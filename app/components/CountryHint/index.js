import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, Text, ResponsiveContext } from 'grommet';

import { isMinSize } from 'utils/responsive';

const Styled = styled(p => (
  <Box pad={{ vertical: 'xsmall', horizontal: 'small' }} {...p} />
))`
  background-color: #041733;
  color: white;
  position: relative;
  &:after {
    position: absolute;
    content: '';
    top: 100%;
    right: 0;
    width: 0;
    height: 7px;
    border-left: 4px solid transparent;
    border-bottom: 4px solid transparent;
    border-right: 4px solid black;
    border-top: 4px solid black;
    @media (min-width: ${({ theme }) => theme.breakpoints.small}) {
      height: 10px;
      border-left: 6px solid transparent;
      border-bottom: 6px solid transparent;
      border-right: 6px solid black;
      border-top: 6px solid black;
    }
  }
`;

const MetricValue = styled(p => <Text size="xsmall" {...p} />)`
  font-family: 'ABCMonumentBold';
`;
const MetricLabel = styled(p => <Text size="xsmall" {...p} />)``;
const MetricValueSecondary = styled(p => <Text size="xxsmall" {...p} />)`
  font-family: 'ABCMonumentBold';
`;
const MetricLabelSecondary = styled(p => <Text size="xxsmall" {...p} />)``;
const Title = styled(p => <Text {...p} />)`
  font-family: 'ABCMonumentBold';
  font-size: ${({ theme }) => theme.text.small.size};
  line-height: ${({ theme }) => theme.text.small.height};
  @media (min-width: ${({ theme }) => theme.breakpoints.small}) {
    font-size: ${({ theme }) => theme.text.medium.size};
    line-height: ${({ theme }) => theme.text.medium.height};
  }
`;

export function CountryHint({ country, config }) {
  const size = useContext(ResponsiveContext);
  return (
    <Styled>
      <Box>
        <Title>{country.label}</Title>
      </Box>
      {isMinSize(size, 'medium') && (
        <Box gap="xsmall" margin={{ top: 'xsmall' }}>
          {config.xDefault && (
            <Box direction="row" gap="xsmall">
              <MetricLabel>{`${
                config.meta[config.xDefault].label
              }:`}</MetricLabel>
              <MetricValue>{country.hint.metrics[config.xDefault]}</MetricValue>
            </Box>
          )}
          {config.metricOptions && (
            <Box>
              <MetricLabel>{`${config.hintMetricOptionLabel}:`}</MetricLabel>
              <Box margin={{ top: 'xxsmall' }} gap="hair">
                {config.metricOptions.map(o => (
                  <Box direction="row" gap="xsmall" key={o}>
                    <MetricLabelSecondary>{`${
                      config.meta[o].label
                    }:`}</MetricLabelSecondary>
                    <MetricValueSecondary>
                      {country.hint.metrics[o]}
                    </MetricValueSecondary>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </Box>
      )}
    </Styled>
  );
}

CountryHint.propTypes = {
  country: PropTypes.object,
  config: PropTypes.object,
};

export default CountryHint;
