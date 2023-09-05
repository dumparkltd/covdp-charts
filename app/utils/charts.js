export const getHintAlign = ({ xPosition, xMin, xMax }) => {
  const xRatio = (xPosition - xMin) / (xMax - xMin);
  return xRatio < 0.4 ? 'right' : 'left';
};

export const formatNumberLabel = ({ value, isPercentage }) => {
  if (isPercentage) {
    return `${Math.round(value * 10) / 10}%`;
  }
  return Math.round(value * 100) / 100;
};
