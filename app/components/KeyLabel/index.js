import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text } from 'grommet';

const KeyLabel = styled(p => <Text {...p} />)`
  font-size: ${({ theme }) => theme.text.xsmall.size};
  line-height: ${({ theme }) => theme.text.xsmall.height};
  @media (min-width: ${({ theme }) => theme.breakpointsMin.small}) {
    font-size: ${({ theme }) => theme.text.small.size};
    line-height: ${({ theme }) => theme.text.small.height};
  }
`;
// font-family: 'ABCMonumentMono';
// text-transform: uppercase;

export default KeyLabel;
