class VexPlayer {
  static DEFAULT_NOTE_STYLE: any = {
    fillStyle: '#000000',
    strokeStyle: '#000000'
  };

  static PRESSED_NOTE_STYLE: any = {
    fillStyle: '#FF0000',
    strokeStyle: '#FF0000'
  };

  currentTime: number = 0;

  get isReady(): boolean {

  }

  get tpm(): number {

  }

  get caretPosX(): number {

  }

  set artist(artist: any) {

  }

  set tempo(tempo: any) {

  }

  set viewport(viewport: any) {

  }

  update = (currentTime: number): void => {
    this.currentTime = currentTime;
  }
}

export default VexPlayer;
