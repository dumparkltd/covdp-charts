import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from 'grommet';
import KeyLabel from 'components/KeyLabel';

const Line = styled.div`
  border-bottom: 0.5px dashed #041733;
  width: 30px;
  display: inline-block;
  height: ${({ theme }) => theme.text.xxsmall.height};
  @media (min-width: ${({ theme }) => theme.breakpointsMin.small}) {
    font-size: ${({ theme }) => theme.text.small.size};
    height: ${({ theme }) => theme.text.small.height};
  }
  transform: translateY(-50%);
  margin-top: 1px;
`;

export function KeyTarget({ target }) {
  return (
    <Box direction="row" gap="xsmall" align="center">
      <Line />
      <KeyLabel>{`${target.label} ${target.label2 || ''}`}</KeyLabel>
    </Box>
  );
}

KeyTarget.propTypes = {
  target: PropTypes.object,
};

export default KeyTarget;
