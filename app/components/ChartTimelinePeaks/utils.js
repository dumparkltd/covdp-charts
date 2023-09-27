import * as d3 from 'd3';

import { isMinSize } from 'utils/responsive';

import { DATACOLORS } from 'containers/App/constants';
import { SIZES } from 'theme';

export const getXTime = date => new Date(`${date}`).getTime();

export const mapNodes = ({ data, xColumn, yColumn }) =>
  // prettier-ignore
  data
    .map(d => ({
      ...d,
      x: getXTime(d[xColumn]),
      y: parseFloat(d[yColumn]),
    }));

export const groupNodes = ({ nodes, countries }) => {
  const countriesData = countries
    .reduce((m, country) => {
      const countryMetricData = nodes.filter(d => d.iso === country.iso);
      // console.log('countryMetricData', countryMetricData)
      if (countryMetricData && countryMetricData.length > 0) {
        const maxIndex = d3.maxIndex(countryMetricData, d => d.y);
        return [
          ...m,
          {
            id: country.iso,
            pop: Math.round(parseFloat(country.pop)),
            color: DATACOLORS[country.income_group],
            data: countryMetricData,
            max: countryMetricData[maxIndex],
            label: country.name,
          },
        ];
      }
      return m;
    }, [])
    .sort((a, b) => (a.id < b.id ? -1 : 1));
  return countriesData;
};

export const getChartHeight = size => SIZES.timelinePeakChartHeight[size];

const getMonths = (fromDate, toDate, timestep) => {
  const fromYear = fromDate.getFullYear();
  const fromMonth = fromDate.getMonth();
  const toYear = toDate.getFullYear();
  const toMonth = toDate.getMonth();
  const months = [];
  /* eslint-disable no-plusplus */
  for (let year = fromYear; year <= toYear; year++) {
    let monthNum = year === fromYear ? fromMonth : 0;
    const monthLimit = year === toYear ? toMonth : 11;

    for (; monthNum <= monthLimit; monthNum++) {
      const month = monthNum + 1;
      if (month % timestep === 1) {
        months.push(new Date(`${year}-${month}-02`).getTime());
      }
    }
  }
  return months;
};

export const getTickValuesX = ({ range, size }) => {
  const dateMin = new Date(range[0]);
  const dateMax = new Date(range[1]);
  if (isMinSize(size, 'small')) {
    // quarterly
    return getMonths(dateMin, dateMax, 3);
  }
  // 6 monthly
  return getMonths(dateMin, dateMax, 6);
};
