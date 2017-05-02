import React from 'react';
import CSSModules from 'react-css-modules';
import Card from '../card';
import styles from './index.less';

const CardHeader = Card.Header;

/**
 * @description TableData
 * 房源详情页内容
 **/

class TableData extends React.Component {
  render() {
    const data = this.props.data;
    const title = this.props.title || '';

    return (
      <div className="zp-table">
        {
          title ? <CardHeader title={title} /> : null
        }
        <div className="table-content">
          {
            data.map((row, rowIndex) => (
              <div key={rowIndex} className="table-row">
                {
                  row.map((rowItem, rowItemIndex) => (
                    <div key={rowItemIndex} className={`table-row-item row-${row.length}`} style={{width: `${100 / row.length}%`}}>
                      <div className="table-row-item-name">{rowItem.name}</div>
                      <div className="table-row-item-value">{rowItem.value}</div>
                    </div>
                  ))
                }
              </div>
            ))
          }
        </div>
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
