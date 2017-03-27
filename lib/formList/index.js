import React from 'react';
import { Device, Utils } from 'zp-core';
import CSSModules from 'react-css-modules';
import styles from './index.less';
import Form from './form';

/**
 * @description FormList
 * 表单列表
 **/
class FormList extends React.Component {
  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
    this.formatValue = this.formatValue.bind(this);
    this.handleError = this.handleError.bind(this);
  }
  submit(successCallback, errorCallback) {
    this.form.validateFields((error, value) => {
      if (!error) {
        successCallback && successCallback(this.formatValue(value));
      } else {
        this.handleError(error);
        errorCallback && errorCallback(value);
      }
    });
  }
  clear() {
    this.form.resetFields();
  }

  handleError(error) {
    const data = this.props.data;

    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (error[item.key]) {
        Device.nativeUI.toast(`${item.title}不能为空`);
        return;
      }
    }
  }

  formatValue(value) {
    const newValue = {};
    const data = this.props.data;

    data.forEach((item) => {
      const key = item.key;
      const type = item.type;
      const formatDate = item.formatDate;

      if (value[key] === null || value[key] === undefined) return;

      if (type === 'date' || type === 'time' || type === 'dateTime') {
        if (formatDate) {
          newValue[key] = Utils.dateFormat(value[key].toDate(), formatDate);
        } else {
          newValue[key] = value[key];
        }
      } else if (type === 'picker') {
        newValue[key] = value[key][0];
      } else {
        newValue[key] = value[key];
      }

      if (item.format) {
        newValue[key] = item.format(value[key]);
      }
    });

    return newValue;
  }

  render() {
    const data = this.props.data;

    return (
      <div styleName="form-list">
        <Form data={data} onChange={this.props.onChange} ref={(ref) => { this.form = ref; }} />
      </div>
    );
  }
}

FormList.propTypes = {
  data: React.PropTypes.array,
  onChange: React.PropTypes.func
};

FormList.defaultProps = {
  data: [],
  onChange: () => {}
};

export default CSSModules(FormList, styles);
