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
    ctrl: React.PropTypes.object,
    className: React.PropTypes.string
  },
  statics: {
    Header,
    Content,
    Footer
  },
  contextTypes: {
    store: React.PropTypes.object
  },
  getDefaultProps() {
    return {
      store: null,
      className: '',
      ctrl: null
    };
  },
  getInitialState() {
    let state = this.context.store.getState();
    const key = state.routing.locationBeforeTransitions.key;
    const historyKey = History.getCurrent().key;

    this.historyCurrent = Object.assign({}, History.getCurrent(), {
      key
    });

    // 保存History
    History.setItem(this.historyCurrent);

    return {
      loaded: false
    };
  },
  componentDidMount() {
    // 设置返回滚动条位置
    if (this.historyCurrent.page) {
      setTimeout(() => {
        $(this.page).find('.zp-page-content')[0].scrollTop = this.historyCurrent.page.scrollTop;
        this.setState({
          loaded: true
        })
      }, 100);
    } else {
      this.setState({
        loaded: true
      });
    }
  },
  componentWillUnmount() {
    const current = this.historyCurrent;
    this.historyCurrent.page = Object.assign({}, this.props.store, {
      scrollTop: $(this.page).find('.zp-page-content')[0].scrollTop
    });
    History.setItem(this.historyCurrent, 'page');
  },
  loaded: {},
  historyCurrent: null,
  render() {
    return (
      <div className={`zp-page fluid ${this.props.className} ${this.state.loaded?'loaded':''}`} ref={(ref) => {this.page = ref;}}>
        {this.props.children}
      </div>
    );
  }
});

export default CSSModules(Page, styles);
