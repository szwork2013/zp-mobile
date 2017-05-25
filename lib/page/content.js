import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.less';
import Scroll from '../scroll';

/**
 * @description PageContent
 **/
class PageContent extends React.Component {
  componentDidMount() {
    // console.log('content componentDidMount');
  }

  componentWillUnmount() {
    // console.log('content componentWillUnmount');
  }

  render() {
    return (
      <div
        className="zp-page-content"
        ref={(ref) => { this.content = ref; }}
      >
        {this.props.scroll ? <Scroll scrollName="pageContent">{this.props.children}</Scroll> : this.props.children}
      </div>
    );
  }
}

PageContent.propTypes = {
  children: React.PropTypes.node,
  scroll: React.PropTypes.bool
};

PageContent.defaultProps = {
  scroll: true
};

export default CSSModules(PageContent, styles);
