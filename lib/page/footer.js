import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.less';

/**
 * @description PageFooter
 **/
class PageFooter extends React.Component {
  componentDidMount() {
    this.context.getLoaded('footer', this.footer);
  }

  render() {
    return (
      <div
        styleName="page-footer"
        ref={(ref) => { this.footer = ref; }}
      >
        {this.props.children}
      </div>
    );
  }
}

PageFooter.propTypes = {
  children: React.PropTypes.node
};

PageFooter.contextTypes = {
  getLoaded: React.PropTypes.func
};

export default CSSModules(PageFooter, styles);
