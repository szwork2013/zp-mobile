import React from 'react';
import CSSModules from 'react-css-modules';
import { Device, Utils } from 'zp-core';
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
    };
  }
  onChange(files) {
    this.setState({
      files
    });
  }
  submit(cb) {
    const { files } = this.state;
    const uploadList = [];
    const submitList = [];
    // 获取上传地址和提交地址
    files.forEach((item) => {
      const url = item.url || '';
      if (url.indexOf('file://') > -1) uploadList.push(url);
      else submitList.push(url.replace(this.props.baseUrl, ''));
    });
    // 判断是否需要上传图片
    if (uploadList.length) {
      // 上传文件列表
      console.log('imagePicker上传列表', JSON.stringify(uploadList));
      Device.uploader.uploadImageList(`${window.baseUrl}/api/check/collateral/ajaxUploadImg`, uploadList, this.props.query, (item) => {
        console.log('imagePicker成功列表', JSON.stringify(submitList.concat(item)));
        cb && cb(submitList.concat(item));
      });
    } else {
      cb && cb(submitList);
    }
  }
  handleAddImageClick(e) {
    e.preventDefault();
    // 获取需要上传的文件
    Device.uploader.uploaderActionSheet((list) => {
      const files = this.state.files;
      // 构造文件列表
      list.forEach((item) => {
        files.push({
          url: item,
          id: Utils.getUUID(6),
        });
      });
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
