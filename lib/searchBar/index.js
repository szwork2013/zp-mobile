import React from 'react';
import CSSModules from 'react-css-modules';
import Device from 'zp-core/lib/device';
import Image from '../image';
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
      value: this.props.defaultValue,
      show: false,
      selectIndex: 0
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
    const selectData = this.props.selectData;
    const selectIndex = this.state.selectIndex;

    this.props.onSubmit(value, selectData[selectIndex].value);
  }

  handleCancel() {
    this.setState({
      value: ''
    });

    if (this.props.cancelSubmit) {
      this.props.onSubmit('');
    }

    this.props.onCancel();
  }

  render() {
    const value = this.state.value;
    const placeholder = this.props.placeholder;
    const select = this.props.select;
    const show = this.state.show;
    const selectData = this.props.selectData;
    const selectIndex = this.state.selectIndex;

    return (
      <div
        styleName={`search-bar ${select?'select':''} ${show?'show':''}`}
        ref={(ref) => { this.searchBar = ref; }}
      >
        <AntdSearchBar
          value={value}
          placeholder={placeholder}
          autoFocus={this.props.autoFocus}
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
          onCancel={this.handleCancel}
        />
        {
          select && (
            <div styleName="select-wrap">
              <div
                styleName="select-value"
                onClick={() => {
                  this.setState({
                    show: true
                  });
                }}
              >
                {selectData[selectIndex].name}
              </div>
              <div styleName="select-icon" />
            </div>
          )
        }
        {
          select && (
            <div
              styleName="mask"
              onClick={() => {
                this.setState({
                  show: false
                })
              }}
            />
          )
        }
        {
          select && (
            <div styleName="select-content">
              <ul>
                {
                  this.props.selectData.map((item, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        this.setState({
                          show: false,
                          selectIndex: index
                        })
                      }}
                    >
                      <Image background={item.icon}/>
                      <span>{item.name}</span>
                    </li>
                  ))
                }
              </ul>
            </div>
          )
        }
      </div>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: React.PropTypes.func,
  onChange: React.PropTypes.func,
  onCancel: React.PropTypes.func,
  placeholder: React.PropTypes.string,
  immersed: React.PropTypes.bool,
  select: React.PropTypes.bool,
  selectData: React.PropTypes.array,
  defaultValue: React.PropTypes.string,
  cancelSubmit: React.PropTypes.bool,
  autoFocus: React.PropTypes.bool,
};

SearchBar.defaultProps = {
  onSubmit: () => {},
  onChange: () => {},
  onCancel: () => {},
  placeholder: '',
  immersed: false, // 沉浸式导航栏
  select: false,
  selectData: [],
  defaultValue: '',
  cancelSubmit: true,
  autoFocus: false
};

export default CSSModules(SearchBar, styles, {
  allowMultiple: true
});
