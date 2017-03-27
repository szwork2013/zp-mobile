import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.less';

/**
 * @description Empty
 * 空数据
 **/

class Empty extends React.Component {
  render() {
    const text = this.props.text;
    const type = this.props.type;
    let node = <div styleName="empty-text">{text}</div>;

    if (type === 'search') node = <div styleName="empty-text">未找到与“<span>{text}</span>”相关的结果</div>;
    if (type === 'loading') node = <div styleName="empty-text">努力加载中</div>;

    return (
      <div styleName="empty">
        <div styleName={`empty-pic empty-${type}`} />
        {node}
      </div>
    );
  }
}

Empty.propTypes = {
  text: React.PropTypes.string,
  type: React.PropTypes.string
};

Empty.defaultProps = {
  text: '暂时没有数据',
  type: 'todo'
};

export default CSSModules(Empty, styles, {
  allowMultiple: true
});
