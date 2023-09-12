import React from 'react';
import styled from 'styled-components';
import { Box } from 'grommet';
import KeyLabel from 'components/KeyLabel';

const SymbolWrapper = styled(p => <Box flex={{ shrink: 0 }} {...p} />)`
  display: block;
  position: relative;
  width: 30px;
  height: 15px;
  background-color: rgba(0, 0, 0, 0.07);
  opacity: 0.5;
`;
const Dot = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  display: block;
  border-radius: 999px;
  background-color: #041733;
  width: 8px;
  height: 8px;
  transform: translate(-4px, -3px);
`;

const Line = styled.div`
  position: absolute;
  border-bottom: 2px solid #041733;
  left: 0;
  top: 50%;
  width: 100%;
  display: inline-block;
`;
export function KeyLineRange() {
  return (
    <Box direction="row" gap="xsmall" align="center">
      <SymbolWrapper>
        <Line />
        <Dot />
      </SymbolWrapper>
      <KeyLabel>Group average (median) with range (50% interval)</KeyLabel>
    </Box>
  );
}

export default KeyLineRange;
