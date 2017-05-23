// import React from 'react';
// import CSSModules from 'react-css-modules';
// import { Flex } from 'antd-mobile';
// import styles from './index.less';
//
//
// const $ = window.jQuery;
// const body = window.document.body;
// const FlexItem = Flex.Item;
// const clientHeight = document.documentElement.clientHeight;
// let groupTop = 0;
//
// /**
//  * @description DrawerGroup
//  * 抽屉-排序
//  **/
// class DrawerGroup extends React.Component {
//   constructor(props) {
//     super(props);
//
//     // this.initData = this.initData.bind(this);
//     this.showDrawer = this.showDrawer.bind(this);
//     this.hideDrawer = this.hideDrawer.bind(this);
//     this.renderSidebar = this.renderSidebar.bind(this);
//     this.sidebar = [];
//     this.sidebarValue = [];
//     this.state = {
//       selected: null
//     };
//   }
//
//   getChildContext() {
//     return {
//       showDrawer: this.showDrawer,
//       hideDrawer: this.hideDrawer
//     };
//   }
//
//   componentDidMount() {
//     // 获取当前位置
//     groupTop = $(this.group).offset().top;
//   }
//
//   componentWillUnmount() {
//     body.setAttribute('style', '');
//   }
//
//   showDrawer(id) {
//     // groupTop = $(this.group).offset().top;
//     const selected = this.state.selected;
//
//     // 点击相同的项等于关闭
//     if (id === selected) {
//       this.hideDrawer();
//       return;
//     }
//
//     // 设置样式
//     body.setAttribute('style', 'overflow:hidden');
//     // this.group.setAttribute('style', `height:${clientHeight - groupTop}px`);
//
//     // 缓存sidebar
//     this.sidebar[id] = true;
//
//     // 显示Sidebar
//     this.setState({
//       open: true,
//       selected: id
//     });
//   }
//
//   hideDrawer(value, name) {
//     // 先展示隐藏动画效果
//     this.setState({
//       open: false
//     });
//
//     // 延时关闭
//     setTimeout(() => {
//       // 设置值
//       this.sidebarValue[this.state.selected] = {
//         value,
//         name
//       };
//       // 设置样式
//       body.setAttribute('style', '');
//       // this.group.setAttribute('style', '');
//       // 再隐藏Sidebar
//       this.setState({
//         selected: null
//       });
//     }, 200);
//   }
//
//   renderBtn() {
//     const children = this.props.children;
//     const selected = this.state.selected;
//
//     return (
//       <div styleName="drawer-group-main">
//         <Flex>
//           {
//             React.Children.map(children, (item, index) => {
//               const sidebarValue = this.sidebarValue[index] || {};
//               const sidebarName = sidebarValue.name
// && sidebarValue.value !== '' ? sidebarValue.name : item.props.title;
//               return (
//                 <FlexItem key={index}>
//                   <div
//                     styleName={`drawer-group-btn ${selected === index ? 'selected' : ''}`}
//                     onClick={() => {
//                       this.showDrawer(index);
//                     }}
//                   >
//                     <div styleName="title">{sidebarName}</div>
//                     <div styleName="icon" />
//                   </div>
//                 </FlexItem>
//               );
//             })
//           }
//         </Flex>
//       </div>
//     );
//   }
//
//   renderSidebar() {
//     const children = this.props.children;
//     const selected = this.state.selected;
//     return (
//       <div
//         className="drawer-group-sidebar"
//         style={{
//           height: selected !== null ? clientHeight - groupTop : 0,
//           opacity: selected !== null ? 1 : 0
//         }}
//         onClick={(e) => {
//           // 点击背景隐藏
//           const className = e.target.getAttribute('class');
//           if (className === 'drawer-group-sidebar') this.hideDrawer();
//         }}
//       >
//         {
//           React.Children.map(children, (item, index) => (
//             <div
//               key={index}
//               style={{
//                 display: selected === index ? 'block' : 'none'
//               }}
//             >
//               {this.sidebar[index] ? item : null}
//             </div>
//           ))
//         }
//       </div>
//     );
//   }
//
//   render() {
//     return (
//       <div styleName="drawer-group">
//         <div
//           styleName="drawer-group-content"
//           ref={(ref) => { this.group = ref; }}
//         >
//           {this.renderBtn()}
//           {this.renderSidebar()}
//         </div>
//       </div>
//     );
//   }
// }
//
// DrawerGroup.propTypes = {
//   children: React.PropTypes.node.isRequired,
//   // defaultValue: React.PropTypes.array
// };
//
// DrawerGroup.defaultProps = {
//   children: [],
//   // defaultValue: []
// };
//
// DrawerGroup.childContextTypes = {
//   showDrawer: React.PropTypes.func,
//   hideDrawer: React.PropTypes.func
// };
//
// export default CSSModules(DrawerGroup, styles, {
//   allowMultiple: true
// });

import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.less';


const $ = window.jQuery;
const body = window.document.body;
const clientHeight = document.documentElement.clientHeight;
const cloneElement = React.cloneElement;
let groupTop = 0;

/**
 * @description DrawerGroup
 * 抽屉-排序
 **/
class DrawerGroup extends React.Component {
  constructor(props) {
    super(props);

    // this.initData = this.initData.bind(this);
    this.showDrawer = this.showDrawer.bind(this);
    this.hideDrawer = this.hideDrawer.bind(this);
    this.renderMask = this.renderMask.bind(this);
    // this.sidebar = [];
    // this.sidebarValue = [];
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
    // groupTop = $(this.group).offset().top;
    const selected = this.state.selected;

    // 点击相同的项等于关闭
    if (id === selected) {
      this.hideDrawer();
      return;
    }

    // 设置样式
    body.setAttribute('style', 'overflow:hidden');
    // this.group.setAttribute('style', `height:${clientHeight - groupTop}px`);

    // 缓存sidebar
    // this.sidebar[id] = true;

    // 显示Sidebar
    this.setState({
      // open: true,
      selected: id
    });
  }

  hideDrawer() {
    // 先展示隐藏动画效果
    // this.setState({
    //   open: false
    // });

    // 延时关闭
    setTimeout(() => {
      // 设置值
      // this.sidebarValue[this.state.selected] = {
      //   value,
      //   name
      // };
      // 设置样式
      body.setAttribute('style', '');
      // this.group.setAttribute('style', '');
      // 再隐藏Sidebar
      this.setState({
        selected: null
      });
    }, 0);
  }

  renderBtn() {
    const children = this.props.children;
    const selected = this.state.selected;

    return (
      <div styleName="drawer-group-btn">
        {
          React.Children.map(children, (item, index) => (
            <div
              styleName={`drawer-group-btn-item ${selected === index ? 'selected' : ''}`}
              onClick={() => this.showDrawer(index)}
            >
              {cloneElement(item, {show: selected === index})}
            </div>
          ))
        }
      </div>
    );
  }

  renderMask() {
    const selected = this.state.selected;
    return (
      <div
        styleName="drawer-group-mask"
        style={{
          height: selected !== null ? clientHeight - groupTop : 0,
          opacity: selected !== null ? 1 : 0
        }}
        onClick={this.hideDrawer}
      />
    );
  }

  render() {
    return (
      <div styleName="drawer-group">
        <div
          styleName="drawer-group-content"
          ref={(ref) => { this.group = ref; }}
        >
          {this.renderBtn()}
          {this.renderMask()}
        </div>
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

