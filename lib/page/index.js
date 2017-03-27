import React from 'react';
import CSSModules from 'react-css-modules';
import { History } from 'zp-core';
import styles from './index.less';
import Header from './header';
import Content from './content';
import Footer from './footer';

const $ = window.jQuery;

/**
 * @description APP
 **/
const Page = React.createClass({
  propTypes: {
    children: React.PropTypes.node,
    store: React.PropTypes.object,
    className: React.PropTypes.string
  },
  childContextTypes: {
    getLoaded: React.PropTypes.func
  },
  statics: {
    Header,
    Content,
    Footer
  },
  getDefaultProps() {
    return {
      store: null,
      className: ''
    };
  },
  getChildContext() {
    return {
      getLoaded: this.getLoaded
    };
  },
  componentDidMount() {
    this.historyCurrent = History.getCurrent();
  },
  componentWillUnmount() {
    const current = this.historyCurrent;
    current.page = this.props.store;
    History.setItem(current);
  },
  getLoaded(name, ele) {
    this.loaded[name] = ele;
    this.count += 1;

    if (this.count === 3) this.initPage();
  },
  count: 0,
  loaded: {},
  historyCurrent: null,
  initPage() {
    console.log('page初始化完成');
    const $header = $(this.loaded.header);
    const $footer = $(this.loaded.footer);
    const $content = $(this.loaded.content);

    $content.css({
      top: $header.height() - 1, // 修复移动端有时候有1px偏差的bug
      bottom: $footer.height(),
      opacity: 1
    });
  },
  render() {
    return (
      <div styleName="page" className={`fluid ${this.props.className}`}>
        {this.props.children}
      </div>
    );
  }
});

export default CSSModules(Page, styles);
