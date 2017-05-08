import React from 'react';
import CSSModules from 'react-css-modules';
import { PickerView, Flex, Button } from 'antd-mobile';
import styles from './index.less';

const FlexItem = Flex.Item;

/**
 * @description DrawerPickerView
 * 抽屉-选择器
 **/
class DrawerPickerView extends React.Component {
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
    this.props.onChange(this.state.value);
    this.context.hideDrawer();
  }

  render() {
    const data = this.props.data;
    const value = this.state.value;
    const cols = this.props.cols;

    return (
      <div className="drawer-picker drawer-group-item">
        <PickerView
          cols={cols}
          value={value}
          data={data}
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

DrawerPickerView.propTypes = {
  data: React.PropTypes.array.isRequired,
  onChange: React.PropTypes.func,
  cols: React.PropTypes.number
};

DrawerPickerView.defaultProps = {
  data: [],
  onChange: () => {},
  cols: 1
};

DrawerPickerView.contextTypes = {
  showDrawer: React.PropTypes.func,
  hideDrawer: React.PropTypes.func
};

export default CSSModules(DrawerPickerView, styles);
