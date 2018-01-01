import { Line } from 'services';

class ScrollPlan {
  execution: PlanExecutions.Scroll = {
    currentLine: null
  };

  execute(currentLine: Line): ScrollPlan {
    this.execution = {
      currentLine
    };

    return this;
  }
}

export default ScrollPlan;
