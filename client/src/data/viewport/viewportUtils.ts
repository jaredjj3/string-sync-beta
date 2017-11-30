export const getViewportProps = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const orientation = width > height ? 'LANDSCAPE' : 'PORTRAIT';
  const type = width < 992 ? 'MOBILE' : 'DESKTOP';
  const isTouch = /iPhone|iPad|iPod|Android|Vita/i.test(navigator.userAgent);

  return { width, height, orientation, type, isTouch };
};
