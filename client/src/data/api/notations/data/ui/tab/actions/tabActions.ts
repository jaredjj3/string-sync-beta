export const SET_PROVIDER = 'SET_PROVIDER';
export const EMIT_UPDATE = 'EMIT_UPDATE';
export const RESET_TAB = 'RESET_TAB';

export const setProvider = (provider: any) => ({
  type: SET_PROVIDER,
  provider
});

export const emitUpdate = () => ({
  type: EMIT_UPDATE
});

export const resetTab = () => ({
  type: RESET_TAB
});
