import styled from 'styled-components';

const Title = styled.h1`
  margin-top: 0;
  margin-bottom: 6px;
  font-size: 22px;
  line-height: 26px;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.small}) {
    margin-bottom: 15px;
    font-size: 30px;
    line-height: 36px;
  }
`;

export default Title;
