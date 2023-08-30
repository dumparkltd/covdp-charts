/*
 * PathDosesDelivered
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { memo, useEffect } from 'react';
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
import { getDataByKey, getDependenciesReady } from 'containers/App/selectors';

import ChartTimelineSimple from 'components/ChartTimelineSimple';

const getChartData = ({ data, xColumn, yColumn }) =>
  data.map(d => ({
    ...d,
    xValue: d[xColumn],
    yValue: parseFloat(d[yColumn]),
  }));

const DEPENDENCIES = ['doses-delivered'];

export function PathDosesDelivered({ onLoadData, dataReady, data }) {
  useInjectSaga({ key: 'app', saga });

  useEffect(() => {
    // kick off loading of data
    onLoadData();
  }, []);

  const config = DATA_RESOURCES.find(r => r.key === 'doses-delivered');
  // const [mouseOver, setMouseOver] = useState(null);
  const { metrics } = config;
  const chartData =
    dataReady &&
    getChartData({
      data,
      xColumn: 'datetime',
      yColumn: metrics.delivered,
    });

  return (
    <article>
      <Helmet>
        <title>PathDosesDelivered</title>
        <meta name="description" content="PathDosesDelivered" />
      </Helmet>
      <div>
        <ChartTimelineSimple
          data={chartData}
          config={config}
          target={{
            value: 1.4,
            label: 'WHO target: 1.4 doses per capita',
          }}
          seriesColumn="income_group"
          yAxisLabel="Doses delivered per capita"
          seriesLabels={CATEGORIES.INCOME}
        />
      </div>
    </article>
  );
}
// setMouseOver={setMouseOver}
// mouseOver={mouseOver}

PathDosesDelivered.propTypes = {
  onLoadData: PropTypes.func,
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  dataReady: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  data: state => getDataByKey(state, 'doses-delivered'),
  dataReady: state => getDependenciesReady(state, DEPENDENCIES),
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
)(PathDosesDelivered);
