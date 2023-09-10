import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from 'grommet';

// prettier-ignore
const Styled = styled(p => (
  <Box pad={{ vertical: 'xsmall', horizontal: 'small' }} {...p} />
))`
  z-index: 999;
  color: #041733;
  background-color: white;
  position: relative;
  transform: translateX(-50%);
  border: 1px solid #041733;
`;

export function NoDataHint({ country }) {
  return (
    <Styled>{`No data available for ${
      country.label
    } for selected metric`}</Styled>
  );
}

NoDataHint.propTypes = {
  country: PropTypes.object,
};

export default NoDataHint;
