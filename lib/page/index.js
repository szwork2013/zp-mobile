import React from 'react';
import CSSModules from 'react-css-modules';
import History from 'zp-core/lib/history';
import styles from './index.less';
import Header from './header';
import Content from './content';
import Footer from './footer';

/**
 * @description APP
 **/
const Page = React.createClass({
  propTypes: {
    children: React.PropTypes.node,
    store: React.PropTypes.object,
    className: React.PropTypes.string
  },
  contextTypes: {
    store: React.PropTypes.object
  },
  statics: {
    Header,
    Content,
    Footer
  },
  getDefaultProps() {
    return {
      store: null,
      className: '',
      ctrl: null
    };
  },
  getInitialState() {
    const state = this.context.store.getState();
    const key = state.routing.locationBeforeTransitions.key;
    // const historyKey = History.getCurrent().key;

    this.historyCurrent = Object.assign({}, History.getCurrent(), {
      key
    });

    // 保存History
    History.setItem(this.historyCurrent);

    // return {
    //   loaded: false
    // };
    return null;
  },
  // componentDidMount() {
  //   // 设置返回滚动条位置
  //   if (this.historyCurrent.page) {
  //     setTimeout(() => {
  //       const $content = $(this.page).find('.zp-page-content');
  //       if ($content.length) {
  //         $content[0].scrollTop = this.historyCurrent.page.scrollTop;
  //       }
  //       this.setState({
  //         loaded: true
  //       })
  //     }, 100);
  //   } else {
  //     this.setState({
  //       loaded: true
  //     });
  //   }
  // },
  componentWillUnmount() {
    // const $content = $(this.page).find('.zp-page-content')[0] || {};

    // this.historyCurrent.page = Object.assign({}, this.props.store, {
    //   scrollTop: $content.scrollTop || 0
    // });
    this.historyCurrent.page = Object.assign({}, this.props.store);
    History.setItem(this.historyCurrent, 'page');
  },
  // loaded: {},
  // historyCurrent: null,
  render() {
    return (
      <div className={`zp-page fluid ${this.props.className}`}>
        {this.props.children}
      </div>
    );
  }
});

export default CSSModules(Page, styles);
