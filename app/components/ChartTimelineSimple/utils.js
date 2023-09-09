// import { cloneDeep } from 'lodash/lang';
import { groupBy } from 'lodash/collection';

import { DATACOLORS } from 'containers/App/constants';
import { SIZES } from 'theme';
import { isMinSize } from 'utils/responsive';
import { formatNumberLabel } from 'utils/charts';

export const getXTime = date => new Date(`${date}`).getTime();

export const mapNodes = ({ data, seriesColumn, seriesLabels }) =>
  // prettier-ignore
  data
    .map(d => ({
      ...d,
      x: getXTime(d.xValue),
      y: d.yValue,
      label: seriesLabels[d[seriesColumn]],
      color: DATACOLORS[d[seriesColumn]],
    }));
export const mapRangeNodes = data =>
  // prettier-ignore
  data
    .map(d => ({
      ...d,
      x: getXTime(d.xValue),
      y: d.yValueUpper,
      y0: d.yValueLower,
    }));

export const groupNodes = ({ nodes, seriesColumn }) => {
  const grouped = groupBy(nodes, d => d[seriesColumn]);
  return Object.keys(grouped).reduce(
    (m, groupId) => [
      ...m,
      {
        id: groupId,
        data: grouped[groupId],
        color: DATACOLORS[groupId],
      },
    ],
    [],
  );
};

export const getChartHeight = size => SIZES.timelineSimpleChartHeight[size];

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
  // if (isMinSize(size, 'medium')) {
  //   // auto (monthly)
  //   return null;
  // }
  const dateMin = new Date(range[0]);
  const dateMax = new Date(range[1]);
  if (isMinSize(size, 'small')) {
    // quarterly
    return getMonths(dateMin, dateMax, 3);
  }
  // 6 monthly
  return getMonths(dateMin, dateMax, 6);
};

export const getHintValues = ({ hint, metrics }) => {
  if (!metrics) return null;
  const values = [];
  if (metrics.median) {
    values.push({
      label: 'Average (median)',
      value: formatNumberLabel({ value: hint[metrics.median] }),
    });
    if (metrics.upper && metrics.lower) {
      const value = `${formatNumberLabel({
        value: hint[metrics.lower],
      })}-${formatNumberLabel({ value: hint[metrics.upper] })}`;
      values.push({
        label: 'Range (50% interval)',
        value,
      });
    }
  }
  return values;
};
