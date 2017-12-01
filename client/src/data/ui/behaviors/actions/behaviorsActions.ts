declare type Behavior = 'present' | 'record';

export const ENABLE_BEHAVIORS = 'ENABLE_BEHAVIORS';
export const DISABLE_BEHAVIORS = 'DISABLE_BEHAVIORS';

export const enableBehaviors = (behaviors: Array<Behavior>) => ({
  type: ENABLE_BEHAVIORS,
  behaviors
});

export const disableFeatures = (behaviors: Array<Behavior>) => ({
  type: DISABLE_BEHAVIORS,
  behaviors
});
