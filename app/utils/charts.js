export const getHintAlign = ({ xPosition, xMin, xMax, threshold = 0.4 }) => {
  const xRatio = (xPosition - xMin) / (xMax - xMin);
  return xRatio < threshold ? 'right' : 'left';
};

export const getHintAlignVertical = ({
  yPosition,
  yMin,
  yMax,
  threshold = 0.8,
}) => {
  const yRatio = (yPosition - yMin) / (yMax - yMin);
  return yRatio < threshold ? 'top' : 'bottom';
};

export const formatNumberLabel = ({
  value,
  isPercentage,
  digits = 1,
  intl,
}) => {
  if (isPercentage) {
    return `${Math.round(value * 10 ** digits) / 10 ** digits}%`;
  }
  return intl
    ? `${intl.formatNumber(Math.round(value * 10 ** digits) / 10 ** digits)}`
    : `${Math.round(value * 10 ** digits) / 10 ** digits}`;
};

export const getMedian = (data, attribute) => {
  const sortedValues = data
    .map(d => d[attribute || 'value'])
    .sort((a, b) => (a > b ? 1 : -1));
  const middle = sortedValues.length / 2;
  return middle % 1 === 0
    ? (sortedValues[middle - 1] + sortedValues[middle]) / 2
    : sortedValues[Math.floor(middle)];
};
export const getAverage = (data, valAttribute, weightAttribute) => {
  const [totalValue, totalWeight] = data.reduce(
    (memo, d) => [
      memo[0] + d[valAttribute || 'value'] * d[weightAttribute || 'weight'],
      memo[1] + d[weightAttribute || 'weight'],
    ],
    [0, 0],
  );
  return Math.round((totalValue / totalWeight) * 10) / 10;
};
