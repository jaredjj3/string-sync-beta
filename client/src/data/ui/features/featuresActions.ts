import * as constants from './featuresConstants';

declare type Feature = 'fretboard' | 'autoSave' | 'scaleVisualization' | 'navbar' | 'gradient';

export const enableFeatures = (features: Array<Feature>) => ({
  type: constants.ENABLE_FEATURES,
  features
});

export const disableFeatures = (features: Array<Feature>) => ({
  type: constants.DISABLE_FEATURES,
  features
});

export const resetFeatures = () => ({
  type: constants.RESET_FEATURES
});
