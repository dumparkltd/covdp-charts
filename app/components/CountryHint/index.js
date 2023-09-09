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
  pointer-events: ${({ hasClose }) => hasClose ? 'all' : 'none'};
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
    @media (min-width: ${({ theme }) => theme.breakpointsMin.small}) {
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
  font-family: 'ABCMonumentMonoBold';
`;
const GroupLabel = styled(p => <Text size="xsmall" {...p} />)`
  font-family: 'ABCMonumentBold';
`;
const MetricLabel = styled(p => <Text size="xsmall" {...p} />)``;
const MetricValueSecondary = styled(p => <Text size="xxsmall" {...p} />)`
  font-family: 'ABCMonumentMonoBold';
`;
const MetricLabelSecondary = styled(p => <Text size="xxsmall" {...p} />)``;
const Title = styled(p => <Text {...p} />)`
  font-family: 'ABCMonumentBold';
  font-size: ${({ theme }) => theme.text.small.size};
  line-height: ${({ theme }) => theme.text.small.height};
  @media (min-width: ${({ theme }) => theme.breakpointsMin.small}) {
    font-size: ${({ theme }) => theme.text.medium.size};
    line-height: ${({ theme }) => theme.text.medium.height};
  }
`;

const ButtonClose = styled(p => <Button plain {...p} />)`
  fill: transparent;
  cursor: pointer;
  pointer-events: all;
  height: ${({ theme }) => theme.text.small.height};
  @media (min-width: ${({ theme }) => theme.breakpointsMin.small}) {
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
  valueGroupTitle,
}) {
  const size = useContext(ResponsiveContext);
  return (
    <Styled alignHint={align} hasClose={hasClose}>
      <Box direction="row" justify="between" align="center" gap="xsmall">
        {country && country.label && (
          <Box>
            <Title>{country.label}</Title>
          </Box>
        )}
        {hasClose && (
          <ButtonClose
            onClick={() => onClose()}
            icon={<Close color="white" size="small" />}
          />
        )}
      </Box>
      {isMinSize(size, 'medium') && (
        <Box gap="small" margin={{ top: 'xsmall' }}>
          {valueGroupTitle && (
            <Box gap="xxsmall">
              <GroupLabel>{`${valueGroupTitle}:`}</GroupLabel>
              {values &&
                values.map(value => (
                  <Box key={value.label} direction="row" gap="xsmall">
                    <MetricLabelSecondary>{`${
                      value.label
                    }:`}</MetricLabelSecondary>
                    <MetricValueSecondary>{value.value}</MetricValueSecondary>
                  </Box>
                ))}
            </Box>
          )}
          {!valueGroupTitle &&
            values &&
            values.map(value => (
              <Box key={value.label} direction="row" gap="xsmall">
                <MetricLabel>{`${value.label}:`}</MetricLabel>
                <MetricValue>{value.value}</MetricValue>
              </Box>
            ))}
          {config && config.metricOptions && (
            <Box>
              <GroupLabel>{`${config.hintMetricOptionLabel}:`}</GroupLabel>
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
          {country && country.hint && country.hint.label && country.hint.value && (
            <Box direction="row" gap="xsmall">
              <MetricLabel>{`${country.hint.label}:`}</MetricLabel>
              <MetricValue>{country.hint.value}</MetricValue>
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
          {population && (
            <Box direction="row" gap="xsmall">
              <MetricLabel>Population:</MetricLabel>
              <MetricValue>{population}</MetricValue>
            </Box>
          )}
          {date && (
            <Box direction="row" gap="xsmall">
              <MetricLabel>{`${date.label || 'Date'}:`}</MetricLabel>
              <MetricValue>{date.value}</MetricValue>
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
  valueGroupTitle: PropTypes.string,
  date: PropTypes.object,
  values: PropTypes.array,
  population: PropTypes.string,
  onClose: PropTypes.func,
  hasClose: PropTypes.bool,
};

export default CountryHint;
