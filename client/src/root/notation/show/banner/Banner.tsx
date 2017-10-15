import React from 'react';

interface BannerProps {

}

interface BannerState {}

class Banner extends React.Component<BannerProps, BannerState> {
  render(): JSX.Element {
    return (
      <div className="NotationShowBanner" >
        Banner
      </div>
    );
  }
}

export default Banner;
