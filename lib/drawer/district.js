import React from 'react';
import CSSModules from 'react-css-modules';
import { PickerView, Flex, Button } from 'antd-mobile';
import styles from './index.less';

const FlexItem = Flex.Item;

/**
 * @description DrawerDistricr
 * 抽屉-选择器
 **/
class DrawerDistricr extends React.Component {
  constructor(props) {
    super(props);

    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: [],
    };
  }

  handleChange(value) {
    this.setState({
      value
    });
  }

  handleCancel() {
    this.setState({
      value: []
    }, () => {
      this.props.onChange(this.state.value);
      this.context.hideDrawer();
    });
  }

  handleOk() {
    const data = this.state.value;
    let item = {};

    if (data[0]) item = data[0];
    if (data[1]) item = data[1];
    if (data[2]) item = data[2];

    console.log(item, data);

    this.props.onChange(item);
    this.context.hideDrawer(item, this.getNameByCode(this.props.data, item));
  }

  getNameByCode(data, codes) {
    const result = [];
    let code = codes;

    for (let i = 0; i < data.length; i++) {
      const p = data[i];
      result[0] = p.label;

      if (p.value === code) {
        return [result[0]];
      } else {
        if (!p.children) continue;
        for (let j = 0; j < p.children.length; j++) {
          const c = p.children[j];
          result[1] = c.label;

          if (c.value === code) {
            return [result[1]];
          } else {
            if (!c.children) continue;
            for (let k = 0; k < c.children.length; k++) {
              const a = c.children[k];
              result[2] = a.label;

              if (a.value === code) {
                return [result[2]];
              }
            }
          }
        }
      }
    }

    return '';
  }

  render() {
    const data = this.props.data;
    const value = this.state.value;
    const cols = this.props.cols;

    return (
      <div className="drawer-picker drawer-group-item">
        <PickerView
          value={value}
          data={data}
          cols={cols}
          onChange={this.handleChange}
        />
        <Flex className="drawer-picker-btn">
          <FlexItem><Button onClick={this.handleCancel}>清除</Button></FlexItem>
          <FlexItem><Button type="primary" onClick={this.handleOk}>确定</Button></FlexItem>
        </Flex>
      </div>
    );
  }
}

DrawerDistricr.propTypes = {
  data: React.PropTypes.array.isRequired,
  onChange: React.PropTypes.func,
  cols: React.PropTypes.number
};

DrawerDistricr.defaultProps = {
  cols: 3,
  data: [],
  onChange: () => {}
};

DrawerDistricr.contextTypes = {
  showDrawer: React.PropTypes.func,
  hideDrawer: React.PropTypes.func
};

export default CSSModules(DrawerDistricr, styles);
