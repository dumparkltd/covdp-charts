import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, Text, ResponsiveContext } from 'grommet';

import { CATEGORIES, DATACOLORS } from 'containers/App/constants';
import { isMinSize } from 'utils/responsive';
import { formatNumberLabel } from 'utils/charts';

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

const getLabel = ({ includeGroupIDs, catId, medians, config }) => {
  let result = '';
  if (includeGroupIDs) {
    result = `${catId}: `;
  }
  result = `${result}${CATEGORIES[config.keyCategories][catId]}`;
  if (medians) {
    const value = formatNumberLabel({
      value: medians[catId],
      isPercentage: config.isPercentage,
    });
    // prettier-ignore
    result = `${result}: ${value} (median)`;
  }
  return result;
};

export function KeyCategoryMarkers({ config, includeGroupIDs, medians }) {
  const size = useContext(ResponsiveContext);
  const categories = config.keyCategories;
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
            <Label>
              {getLabel({
                includeGroupIDs,
                catId,
                medians,
                config,
              })}
            </Label>
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
