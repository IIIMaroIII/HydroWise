export const calculateDailyNorma = (weight, gender, activeTime) => {
  let volume = 0;
  switch (gender) {
    case 'woman':
      return (volume = weight * 0.03 + activeTime * 0.4);
    case 'man':
      return (volume = weight * 0.04 + activeTime * 0.6);
    default:
      volume = 0;
  }
  return volume.toFixed(1);
};
