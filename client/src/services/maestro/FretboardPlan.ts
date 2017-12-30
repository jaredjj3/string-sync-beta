class FretboardPlan {
  execution: any = null;

  execute(isMediaActive: boolean, currentTimeMs: number, currentTick: number): FretboardPlan {
    return this;
  }
}

export default FretboardPlan;
