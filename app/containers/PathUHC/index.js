/*
 * PathUHC
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
import { DATA_RESOURCES } from 'containers/App/constants';
import { loadDataIfNeeded } from 'containers/App/actions';
import {
  // getData,
  getDataByKey,
  getDependenciesReady,
} from 'containers/App/selectors';

import ChartScatter from 'components/ChartScatter';

import { formatNumberLabel } from 'utils/charts';

const DEPENDENCIES = ['countries', 'uhc-coverage'];

const getChartData = ({ countries, data, yColumn, xColumn, colorByColumn }) => {
  const countriesData = countries
    .reduce((m, country) => {
      const countryMetricData = data.find(d => d.iso === country.iso);
      if (
        countryMetricData &&
        countryMetricData.cov_tot_a1d_2021 &&
        countryMetricData.cov_tot_a1d_2021.trim !== '' &&
        countryMetricData.cov_tot_a1d_2022 &&
        countryMetricData.cov_tot_a1d_2022.trim !== '' &&
        countryMetricData[xColumn] &&
        countryMetricData[xColumn].trim !== ''
      ) {
        const hide =
          !countryMetricData[yColumn] ||
          countryMetricData[yColumn].trim() === '';
        return [
          ...m,
          {
            id: country.iso,
            hide,
            color: country[colorByColumn],
            xValue:
              Math.round(parseFloat(countryMetricData[xColumn]) * 100) / 100, // x-axis
            yValue: parseFloat(countryMetricData[yColumn]), // y-axis
            label: country.name_long,
            hint: {
              metrics: {
                uhc: formatNumberLabel({
                  value: parseFloat(countryMetricData[xColumn]),
                }),
                one_dose_2021: formatNumberLabel({
                  value: countryMetricData.cov_tot_a1d_2021,
                  isPercentage: true,
                }),
                one_dose_2022: formatNumberLabel({
                  value: countryMetricData.cov_tot_a1d_2022,
                  isPercentage: true,
                }),
              },
            },
          },
        ];
      }
      return m;
    }, [])
    .sort((a, b) => (a.id < b.id ? -1 : 1));
  return countriesData;
};

export function PathUHC({ onLoadData, countries, dataReady, data }) {
  useInjectSaga({ key: 'app', saga });

  useEffect(() => {
    // kick off loading of data
    onLoadData();
  }, []);
  const config = DATA_RESOURCES.find(r => r.key === 'uhc-coverage');
  const [metric, setMetric] = useState(config.yDefault);
  const [mouseOver, setMouseOver] = useState(null);
  const [highlight, setHighlight] = useState(null);
  const { metrics } = config;
  const chartData =
    dataReady &&
    getChartData({
      countries,
      data,
      xColumn: metrics[config.xDefault],
      yColumn: metrics[metric],
      colorByColumn: 'income_group',
    });
  return (
    <article>
      <Helmet>
        <title>{config && config.key}</title>
        <meta name="description" content="PathUHC" />
      </Helmet>
      <div>
        <ChartScatter
          data={chartData}
          setMetric={setMetric}
          metric={metric}
          setMouseOver={setMouseOver}
          mouseOver={mouseOver}
          setHighlight={setHighlight}
          highlight={highlight}
          config={config}
          xAxisLabel="UHC service coverage (score)"
          yAxisLabel="At least 1 dose (% of population)"
          medianY
          medianX
          countries={countries}
        />
      </div>
    </article>
  );
}

PathUHC.propTypes = {
  onLoadData: PropTypes.func,
  countries: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  dataReady: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  countries: state => getDataByKey(state, 'countries'),
  data: state => getDataByKey(state, 'uhc-coverage'),
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
)(PathUHC);
