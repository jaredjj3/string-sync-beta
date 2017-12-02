declare type Feature = 'fretboard' | 'autoSave' | 'scaleVisualization' | 'navbar';

export const ENABLE_FEATURES = 'ENABLE_FEATURES';
export const DISABLE_FEATURES = 'DISABLE_FEATURES';
export const RESET_FEATURES = 'RESET_FEATURES';

export const enableFeatures = (features: Array<Feature>) => ({
  type: ENABLE_FEATURES,
  features
});

export const disableFeatures = (features: Array<Feature>) => ({
  type: DISABLE_FEATURES,
  features
});

export const resetFeatures = () => ({
  type: RESET_FEATURES
});
