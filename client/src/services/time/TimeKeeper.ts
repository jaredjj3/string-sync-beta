type Convertor = (n: number) => number;

interface ValueConvertors {
  toValue: Convertor;
  toTimeMs: Convertor;
}

// The purpose of this service is to provide an interface that is easy to convert between
// time and another form of it. Each conversion is based on time in ms.
class TimeKeeper {
  tpm: number;
  toValue: Convertor = (timeMs: number) => timeMs;
  toTimeMs: Convertor = (value: number) => value;

  private _timeMs: number = 0;

  constructor(tpm: number, valueConvertors?: ValueConvertors) {
    this.tpm = tpm;

    if (valueConvertors) {
      this.toTimeMs = valueConvertors.toTimeMs;
      this.toValue = valueConvertors.toValue;
    }
  }

  set timeMs(timeMs: number) {
    this._timeMs = timeMs;
  }

  set timeS(timeS: number) {
    this.timeMs = timeS * 1000;
  }

  set tick(tick: number) {
    this.timeMs = ((tick / this.tpm) * 60) * 1000;
  }

  set value(value: number) {
    this.timeMs = this.toTimeMs(value);
  }

  get timeMs(): number {
    return this._timeMs;
  }

  get timeS(): number {
    return this.timeMs / 1000;
  }

  get tick(): number {
    return this.tpm * ((this.timeMs / 1000) / 60);
  }
  get value(): number {
    return this.toValue(this.timeMs);
  }
}

export default TimeKeeper;
