import React from 'react';
import CSSModules from 'react-css-modules';
import History from 'zp-core/lib/history';
import styles from './index.less';

/**
 * @description TabBarContent
 * TabBarContent
 **/

class TabBarContent extends React.Component {
  constructor(props) {
    super(props);
    this.historyCurrent = null;

    this.state = {
      loaded: false
    }
  }
  componentWillMount() {
    this.historyCurrent = History.getCurrent();
  }
  componentDidMount() {
    // 设置返回滚动条位置
    if (this.historyCurrent.tab) {
      const tab = this.historyCurrent.tab;
      const $contentList = $(this.content).find('.tab-bar-content');
      // 设置每个项的滚动条位置
      $contentList.each(function(index) {
        if ($(this).length && tab[index]) {
          // $(this).scrollTop(tab[index].scrollTop);
        }
      });

      // this.setState({
      //   loaded: true
      // })
    } else {
      // this.setState({
      //   loaded: true
      // })
    }
  }
  componentWillUnmount() {
    const tab = [];
    const current = this.historyCurrent;
    const $contentList = $(this.content).find('.tab-bar-content');
    // 获取每个项的滚动条位置
    $contentList.each(function(index) {
      if ($(this).length) {
        const scrollTop = $(this)[0].scrollTop;
        tab[index] = {
          scrollTop
        }
      }
    });
    // 保存数据
    current.tab = tab;
    History.setItem(current, 'tab');
  }
  render() {
    const data = this.props.data;
    const selected = this.props.selected;
    const loaded = this.state.loaded;

    return (
      <div className="zp-tab-bar-content" ref={(ref) => {this.content = ref;}}>
        {
          data.map((item, index) => (
            <div
              key={index}
              className={`tab-bar-content ${selected === index ? 'cur' : ''}`}
            >
              {item.render}
            </div>
          ))
        }
      </div>
    );
  }
}

TabBarContent.propTypes = {
  data: React.PropTypes.array,
  selected: React.PropTypes.number
};

TabBarContent.defaultProps = {
  data: [],
  selected: 0
};

export default CSSModules(TabBarContent, styles, {
  allowMultiple: true
});
