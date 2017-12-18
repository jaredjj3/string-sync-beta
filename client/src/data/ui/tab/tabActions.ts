import * as constants from './tabConstants';

export const setProvider = (provider: any) => ({
  type: constants.SET_PROVIDER,
  provider
});

export const emitUpdate = () => ({
  type: constants.EMIT_UPDATE
});

export const resetTab = () => ({
  type: constants.RESET_TAB
});
