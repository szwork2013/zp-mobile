import React from 'react';
import CSSModules from 'react-css-modules';
import Device from 'zp-core/lib/device';
import { SearchBar as AntdSearchBar } from 'antd-mobile';
import styles from './index.less';

/**
 * @description TagPicker
 * 标签选择器
 **/

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.state = {
      value: ''
    };
  }

  componentDidMount() {
    const immersed = this.props.immersed;
    if (Device.navigator.isImmersedStatusbar() && immersed) {
      const height = Device.navigator.getStatusbarHeight();
      $(this.searchBar).find('.am-search').css({
        paddingTop: height,
        boxSizing: 'content-box'
      });
    }
  }

  handleChange(value) {
    this.setState({
      value
    });

    this.props.onChange(value);
  }

  handleSubmit(value) {
    this.props.onSubmit(value);
  }

  handleCancel() {
    this.setState({
      value: ''
    });

    this.props.onSubmit('');
  }

  render() {
    const value = this.state.value;
    const placeholder = this.props.placeholder;

    return (
      <div
        styleName="search-bar"
        ref={(ref) => { this.searchBar = ref; }}
      >
        <AntdSearchBar
          value={value}
          placeholder={placeholder}
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
          onCancel={this.handleCancel}
        />
      </div>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: React.PropTypes.func,
  onChange: React.PropTypes.func,
  placeholder: React.PropTypes.string,
  immersed: React.PropTypes.bool
};

SearchBar.defaultProps = {
  onSubmit: () => {},
  onChange: () => {},
  placeholder: '',
  immersed: false // 沉浸式导航栏
};

export default CSSModules(SearchBar, styles, {
  allowMultiple: true
});
