/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import PathVaccineSupply from 'containers/PathVaccineSupply/Loadable';
import PathPopulationGroups from 'containers/PathPopulationGroups/Loadable';
import PathUHC from 'containers/PathUHC/Loadable';
import PathDosesDelivered from 'containers/PathDosesDelivered/Loadable';
import PathDosesDeliveredMedian from 'containers/PathDosesDeliveredMedian/Loadable';
import PathDosesAdmin from 'containers/PathDosesAdmin/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import { PATHS } from './constants';
import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div`
  max-width: ${({ theme }) => theme.sizes.maxContainerWidth}px;
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0;
  flex-direction: column;
`;

export default function App() {
  return (
    <AppWrapper>
      <Helmet titleTemplate="%s - COVDP Charts" defaultTitle="COVDP Charts">
        <meta name="description" content="COVDP Charts" />
      </Helmet>
      <Switch>
        <Route path={`/${PATHS.VAX_SUPPLY}`} component={PathVaccineSupply} />
        <Route path={`/${PATHS.POP_GROUPS}`} component={PathPopulationGroups} />
        <Route path={`/${PATHS.DOSES_ADMIN}`} component={PathDosesAdmin} />
        <Route path={`/${PATHS.UHC_COVERAGE}`} component={PathUHC} />
        <Route
          path={`/${PATHS.DOSES_DELIVERED}`}
          component={PathDosesDelivered}
        />
        <Route
          path={`/${PATHS.DOSES_DELIVERED_MEDIAN}`}
          component={PathDosesDeliveredMedian}
        />
        <Route path="" component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </AppWrapper>
  );
}
