import React from 'react';
import { Box } from 'grommet';
import KeyLabel from 'components/KeyLabel';

export function KeyMedian() {
  return (
    <Box direction="row" gap="xsmall" align="center">
      <Box>
        <svg width="34" height="20">
          <line
            x1="0"
            x2="34"
            y1="10"
            y2="10"
            stroke="#041733"
            strokeWidth="1"
          />
        </svg>
      </Box>
      <KeyLabel>Group averages (median)</KeyLabel>
    </Box>
  );
}

export default KeyMedian;
