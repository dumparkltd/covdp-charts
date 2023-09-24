import React, { useContext } from 'react';
import { intlShape, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, ResponsiveContext } from 'grommet';

// import { POPULATION_KEY_VALUES } from 'containers/App/constants';
import { isMinSize } from 'utils/responsive';
import KeyLabel from 'components/KeyLabel';

const Circle = styled.div`
  border-radius: 9999px;
  width: ${({ sizePx }) => sizePx}px;
  height: ${({ sizePx }) => sizePx}px;
  border: 1px solid #041733;
  display: block;
  margin-top: -2px;
`;

const roundValue = (value, digits = 2) => {
  const length = Math.floor(Math.log10(Math.abs(value))) + 1;
  const factor = 10 ** (length - digits);
  return Math.ceil(value / factor) * factor;
};

const formatNumber = (value, intl) => {
  // billions
  if (value > 10 ** 9) {
    return `${intl.formatNumber(value / 10 ** 9)} billion`;
  }
  if (value > 10 ** 6) {
    return `${intl.formatNumber(value / 10 ** 6)} million`;
  }
  // if (value > 10 ** 3) {
  //   return `${intl.formatNumber(value / 10 ** 3)} thousand`;
  // }
  return intl.formatNumber(value);
};

export function KeyPopulation({ scaleSize, minValue, maxValue, intl }) {
  const size = useContext(ResponsiveContext);
  const min = roundValue(minValue);
  const max = roundValue(maxValue);
  return (
    <Box
      direction={isMinSize(size, 'small') ? 'row' : 'column'}
      align={isMinSize(size, 'small') ? 'center' : 'start'}
      gap="small"
      justify={isMinSize(size, 'medium') ? 'center' : 'start'}
    >
      {maxValue && (
        <Box
          direction="row"
          gap="xsmall"
          margin={{ right: isMinSize(size, 'medium') ? 'medium' : 'hair' }}
          align="center"
        >
          <Circle sizePx={scaleSize(max) * 2} />
          <KeyLabel>{`${formatNumber(max, intl)} people`}</KeyLabel>
        </Box>
      )}
      {minValue && (
        <Box
          direction="row"
          gap="xsmall"
          margin={{ right: isMinSize(size, 'medium') ? 'medium' : 'hair' }}
          align="center"
        >
          <Circle sizePx={scaleSize(min) * 2} />
          <KeyLabel>{`${formatNumber(min, intl)} people (and less)`}</KeyLabel>
        </Box>
      )}
    </Box>
  );
}

KeyPopulation.propTypes = {
  scaleSize: PropTypes.func,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  intl: intlShape,
};

export default injectIntl(KeyPopulation);
