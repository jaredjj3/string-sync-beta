export const TOGGLE_PANEL = 'TOGGLE_PANEL';
export const RESET_PANELS = 'RESET_PANELS';

export const togglePanel = (panel: string) => ({
  type: TOGGLE_PANEL,
  panel
});

export const resetAllPanels = () => ({
  type: RESET_PANELS
});
