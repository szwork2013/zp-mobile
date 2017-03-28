import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.less';
import Submit from './Submit';

/**
 * @description 按钮
 **/
const Button = React.createClass({
  statics: {
    Submit
  },
  render() {
    return null;
  }
});

export default CSSModules(Button, styles);
