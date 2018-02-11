declare namespace Enhancers {
  interface Viewport {
    state: Store.Viewport;
    dispatch: {
      setViewport(viewport: Viewport): void;
    }
  }

  interface Session {
    state: Store.Session;
    dispatch: {
      setUser(user: User): void;
      resetUser(): void;
      login(user: User): void;
      logout(): void;
    }
  }

  interface Features {
    state: Store.Features;
    dispatch: {
      enableFeatures(features: Array<string>): void;
      disableFeatures(features: Array<string>): void;
      resetFeatures(): void;
    }
  }

  interface Notation {
    state: Store.Notation;
    dispatch: {
      setNotation(notation: Notation): void;
      resetNotation(): void;
      fetchNotation(notationId: string | number): void;
      createNotation(notation: FormNotation): void;
      updateNotation(notation: FormNotation): void;
      destroyNotation(notationId: string | number): void;
    }
  }

  interface Notations {
    state: Store.Notations;
    dispatch: {
      setNotations(notations: Array<PresentationalNotation>): void;
      resetNotations(): void;
      fetchNotations(): void;
    }
  }

  interface Tags {
    state: Store.Tags;
    dispatch: {
      setTags(tags: Array<Tag>): void;
      resetTags(): void;
      fetchTags(): void;
    }
  }

  interface Tab {
    state: Store.Tab;
    dispatch: {
      setTab(tab: any): void;
      emitTabUpdate(): void;
      resetTab(): void;
    }
  }

  interface Video {
    state: Store.Video;
    dispatch: {
      setPlayer(player: VideoPlayer): void;
      setPlayerState(playerState: string): void;
      setLoop(loop: [number, number]): void;
      resetVideo(): void;
    }
  }

  interface Sync {
    state: Store.Sync;
    dispatch: {
      resetSync(): void;
    }
  }
}