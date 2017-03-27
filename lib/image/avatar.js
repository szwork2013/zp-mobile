import React from 'react';
import Image from './index';
import UserAvatar from '../../assets/images/avatar.png';

/**
 * @description Image
 * 图片
 **/

class Avatar extends React.Component {
  render() {
    // const src = this.props.src;
    const className = this.props.className;

    return (
      <Image background={UserAvatar} className={className} circle />
    );
  }
}

Avatar.propTypes = {
  className: React.PropTypes.string,
  // src: React.PropTypes.string
};

Avatar.defaultProps = {
  className: '',
  // src: '',
};

export default Avatar;
