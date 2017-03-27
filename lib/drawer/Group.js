import React from 'react';
import CSSModules from 'react-css-modules';
import { Drawer, Flex } from 'antd-mobile';
import { Device } from 'zp-core';
import styles from './index.less';


const $ = window.jQuery;
const body = window.document.body;
const FlexItem = Flex.Item;
const clientHeight = document.documentElement.clientHeight;
let groupTop = 0;

/**
 * @description DrawerGroup
 * 抽屉-排序
 **/
class DrawerGroup extends React.Component {
  constructor(props) {
    super(props);

    this.showDrawer = this.showDrawer.bind(this);
    this.hideDrawer = this.hideDrawer.bind(this);
    this.renderSidebar = this.renderSidebar.bind(this);
    this.sidebar = [];
    this.state = {
      selected: null
    };
  }

  getChildContext() {
    return {
      showDrawer: this.showDrawer,
      hideDrawer: this.hideDrawer
    };
  }

  componentDidMount() {
    // 获取当前位置
    groupTop = $(this.group).offset().top;
  }

  componentWillUnmount() {
    body.setAttribute('style', '');
  }

  showDrawer(id) {
    groupTop = $(this.group).offset().top;
    const selected = this.state.selected;

    // 点击相同的项等于关闭
    if (id === selected) {
      this.hideDrawer();
      return;
    }

    // 设置样式
    body.setAttribute('style', 'overflow:hidden');
    this.group.setAttribute('style', `height:${clientHeight - groupTop}px`);

    // 缓存sidebar
    this.sidebar[id] = true;

    // 显示Sidebar
    this.setState({
      open: true,
      selected: id
    });
  }

  hideDrawer() {
    // 先展示隐藏动画效果
    this.setState({
      open: false
    });

    // 延时关闭
    setTimeout(() => {
      // 设置样式
      body.setAttribute('style', '');
      this.group.setAttribute('style', '');
      // 再隐藏Sidebar
      this.setState({
        selected: null
      });
    }, 200);
  }

  renderSidebar() {
    let statusbarHeight = 0;
    const children = this.props.children;
    const selected = this.state.selected;

    if (Device.navigator.isImmersedStatusbar()) {
      statusbarHeight = Device.navigator.getStatusbarHeight();
    }

    return (
      <div className="drawer-group-sidebar">
        {
          React.Children.map(children, (item, index) => (
            <div
              className="drawer-group-sidebar"
              key={index}
              style={{
                display: selected === index ? 'block' : 'none',
                height: clientHeight - groupTop - statusbarHeight
              }}
              onClick={(e) => {
                const className = e.target.getAttribute('class');
                if (className === 'drawer-group-sidebar') this.hideDrawer();
              }}
            >
              {this.sidebar[index] ? item : null}
            </div>
          ))
        }
      </div>
    );
  }

  render() {
    const open = this.state.open;
    const children = this.props.children;
    const selected = this.state.selected;

    return (
      <div
        styleName="drawer-group"
        ref={(ref) => { this.group = ref; }}
      >
        <Drawer
          position="top"
          open={open}
          sidebar={this.renderSidebar()}
          onOpenChange={this.hideDrawer}
          sidebarStyle={{
            zIndex: 99
          }}
          contentStyle={{
            zIndex: 999,
            bottom: 'auto'
          }}
          overlayStyle={{
            zIndex: 9
          }}
        >
          <div styleName="drawer-group-main">
            <Flex>
              {
                React.Children.map(children, (item, index) => (
                  <FlexItem key={index}>
                    <div
                      styleName={`drawer-group-btn ${selected === index ? 'selected' : ''}`}
                      onClick={() => {
                        this.showDrawer(index);
                      }}
                    >
                      {item.props.title}
                    </div>
                  </FlexItem>
                ))
              }
            </Flex>
          </div>
        </Drawer>
      </div>
    );
  }
}

DrawerGroup.propTypes = {
  children: React.PropTypes.node.isRequired
};

DrawerGroup.defaultProps = {
  children: []
};

DrawerGroup.childContextTypes = {
  showDrawer: React.PropTypes.func,
  hideDrawer: React.PropTypes.func
};

export default CSSModules(DrawerGroup, styles, {
  allowMultiple: true
});
