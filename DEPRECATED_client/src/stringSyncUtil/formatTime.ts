const formatTime = (time: number): string => {
  const rounded = Math.round(time * 10) / 10;
  return rounded.toFixed(1);
};

export default formatTime;
