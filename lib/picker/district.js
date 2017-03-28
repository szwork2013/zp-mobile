import React from 'react';
import { Picker } from 'antd-mobile';
import Connect from 'zp-core/lib/connect';
import CSSModules from 'react-css-modules';
import styles from './index.less';

/**
 * @description PickerDistrict
 * 主模块图标
 **/

class PickerDistrict extends React.Component {
  constructor(props) {
    super(props);

    this.formatData = this.formatData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      data: [],
      value: []
    };
  }

  componentDidMount() {
    Connect.getApi(10004, null, null, (data) => {
      this.setState({
        data: this.formatData(data.p)
      });
    });
  }

  formatData(data) {
    const getData = function getData(a, b) {
      a.forEach((item) => {
        b.push({
          value: item.value,
          label: item.text,
          children: item.children ? getData(item.children, []) : null
        });
      });

      return b;
    };

    return getData(data, []);
  }

  handleChange(value) {
    this.setState({
      value
    });

    this.props.onChange(value);
  }

  render() {
    const data = this.state.data;
    const value = this.state.value;

    return (
      <Picker value={value} data={data} extra={<div>请选择</div>} onChange={this.handleChange} title="选择地区">
        {this.props.children}
      </Picker>
    );
  }
}

PickerDistrict.propTypes = {
  children: React.PropTypes.node,
  onChange: React.PropTypes.func
};

PickerDistrict.defaultProps = {
  children: null,
  onChange: () => {}
};

export default CSSModules(PickerDistrict, styles);
