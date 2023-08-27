import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, Text, ResponsiveContext } from 'grommet';

import { CATEGORIES, DATACOLORS } from 'containers/App/constants';
import { isMinSize } from 'utils/responsive';

const Label = styled(p => <Text size="small" {...p} />)``;

const Dot = styled.div`
  display: block;
  border-radius: 999px;
  background-color: ${({ categoryColor }) => categoryColor};
  width: 10px;
  height: 10px;
  opacity: 1;
`;

export function KeyCategoryMarkers({ categories }) {
  const size = useContext(ResponsiveContext);
  return (
    <Box
      direction={isMinSize(size, 'medium') ? 'row' : 'column'}
      gap="small"
      justify="center"
      align="center"
    >
      {CATEGORIES[categories] &&
        Object.keys(CATEGORIES[categories]).map(catId => (
          <Box key={catId} direction="row" gap="xsmall" align="center">
            <Dot categoryColor={DATACOLORS[catId]} />
            <Label>{CATEGORIES[categories][catId]}</Label>
          </Box>
        ))}
    </Box>
  );
}

KeyCategoryMarkers.propTypes = {
  categories: PropTypes.string,
};

export default KeyCategoryMarkers;
