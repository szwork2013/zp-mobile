import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.less';

/**
 * @description PageContent
 **/
class PageContent extends React.Component {
  render() {
    return (
      <div
        styleName="page-content"
        ref={(ref) => { this.content = ref; }}
      >
        {this.props.children}
      </div>
    );
  }
}

PageContent.propTypes = {
  children: React.PropTypes.node
};

export default CSSModules(PageContent, styles);
