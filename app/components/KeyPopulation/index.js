import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, ResponsiveContext } from 'grommet';

import { POPULATION_KEY_VALUES } from 'containers/App/constants';
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

export function KeyPopulation({ scaleSize, minValue }) {
  const size = useContext(ResponsiveContext);
  return (
    <Box
      direction="row"
      align="center"
      gap="small"
      justify={isMinSize(size, 'medium') ? 'center' : 'start'}
    >
      {POPULATION_KEY_VALUES &&
        POPULATION_KEY_VALUES.map(pop => (
          <Box
            key={pop.value}
            direction="row"
            gap="xsmall"
            margin={{ right: isMinSize(size, 'medium') ? 'medium' : 'hair' }}
            align="center"
          >
            <Circle sizePx={scaleSize(pop.value * 1000000) * 2} />
            <KeyLabel>{pop.label}</KeyLabel>
          </Box>
        ))}
      {isMinSize(size, 'small') && minValue && (
        <Box
          direction="row"
          gap="xsmall"
          margin={{ right: isMinSize(size, 'medium') ? 'medium' : 'hair' }}
          align="center"
        >
          <Circle sizePx={scaleSize(minValue * 1000000) * 2} />
          <KeyLabel>{`${minValue} million (and less)`}</KeyLabel>
        </Box>
      )}
    </Box>
  );
}

KeyPopulation.propTypes = {
  scaleSize: PropTypes.func,
  minValue: PropTypes.number,
};

export default KeyPopulation;
