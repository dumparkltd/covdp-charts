import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';
import KeyLabel from 'components/KeyLabel';

export function KeyTarget({ target, strokeDasharray = [8, 4] }) {
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
            opacity="0.6"
            strokeWidth="0.5"
            strokeDasharray={strokeDasharray.join(',')}
          />
        </svg>
      </Box>
      <KeyLabel>{`${target.label} ${target.label2 || ''}`}</KeyLabel>
    </Box>
  );
}

KeyTarget.propTypes = {
  target: PropTypes.object,
  strokeDasharray: PropTypes.array,
};

export default KeyTarget;
