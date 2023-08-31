export const getHintAlign = ({ xPosition, xMin, xMax }) => {
  const xRatio = (xPosition - xMin) / (xMax - xMin);
  return xRatio < 0.4 ? 'right' : 'left';
};
