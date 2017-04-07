import React from 'react';
// import videojs from 'video.js';
// import 'video.js/dist/video-js.min.css';
import CSSModules from 'react-css-modules';
import styles from './index.less';
import Tabs from './tabs';

/**
 * @description Video
 * 视频
 **/

const Video = React.createClass({
  propTypes: {
    src: React.PropTypes.string,
    type: React.PropTypes.string
  },
  statics: {
    Tabs
  },
  getDefaultProps() {
    return {
      src: '',
      type: '',
      className: ''
    };
  },
  componentDidMount() {
    // this.init();
  },
  init() {
    // instantiate video.js
    this.player = videojs(this.video, {
      // autoplay: true,
      controls: true,
      fluid: true,
    });
  },
  play() {
    this.video.play();
  },
  pause() {
    this.video.pause();
  },
  getFileName(upFileName) {
    const index1 = upFileName.lastIndexOf(".");
    const index2 = upFileName.length;
    const suffix = upFileName.substring(index1+1,index2);
    return suffix;
  },
  render() {
    const src = this.props.src;
    const type = this.props.type || this.getFileName(src);
    const className = this.props.className;

    return (
      <div className={`zp-video ${className}`}>
        <video
          controls
          playsInline
          ref={(ref) => { this.video = ref; }}
          className="video-js"
        >
          <source src={src} type={`video/${type}`} />
        </video>
      </div>
    );
  }
});

export default CSSModules(Video, styles);
