export const UPDATE_TUNING = 'UPDATE_TUNING';
export const RESET_TUNING = 'RESET_TUNING';

export const updateTuning = (tuning: string) => ({
  type: UPDATE_TUNING,
  tuning
});

export const  resetTuning = () => ({
  type: RESET_TUNING
});
