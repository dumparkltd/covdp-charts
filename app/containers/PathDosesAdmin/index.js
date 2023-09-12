/*
 * PathDosesAdmin
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectSaga } from 'utils/injectSaga';
import saga from 'containers/App/saga';
import { DATA_RESOURCES, CATEGORIES } from 'containers/App/constants';
import { loadDataIfNeeded } from 'containers/App/actions';
import { getDataByKey } from 'containers/App/selectors';

import ChartTimelinePeaks from 'components/ChartTimelinePeaks';

const DEPENDENCIES = ['countries', 'doses-administered'];

export function PathDosesAdmin({ data, countries, onLoadData }) {
  useInjectSaga({ key: 'app', saga });
  useEffect(() => {
    // kick off loading of data
    onLoadData();
  }, []);
  const config = DATA_RESOURCES.find(r => r.key === 'doses-administered');
  const [mouseOver, setMouseOver] = useState(null);
  const [highlight, setHighlight] = useState(null);

  return (
    <article>
      <Helmet>
        <title>{config && config.key}</title>
        <meta name="description" content="PathDosesAdmin" />
      </Helmet>
      <div>
        <ChartTimelinePeaks
          data={data}
          countries={countries}
          config={config}
          setMouseOver={setMouseOver}
          mouseOver={mouseOver}
          setHighlight={setHighlight}
          highlight={highlight}
          yAxisLabel="Daily doses administered (% of population)"
          seriesLabels={CATEGORIES.INCOME}
        />
      </div>
    </article>
  );
}

PathDosesAdmin.propTypes = {
  onLoadData: PropTypes.func,
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  countries: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  countries: state => getDataByKey(state, 'countries'),
  data: state => getDataByKey(state, 'doses-administered'),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadData: () => {
      DEPENDENCIES.forEach(key => dispatch(loadDataIfNeeded(key)));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(PathDosesAdmin);
