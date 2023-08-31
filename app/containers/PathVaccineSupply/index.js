/*
 * PathVaccineSupply
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
import {
  // getData,
  getDataByKey,
  getDependenciesReady,
} from 'containers/App/selectors';

import ChartBeeswarm from 'components/ChartBeeswarm';

const DEPENDENCIES = ['countries', 'vaccine-supply'];

const getChartData = ({
  countries,
  data,
  metricColumn,
  groupByColumn,
  config,
  metric,
}) => {
  const countriesData = countries.reduce((m, c) => {
    const countryData = data.find(d => d.iso === c.iso);
    if (
      countryData &&
      countryData[metricColumn] &&
      countryData[metricColumn].trim !== ''
    ) {
      const index = Object.keys(CATEGORIES.INCOME).indexOf(c[groupByColumn]);
      if (index >= 0) {
        return [
          ...m,
          {
            id: c.iso,
            label: c.name_short,
            sizeRaw: parseInt(c.pop, 10),
            group: c[groupByColumn],
            value: parseFloat(countryData[metricColumn]),
            groupIndex: Object.keys(CATEGORIES.INCOME).length - index - 0.5,
            hint: {
              label: config.meta[metric].axisLabel,
              value: countryData[metricColumn],
            },
          },
        ];
      }
      return m;
    }
    return m;
  }, []);
  return countriesData;
};

export function PathVaccineSupply({ onLoadData, countries, dataReady, data }) {
  useInjectSaga({ key: 'app', saga });

  useEffect(() => {
    // kick off loading of data
    onLoadData();
  }, []);
  const config = DATA_RESOURCES.find(r => r.key === 'vaccine-supply');
  const { metrics } = config;
  const [metric, setMetric] = useState(config.yDefault);
  const [highlight, setHighlight] = useState(null);
  const [mouseOver, setMouseOver] = useState(null);
  const chartData =
    dataReady &&
    getChartData({
      countries,
      data,
      metric,
      config,
      metricColumn: metrics[metric],
      groupByColumn: 'income_group',
    });
  return (
    <article>
      <Helmet>
        <title>PathVaccineSupply</title>
        <meta name="description" content="PathVaccineSupply" />
      </Helmet>
      <div>
        <ChartBeeswarm
          data={chartData}
          setMetric={setMetric}
          metric={metric}
          setMouseOver={setMouseOver}
          mouseOver={mouseOver}
          setHighlight={setHighlight}
          highlight={highlight}
          config={config}
          target={{
            value: 1.4,
            label: 'WHO target:',
            label2: '1.4 doses per capita',
          }}
        />
      </div>
    </article>
  );
}

PathVaccineSupply.propTypes = {
  onLoadData: PropTypes.func,
  countries: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  dataReady: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  countries: state => getDataByKey(state, 'countries'),
  data: state => getDataByKey(state, 'vaccine-supply'),
  // data: state => getData(state),
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
)(PathVaccineSupply);
