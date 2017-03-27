import React from 'react';
import CSSModules from 'react-css-modules';
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
      <div styleName="search-bar">
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
  placeholder: React.PropTypes.string
};

SearchBar.defaultProps = {
  onSubmit: () => {},
  onChange: () => {},
  placeholder: ''
};

export default CSSModules(SearchBar, styles, {
  allowMultiple: true
});
