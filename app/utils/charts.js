export const getHintAlign = ({ xPosition, xMin, xMax, threshold = 0.4 }) => {
  const xRatio = (xPosition - xMin) / (xMax - xMin);
  return xRatio < threshold ? 'right' : 'left';
};

export const formatNumberLabel = ({ value, isPercentage, digits = 1 }) => {
  if (isPercentage) {
    return `${Math.round(value * 10) / 10}%`;
  }
  return `${Math.round(value * 10 ** digits) / 10 ** digits}`;
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
