import React from 'react';
import { NavBar } from 'antd-mobile';
import Device from 'zp-core/lib/device';
import Router from 'zp-core/lib/router';
import CSSModules from 'react-css-modules';
import styles from './index.less';
import Pic from '../styles/images/icon/filter_down.png';

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

  setTitle() {
    // for android
    document.title = this.props.title;
    // console.log('设置标题:',_title);
    // for ios
    // IOS微信浏览器首次加载页面初始化title后，就再也不监听 document.title的change事件，
    // 动态创建一个iframe加载图片，实现一次加载，可让浏览器强制刷新
    // const i = document.createElement('iframe');
    // i.src = Pic;
    // i.style.display = 'none';
    // i.onload = function() {
    //   setTimeout(function(){
    //     i.remove();
    //   }, 9)
    // }
    // document.body.appendChild(i);
  }

  componentWillMount() {
    this.setTitle();
  }

  componentDidMount() {

    this.immersedStatusbar();
  }

  componentDidUpdate(nextProps) {
    this.immersedStatusbar();
  }

  render() {
    const iconName = this.props.iconName;
    const canBack = this.props.canBack;
    return (
        <div
            className="zp-page-header"
            ref={(ref) => { this.header = ref; }}
        >
          {
            this.props.navBar && (
                <NavBar
                    iconName={iconName}
                    leftContent={this.props.leftContent}
                    rightContent={this.props.rightContent || <div className="none">无</div>}
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
  rightContent: null,
  navBar: true,
  title: null,
  iconName: 'left',
  canBack: true
};

export default CSSModules(PageHeader, styles);
