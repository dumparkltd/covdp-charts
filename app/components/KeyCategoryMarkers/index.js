import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, Text, ResponsiveContext } from 'grommet';

import { CATEGORIES, DATACOLORS } from 'containers/App/constants';
import { isMinSize } from 'utils/responsive';

const Label = styled(p => <Text {...p} />)`
  font-size: ${({ theme }) => theme.text.xxsmall.size};
  line-height: ${({ theme }) => theme.text.xxsmall.height};
  @media (min-width: ${({ theme }) => theme.breakpoints.small}) {
    font-size: ${({ theme }) => theme.text.small.size};
    line-height: ${({ theme }) => theme.text.small.height};
  }
`;

const Dot = styled.div`
  display: block;
  border-radius: 999px;
  background-color: ${({ categoryColor }) => categoryColor};
  width: 6px;
  height: 6px;
  opacity: 0.9;
  @media (min-width: ${({ theme }) => theme.breakpoints.small}) {
    width: 10px;
    height: 10px;
  }
`;

export function KeyCategoryMarkers({ categories, includeKeys }) {
  const size = useContext(ResponsiveContext);
  return (
    <Box
      direction={isMinSize(size, 'medium') ? 'row' : 'column'}
      gap={isMinSize(size, 'medium') ? 'small' : 'xsmall'}
      align={isMinSize(size, 'medium') ? 'center' : 'start'}
      margin={{ left: isMinSize(size, 'medium') ? 'hair' : '36px' }}
      justify="center"
    >
      {CATEGORIES[categories] &&
        Object.keys(CATEGORIES[categories]).map(catId => (
          <Box key={catId} direction="row" gap="xsmall" align="center">
            <Dot categoryColor={DATACOLORS[catId]} />
            <Label>{CATEGORIES[categories][catId]}</Label>
            {includeKeys && <Label>{`(${catId})`}</Label>}
          </Box>
        ))}
    </Box>
  );
}

KeyCategoryMarkers.propTypes = {
  categories: PropTypes.string,
  includeKeys: PropTypes.bool,
};

export default KeyCategoryMarkers;
