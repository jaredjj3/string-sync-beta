import { Tab } from 'services';

class TabPlan {
  tab: Tab = null;
  execution: any = null;

  constructor(tab: Tab) {
    this.tab = tab;

    this.setup();
  }

  setup(): TabPlan {
    return this;
  }

  execute(isMediaActive: boolean, currentTimeMs: number, currentTick: number): TabPlan {
    return this;
  }
}

export default TabPlan;
