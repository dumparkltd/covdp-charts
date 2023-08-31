import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, Text, ResponsiveContext } from 'grommet';

import { isMinSize } from 'utils/responsive';

const Label = styled(p => <Text {...p} />)`
  font-size: ${({ theme }) => theme.text.xxsmall.size};
  line-height: ${({ theme }) => theme.text.xxsmall.height};
  @media (min-width: ${({ theme }) => theme.breakpoints.small}) {
    font-size: ${({ theme }) => theme.text.small.size};
    line-height: ${({ theme }) => theme.text.small.height};
  }
`;

const Line = styled.div`
  border-bottom: 0.5px dashed #041733;
  width: 30px;
  display: inline-block;
  height: ${({ theme }) => theme.text.xxsmall.height};
  @media (min-width: ${({ theme }) => theme.breakpoints.small}) {
    font-size: ${({ theme }) => theme.text.small.size};
    height: ${({ theme }) => theme.text.small.height};
  }
  transform: translateY(-50%);
  margin-top: 1px;
`;

export function KeyTarget({ target }) {
  const size = useContext(ResponsiveContext);
  return (
    <Box
      direction={isMinSize(size, 'medium') ? 'row' : 'column'}
      gap={isMinSize(size, 'medium') ? 'small' : 'xsmall'}
      align={isMinSize(size, 'medium') ? 'center' : 'start'}
      margin={{
        left: isMinSize(size, 'medium') ? 'hair' : '36px',
        top: '10px',
      }}
      justify="center"
    >
      <Box direction="row" gap="xsmall" align="center">
        <Line />
        <Label>{`${target.label} ${target.label2 || ''}`}</Label>
      </Box>
    </Box>
  );
}

KeyTarget.propTypes = {
  target: PropTypes.object,
};

export default KeyTarget;
