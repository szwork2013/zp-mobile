import React from 'react';
import CSSModules from 'react-css-modules';
import { Connect } from 'zp-core';
import { ImagePicker as Picker } from 'antd-mobile';
import styles from './index.less';

class ImagePickre extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      files: []
    }
  }
  submit() {
    const { files } = this.state;
    const formData = new FormData();

    files.map((item, index) => {
      formData.append(index, item.file);
    })

// 遍历图片文件列表，插入到表单数据中
//     for (var i = 0, file; file = oFiles[i]; i++) {
//       // 文件名称，文件对象
//       formData.append(file.name, file);
//     }
    console.log(files, formData);
    Connect.getApi(40022, {
      file: formData
    }, null);
  }
  onChange(files, type, index) {
    console.log(files);
    this.setState({
      files
    });
  }
  render() {
    const { files } = this.state;
    return (
      <div>
        <Picker
          files={files}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default CSSModules(ImagePickre, styles);
