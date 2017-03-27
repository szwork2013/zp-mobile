import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.less';

/**
 * @description TableData
 * 房源详情页内容
 **/

class TableData extends React.Component {
  render() {
    const data = this.props.data;
    const title = this.props.title || '';

    return (
      <div styleName="table">
        {
          title ? <div styleName="table-title">{title}</div> : null
        }
        {
          data.map((row, rowIndex) => (
            <div key={rowIndex} styleName="table-row">
              {
                row.map((rowItem, rowItemIndex) => (
                  <div key={rowItemIndex} styleName={`table-row-item row-${row.length}`} style={{width: `${100 / row.length}%`}}>
                    <div styleName="table-row-item-name">{rowItem.name}</div>
                    <div styleName="table-row-item-value">{rowItem.value}</div>
                  </div>
                ))
              }
            </div>
          ))
        }
      </div>
    );
  }
}

TableData.propTypes = {
  title: React.PropTypes.string,
  data: React.PropTypes.array
};

export default CSSModules(TableData, styles, {
  allowMultiple: true
});
