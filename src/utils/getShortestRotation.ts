export const getShortestRotation = (
  currentIndex: number,
  targetIndex: number,
  totalPoints: number
) => {
  const anglePerPoint = 360 / totalPoints;

  let difference = targetIndex - currentIndex;

  if (difference > totalPoints / 2) {
    difference -= totalPoints;
  } else if (difference < -totalPoints / 2) {
    difference += totalPoints;
  }

  const rotationAngle = anglePerPoint * difference;

  return rotationAngle;
};
