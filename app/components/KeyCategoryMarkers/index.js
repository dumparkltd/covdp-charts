import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, Text } from 'grommet';

import { CATEGORIES, DATACOLORS } from 'containers/App/constants';

const Label = styled(p => <Text size="small" {...p} />)``;

const Dot = styled.div`
  display: block;
  border-radius: 999px;
  background-color: ${({ categoryColor }) => categoryColor};
  width: 8px;
  height: 8px;
  opacity: 0.8;
`;

export function KeyCategoryMarkers({ categories }) {
  return (
    <Box direction="row" gap="small" justify="center" align="center">
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
