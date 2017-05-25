import React from 'react';
import CSSModules from 'react-css-modules';
import History from 'zp-core/lib/history';
import styles from './index.less';

/**
 * @description Scroll
 * 滚动区域
 **/
class Scroll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }

  componentWillMount() {
    this.current = History.getCurrent();
  }

  componentDidMount() {
    const scroll = this.current[this.props.scrollName] || {};
    const scrollTop = scroll.scrollTop || 0;
    const scrollLeft = scroll.scrollLeft || 0;

    if (this.scroll && this.current[this.props.scrollName]) {
      this.scroll.scrollTop = scrollTop;
      this.scroll.scrollLeft = scrollLeft;
    }

    this.setState({
      loaded: true
    });
  }

  componentWillUnmount() {
    if (this.scroll) {
      this.current[this.props.scrollName] = Object.assign({}, {
        scrollTop: this.scroll.scrollTop,
        scrollLeft: this.scroll.scrollLeft
      });
      History.setItem(this.current, this.props.scrollName);
      // console.log(this.props.scrollName, '销毁', this.scroll.scrollTop, this.scroll.scrollLeft);
    }
  }

  render() {
    return (
      <div className="zp-scroll" ref={(ref) => { this.scroll = ref; }}>
        {this.state.loaded || <div style={{height: 10000}} />}
        {this.props.children}
      </div>
    );
  }
}

Scroll.propTypes = {
  children: React.PropTypes.node,
  scrollName: React.PropTypes.string
};

Scroll.defaultProps = {
  children: null,
  scrollName: 'scroll'
};

export default CSSModules(Scroll, styles, {
  allowMultiple: true
});
