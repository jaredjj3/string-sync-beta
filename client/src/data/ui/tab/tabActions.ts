import * as constants from './tabConstants';

export const setTab = (tab: any) => ({
  type: constants.SET_TAB,
  tab
});

export const emitTabUpdate = () => ({
  type: constants.EMIT_TAB_UPDATE
});

export const resetTab = () => ({
  type: constants.RESET_TAB
});
