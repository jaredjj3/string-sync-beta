declare type Feature = 'fretboard' | 'autoSave';

export const ENABLE_FEATURES = 'ENABLE_FEATURES';
export const DISABLE_FEATURES = 'DISABLE_FEATURES';

export const enableFeatures = (features: Array<Feature>) => ({
  type: ENABLE_FEATURES,
  features
});

export const disableFeatures = (features: Array<Feature>) => ({
  type: DISABLE_FEATURES,
  features
});
