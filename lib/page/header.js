import React from 'react';
import { NavBar } from 'antd-mobile';
import Device from 'zp-core/lib/device';
import Router from 'zp-core/lib/router';
import CSSModules from 'react-css-modules';
import styles from './index.less';

const $ = window.jQuery;

/**
 * @description PageHeader
 **/
class PageHeader extends React.Component {
  immersedStatusbar() {
    if (Device.navigator.isImmersedStatusbar()) {
      const height = Device.navigator.getStatusbarHeight();
      $(this.header).find('.am-navbar').css({
        paddingTop: height,
        boxSizing: 'content-box'
      });
    }
  }

  componentDidMount() {
    this.immersedStatusbar();
    this.context.getLoaded('header', this.header);
  }

  componentDidUpdate(nextProps) {
    this.immersedStatusbar();
  }

  render() {
    const iconName = this.props.iconName;
    const canBack = this.props.canBack;
    return (
        <div
            styleName="page-header"
            ref={(ref) => { this.header = ref; }}
        >
          {
            this.props.navBar && (
                <NavBar
                    iconName={iconName}
                    leftContent={this.props.leftContent}
                    rightContent={this.props.rightContent}
                    onLeftClick={() => {
                      if (!canBack) return;
                      Router.goBack();
                    }}
                >
                  { this.props.title }
                </NavBar>
            )
          }
          {this.props.children}
        </div>
    );
  }
}

PageHeader.propTypes = {
  navBar: React.PropTypes.bool,
  leftContent: React.PropTypes.any,
  rightContent: React.PropTypes.any,
  title: React.PropTypes.node.isRequired,
  children: React.PropTypes.node,
  iconName: React.PropTypes.any,
  canBack: React.PropTypes.bool
};

PageHeader.defaultProps = {
  leftContent: '返回',
  rightContent: <div />,
  navBar: true,
  title: null,
  iconName: 'left',
  canBack: true
};

PageHeader.contextTypes = {
  getLoaded: React.PropTypes.func
};

export default CSSModules(PageHeader, styles);
