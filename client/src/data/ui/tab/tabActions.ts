import * as constants from './tabConstants';

export const setTab = (tab: any) => ({
  type: constants.SET_TAB,
  tab
});

export const emitUpdate = () => ({
  type: constants.EMIT_UPDATE
});

export const resetTab = () => ({
  type: constants.RESET_TAB
});
