import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, ResponsiveContext } from 'grommet';

import { CATEGORIES, DATACOLORS } from 'containers/App/constants';
import { isMinSize } from 'utils/responsive';
import { formatNumberLabel } from 'utils/charts';
import KeyLabel from 'components/KeyLabel';

const Dot = styled.div`
  display: block;
  border-radius: 999px;
  background-color: ${({ categoryColor }) => categoryColor};
  width: 8px;
  height: 8px;
  opacity: 0.9;
  margin-top: -1.5px;
`;

// font-family: 'ABCMonumentMono';

const getLabel = ({ includeGroupIDs, catId, config }) => {
  let result = '';
  if (includeGroupIDs) {
    result = `${catId}: `;
  }
  result = `${result}${CATEGORIES[config.keyCategories][catId]}`;
  return result;
};
const getMedianLabel = ({ catId, medians, config }) => {
  const value = formatNumberLabel({
    value: medians[catId],
    isPercentage: config.isPercentage,
  });
  // prettier-ignore
  return ` (median: ${value})`;
};

export function KeyCategoryMarkers({ config, includeGroupIDs, medians }) {
  const size = useContext(ResponsiveContext);
  const categories = config.keyCategories;
  return (
    <Box
      direction={isMinSize(size, 'medium') ? 'row' : 'column'}
      gap={isMinSize(size, 'medium') ? 'small' : 'xsmall'}
      align={isMinSize(size, 'medium') ? 'center' : 'start'}
      justify="center"
    >
      {CATEGORIES[categories] &&
        Object.keys(CATEGORIES[categories]).map(catId => (
          <Box key={catId} direction="row" gap="xsmall" align="center">
            <Dot categoryColor={DATACOLORS[catId]} />
            <KeyLabel>
              {getLabel({
                includeGroupIDs,
                catId,
                config,
              })}
              {medians &&
                getMedianLabel({
                  medians,
                  catId,
                  config,
                })}
            </KeyLabel>
          </Box>
        ))}
    </Box>
  );
}

KeyCategoryMarkers.propTypes = {
  config: PropTypes.object,
  includeGroupIDs: PropTypes.bool,
  medians: PropTypes.object,
};

export default KeyCategoryMarkers;
