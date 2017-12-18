declare namespace Store {
  interface Viewport {
    width: number;
    height: number;
    orientation: Orientation;
    type: ViewportType;
    isTouch: boolean;
  }

  interface Session {
    currentUser: User;
    isLoggedIn: boolean
  }

  interface Features {
    fretboard: boolean;
    autoSave: boolean;
    scaleVisualization: boolean;
    navbar: boolean;
    gradient: boolean;
  }
}
