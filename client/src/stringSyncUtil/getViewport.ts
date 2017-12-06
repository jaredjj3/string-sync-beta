import { Viewport } from 'types';

const getViewport = (): Viewport => {
  const width = $(window).width();
  const height = $(window).height();
  const orientation = width > height ? 'LANDSCAPE' : 'PORTRAIT';
  const type = width < 992 ? 'MOBILE' : 'DESKTOP';
  const isTouch = /iPhone|iPad|iPod|Android|Vita/i.test(navigator.userAgent);

  return { width, height, orientation, type, isTouch };
};

export default getViewport;
