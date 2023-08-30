import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, Text, Button, ResponsiveContext } from 'grommet';
import { Close } from 'grommet-icons';

import { isMinSize } from 'utils/responsive';

// prettier-ignore
const Styled = styled(p => (
  <Box pad={{ vertical: 'xsmall', horizontal: 'small' }} {...p} />
))`
  z-index: 999;
  background-color: #041733;
  color: white;
  position: relative;
  &:after {
    position: absolute;
    content: '';
    top: 100%;
    right: ${({ alignHint }) => (alignHint === 'left' ? 0 : 'auto')};
    left: ${({ alignHint }) => (alignHint === 'right' ? 0 : 'auto')};
    width: 0;
    height: 7px;
    border-left: 4px solid
      ${({ alignHint }) => (alignHint === 'right' ? '#041733' : 'transparent')};
    border-bottom: 4px solid transparent;
    border-right: 4px solid
      ${({ alignHint }) => (alignHint === 'left' ? '#041733' : 'transparent')};
    border-top: 4px solid #041733;
    @media (min-width: ${({ theme }) => theme.breakpoints.small}) {
      height: 10px;
      border-left: 6px solid
        ${({ alignHint }) =>
    alignHint === 'right' ? '#041733' : 'transparent'};
      border-bottom: 6px solid transparent;
      border-right: 6px solid
        ${({ alignHint }) => (alignHint === 'left' ? '#041733' : 'transparent')};
      border-top: 6px solid #041733;
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

const ButtonClose = styled(p => <Button plain {...p} />)`
  fill: transparent;
  cursor: pointer;
  height: ${({ theme }) => theme.text.small.height};
  @media (min-width: ${({ theme }) => theme.breakpoints.small}) {
    height: ${({ theme }) => theme.text.medium.height};
  }
`;

export function CountryHint({
  country,
  config,
  values,
  date,
  align = 'left',
  population,
  onClose,
  hasClose,
}) {
  const size = useContext(ResponsiveContext);
  return (
    <Styled alignHint={align}>
      <Box direction="row" justify="between" align="center">
        <Box>
          <Title>{country.label}</Title>
        </Box>
        {hasClose && (
          <ButtonClose plain onClick={() => onClose()}>
            <Close color="white" />
          </ButtonClose>
        )}
      </Box>
      {isMinSize(size, 'medium') && (
        <Box gap="xsmall" margin={{ top: 'xsmall' }}>
          {date && (
            <Box direction="row" gap="xsmall">
              <MetricLabel>{`${date.label}:`}</MetricLabel>
              <MetricValue>{date.value}</MetricValue>
            </Box>
          )}
          {values &&
            values.map(value => (
              <Box key={value.label} direction="row" gap="xsmall">
                <MetricLabel>{`${value.label}:`}</MetricLabel>
                <MetricValue>{value.value}</MetricValue>
              </Box>
            ))}
          {population && (
            <Box direction="row" gap="xsmall">
              <MetricLabel>Population:</MetricLabel>
              <MetricValue>{population}</MetricValue>
            </Box>
          )}
          {config && config.xDefault && (
            <Box direction="row" gap="xsmall">
              <MetricLabel>{`${
                config.meta[config.xDefault].label
              }:`}</MetricLabel>
              <MetricValue>{country.hint.metrics[config.xDefault]}</MetricValue>
            </Box>
          )}
          {config && config.metricOptions && (
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
  align: PropTypes.string,
  date: PropTypes.object,
  values: PropTypes.array,
  population: PropTypes.string,
  onClose: PropTypes.func,
  hasClose: PropTypes.bool,
};

export default CountryHint;
