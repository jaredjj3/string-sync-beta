import React from 'react';

import Youtube from 'react-youtube';

interface VideoProps {
  youtubeVideoId: string;
}

interface VideoState {}

class Video extends React.Component<VideoProps, VideoState> {
  // https://github.com/troybetz/react-youtube
  static youtubeOptions: any = {
    playerVars: {
      modestbranding: 1,
      playsinline: 1,
      rel: 0,
      controls: 1,
      showinfo: 0,
      disablekb: 1,
      fs: 0,
      autoplay: 1,
      start: 0,
    }
  };

  render(): JSX.Element {
    const { youtubeVideoId } = this.props;

    return (
      <div className="Video">
        <Youtube
          className="Video__youtubePlayer"
          opts={Video.youtubeOptions}
          videoId={youtubeVideoId}
        />
      </div>
    );
  }
}

export default Video;
