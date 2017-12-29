import { Flow } from 'vexflow';
import { toTick } from 'ssUtil';

// The purpose of this service is to coordinate a video player's state (i.e. isActive and
// current time states) with DOM elements or other services. Its role is distinct from the
// RAFLoop singleton in a sense that there can be consumers that do not require knowledge
// of a video player's state. It is up to the caller to update the maestro's currentTime
// attribute
//
// When the instance has the state isConducting === true, the Maestro will call onMaestroConduct
// passing optionally used arguments: active, currentTimeMs, currentTick. If the member does not
// have onMaestroConduct defined, it will log a warning that no callback was called and continue.
class Maestro {
  orchestra: Array<any> = [];

  bpm: number = 0;
  deadTimeMs: number = 0;

  isMediaActive: boolean = false;
  currentTimeMs: number = 0;

  get tpm(): number {
    return this.bpm * (Flow.RESOLUTION / 4);
  }

  addMember<T>(member: T): T {
    this.orchestra.push(member);
    return member;
  }

  removeMember<T>(member: T): T {
    this.orchestra = this.orchestra.filter(_member => member !== _member);
    return member;
  }

  conduct(): Maestro {
    // compute once
    const callbackArgs = [
      this.isMediaActive,
      this.currentTimeMs,
      toTick(this.currentTimeMs, this.tpm)
    ];

    this.orchestra.forEach(member => {
      const callback = member.onMaestroConduct;
      if (typeof callback === 'function') {
        callback(...callbackArgs);
      } else {
        console.warn(
          `${member.constructor.name}: expected orchestra member to have an ` +
          'onMaestroConduct callback defined, continuing anyway'
        );
      }
    });

    return this;
  }
}

export default Maestro;
