/*
 * PathDosesDeliveredMedian
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
import { getDataByKey, getDependenciesReady } from 'containers/App/selectors';

import ChartTimelineGroups from 'components/ChartTimelineGroups';

const getChartData = ({ data, xColumn, yColumn, yColumnLower, yColumnUpper }) =>
  data.map(d => ({
    ...d,
    xValue: d[xColumn],
    yValue: parseFloat(d[yColumn]),
    yValueUpper: parseFloat(d[yColumnUpper]),
    yValueLower: parseFloat(d[yColumnLower]),
  }));

const DEPENDENCIES = ['doses-delivered'];

export function PathDosesDeliveredMedian({ onLoadData, dataReady, data }) {
  useInjectSaga({ key: 'app', saga });

  useEffect(() => {
    // kick off loading of data
    onLoadData();
  }, []);
  const [mouseOver, setMouseOver] = useState(null);
  const [metric, setMetric] = useState('mean');
  const [seriesMouseOver, setSeriesMouseOver] = useState(null);
  const config = DATA_RESOURCES.find(r => r.key === 'doses-delivered-median');
  // const [mouseOver, setMouseOver] = useState(null);
  const { metrics } = config;
  const chartData =
    dataReady &&
    getChartData({
      data,
      xColumn: 'datetime',
      yColumn: metrics[metric],
      yColumnLower: metric === 'median' ? metrics.lower : null,
      yColumnUpper: metric === 'median' ? metrics.upper : null,
    });
  return (
    <article>
      <Helmet>
        <title>{config && config.key}</title>
        <meta name="description" content="PathDosesDeliveredMedian" />
      </Helmet>
      <div>
        <ChartTimelineGroups
          data={chartData}
          config={config}
          target={{
            value: 1.4,
            label: 'WHO target: 1.4 doses per capita',
          }}
          seriesColumn="income_group"
          seriesLabels={CATEGORIES.INCOME}
          seriesLabelsPosition={
            metric === 'median' ? config.labelPositions : null
          }
          setMouseOver={setMouseOver}
          mouseOver={mouseOver}
          setSeriesMouseOver={setSeriesMouseOver}
          seriesMouseOver={seriesMouseOver}
          metric={metric}
          setMetric={setMetric}
        />
      </div>
    </article>
  );
}
// setMouseOver={setMouseOver}
// mouseOver={mouseOver}

PathDosesDeliveredMedian.propTypes = {
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
)(PathDosesDeliveredMedian);
