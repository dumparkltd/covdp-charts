import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, Text, Button, ResponsiveContext } from 'grommet';
import { Close } from 'grommet-icons';

import { isMinSize } from 'utils/responsive';
import asArray from 'utils/as-array';

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

const GroupLabel = styled(p => <Text size="xsmall" {...p} />)`
  font-family: 'DM Sans', sans-serif;
  font-weight: bold;
`;
const MetricLabel = styled(p => <Text size="xsmall" {...p} />)``;
const MetricLabelSecondary = styled(p => (
  <MetricLabel size="xxsmall" {...p} />
))``;
const MetricValue = styled(p => <Text size="xsmall" {...p} />)`
  font-family: 'Roboto Mono', monospace;
  font-weight: 700;
`;
const MetricValueSecondary = styled(p => <MetricValue size="xxsmall" {...p} />)`
  position: relative;
  top: 1px;
`;
const Title = styled(p => <Text {...p} />)`
  font-family: 'DM Sans', sans-serif;
  font-weight: 700;
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
  dateSecondary,
  title,
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
        {title && (
          <Box>
            <Title>{title}</Title>
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
        <Box gap="xsmall" margin={{ top: 'xsmall' }}>
          {date && (
            <Box direction="row" gap="xsmall">
              <MetricLabel>{`${date.label || 'Date'}:`}</MetricLabel>
              <MetricValue>{date.value}</MetricValue>
            </Box>
          )}
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
              {dateSecondary && (
                <Box direction="row" gap="xsmall">
                  <MetricLabelSecondary>
                    {`${dateSecondary.label || 'Date'}:`}
                  </MetricLabelSecondary>
                  <MetricValueSecondary>
                    {dateSecondary.value}
                  </MetricValueSecondary>
                </Box>
              )}
            </Box>
          )}
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
          {!valueGroupTitle &&
            values &&
            values.map(value => (
              <Box key={value.label} direction="row" gap="xsmall">
                <MetricLabel>{`${value.label}:`}</MetricLabel>
                <MetricValue>{value.value}</MetricValue>
              </Box>
            ))}
          {country &&
            country.hint &&
            asArray(country.hint).map((hint, key) => {
              if (hint.label && hint.value) {
                return (
                  <Box key={hint.key || key} direction="row" gap="xsmall">
                    <MetricLabel>{`${hint.label}:`}</MetricLabel>
                    <MetricValue>{hint.value}</MetricValue>
                  </Box>
                );
              }
              return null;
            })}
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
  dateSecondary: PropTypes.object,
  values: PropTypes.array,
  population: PropTypes.string,
  title: PropTypes.string,
  onClose: PropTypes.func,
  hasClose: PropTypes.bool,
};

export default CountryHint;
