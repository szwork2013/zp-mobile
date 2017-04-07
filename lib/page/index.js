import React from 'react';
import CSSModules from 'react-css-modules';
import History from 'zp-core/lib/history';
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
  componentDidMount() {
    this.historyCurrent = History.getCurrent();
  },
  componentWillUnmount() {
    const current = this.historyCurrent;
    current.page = this.props.store;
    History.setItem(current);
  },
  loaded: {},
  historyCurrent: null,
  render() {
    return (
      <div styleName="page" className={`fluid ${this.props.className}`}>
        {this.props.children}
      </div>
    );
  }
});

export default CSSModules(Page, styles);
