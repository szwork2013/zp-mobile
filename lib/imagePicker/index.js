import React from 'react';
import CSSModules from 'react-css-modules';
import { Connect, Device, Utils } from 'zp-core';
import { ImagePicker as Picker } from 'antd-mobile';
import styles from './index.less';

class ImagePickre extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleAddImageClick = this.handleAddImageClick.bind(this);
    this.state = {
      files: this.props.defaultValue
    }
  }
  submit(cb) {
    const { files } = this.state;
    let count = 0;
    const uploadList = [];
    const submitList = [];
    // 成功回调函数
    const successCallback = () => {
      count++;
      if (count === uploadList.length) {
        Device.nativeUI.closeWaiting();
        cb && cb(submitList);
      }
    }
    // 获取上传地址和提交地址
    files.forEach((item, index) => {
      const url = item.url || '';
      if (item.url.indexOf('file://') > -1) uploadList.push(item.url);
      else submitList.push(item.url.replace(this.props.baseUrl, ''));
    });
    // 判断是否需要上传图片
    if (uploadList.length) {
      // 显示等待框
      Device.nativeUI.showWaiting('图片上传中');
      // 循环上传
      uploadList.forEach((item) => {
        // 上传文件
        Device.uploader.createUpload(`${window.baseUrl}/api/check/collateral/ajaxUploadImg`, item, this.props.query, (url) => {
          if (url) submitList.push(url);
          successCallback();
        });
      })
    } else {
      cb && cb(submitList);
    }

  }
  onChange(files, type, index) {
    console.log(files);
    this.setState({
      files
    });
  }
  handleAddImageClick(e) {
    e.preventDefault();
    Device.gallery.pick(null, (list) => {
      const files = this.state.files;
      // 构造文件列表
      list.forEach((item) => {
        files.push({
          url: item,
          id: Utils.getUUID(6),
        })
      })
      // 设置显示
      this.setState({
        files
      });
    });

  }
  render() {
    const { files } = this.state;
    return (
      <div>
        <Picker
          files={files}
          onChange={this.onChange}
          onAddImageClick={this.handleAddImageClick}
        />
      </div>
    );
  }
}

ImagePickre.propTypes = {
  query: React.PropTypes.object,
  defaultValue: React.PropTypes.array,
  baseUrl: React.PropTypes.string
};

ImagePickre.defaultProps = {
  query: {},
  defaultValue: [],
  baseUrl: ''
};

export default CSSModules(ImagePickre, styles);
