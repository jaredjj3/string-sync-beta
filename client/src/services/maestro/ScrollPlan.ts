import { Line } from 'services';

class ScrollPlan {
  execution: PlanExecutions.Scroll = {
    currentLine: null
  };

  reset(): ScrollPlan {
    this.execution = {
      currentLine: null
    };

    return this;
  }

  execute(currentLine: Line): ScrollPlan {
    this.execution = {
      currentLine
    };

    return this;
  }
}

export default ScrollPlan;
