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
}
