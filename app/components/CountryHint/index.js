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
    top: ${({ alignHintVertical }) => (alignHintVertical === 'top' ? '100%' : 'auto')};
    bottom: ${({ alignHintVertical }) => (alignHintVertical === 'bottom' ? '100%' : 'auto')};
    right: ${({ alignHint }) => (alignHint === 'left' ? 0 : 'auto')};
    left: ${({ alignHint }) => (alignHint === 'right' ? 0 : 'auto')};
    width: 0;
    height: 7px;
    border-left: 4px solid
      ${({ alignHint }) => (alignHint === 'right' ? '#041733' : 'transparent')};
    border-right: 4px solid
      ${({ alignHint }) => (alignHint === 'left' ? '#041733' : 'transparent')};
    border-top: ${({ alignHintVertical }) => (alignHintVertical === 'bottom' ? '4px solid transparent' : '4px solid #041733')}; ;
    border-bottom: ${({ alignHintVertical }) => (alignHintVertical === 'top' ? '4px solid transparent' : '4px solid #041733')}; ;

    @media (min-width: ${({ theme }) => theme.breakpointsMin.small}) {
      height: 10px;
      border-width: 6px;
    }
  }
`;

const GroupLabel = styled(p => <Text size="xsmall" {...p} />)`
  font-family: 'DM Sans', sans-serif;
`;
// font-weight: bold;
const MetricLabel = styled(p => <Text size="xsmall" {...p} />)``;
const MetricLabelSecondary = styled(p => (
  <MetricLabel size="xxsmall" {...p} />
))``;
const MetricValue = styled(p => <Text size="xsmall" {...p} />)`
  font-family: 'Roboto Mono', monospace;
  font-weight: 700;
`;
const MetricValueSecondary = styled(p => (
  <MetricValue size="xxsmall" {...p} />
))``;
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
  title,
  alignVertical = 'top',
}) {
  const size = useContext(ResponsiveContext);
  return (
    <Styled
      alignHint={align}
      alignHintVertical={alignVertical}
      hasClose={hasClose}
    >
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
          {config && config.metricOptions && (
            <Box margin={{ bottom: 'xxsmall' }}>
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
          {values &&
            values.map((value, key) => (
              <Box key={value.key || key}>
                <Box direction="row" gap="xsmall">
                  <MetricLabel>{`${value.label}:`}</MetricLabel>
                  <MetricValue>{value.value}</MetricValue>
                </Box>
                {value.labelAdditional && (
                  <Box>
                    <MetricLabelSecondary style={{ opacity: 0.8 }}>
                      {value.labelAdditional}
                    </MetricLabelSecondary>
                  </Box>
                )}
              </Box>
            ))}
          {country &&
            country.hint &&
            asArray(country.hint).map((hint, key) => {
              if (hint.label && hint.value) {
                return (
                  <Box key={hint.key || key}>
                    <Box direction="row" gap="xsmall">
                      <MetricLabel>{`${hint.label}:`}</MetricLabel>
                      <MetricValue>{hint.value}</MetricValue>
                    </Box>
                    {hint.labelAdditional && (
                      <Box>
                        <MetricLabelSecondary style={{ opacity: 0.8 }}>
                          {hint.labelAdditional}
                        </MetricLabelSecondary>
                      </Box>
                    )}
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
  alignVertical: PropTypes.string,
  date: PropTypes.object,
  values: PropTypes.array,
  population: PropTypes.string,
  title: PropTypes.string,
  onClose: PropTypes.func,
  hasClose: PropTypes.bool,
};

export default CountryHint;
