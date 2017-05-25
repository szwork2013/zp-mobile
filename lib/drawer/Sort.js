import React from 'react';
import CSSModules from 'react-css-modules';
import { List } from 'antd-mobile';
import styles from './index.less';

const ListItem = List.Item;

/**
 * @description DrawerSort
 * 抽屉-排序
 **/
class DrawerSort extends React.Component {
  constructor(props) {
    super(props);
    this.clear = this.clear.bind(this);
    this.handleSelectItem = this.handleSelectItem.bind(this);
    this.state = {
      selectedValue: this.props.defaultValue || null,
      selectedName: this.getSelectedName(this.props.data, this.props.defaultValue)
    };
  }

  getSelectedName(data, value) {
    let selectedName = '';
    data.forEach((item) => {
      if (item.value === value) selectedName = item.name;
    });
    return selectedName;
  }

  handleSelectItem(item) {
    this.setState({
      selectedValue: item.value,
      selectedName: item.name
    }, () => {
      this.context.hideDrawer();
      this.props.onChange(item.value);
    });
  }

  clear() {
    this.setState({
      selectedValue: '',
      selectedName: ''
    }, () => {
      this.context.hideDrawer();
      this.props.onChange('');
    });
  }

  renderSidebar() {
    const data = this.props.data;
    const selected = this.state.selected;

    return (
      <div styleName="drawer-group-sidebar">
        <div styleName="drawer-sort">
          <List>
            {
              data.map((item, index) => {
                const className = selected === item.value ? 'sort-selected' : '';
                return (
                  <ListItem
                    key={index}
                    onClick={() => this.handleSelectItem(item)}
                  >
                    <span className={className}>{item.name}</span>
                  </ListItem>
                );
              })
            }
          </List>
        </div>
      </div>
    );
  }

  render() {
    const name = this.state.selectedName || this.props.title;
    return (
      <div styleName="btn-content">
        <div styleName="btn-title">{name}</div>
        <div styleName="btn-icon" />
        { this.props.show && this.renderSidebar() }
      </div>
    );
  }
}

DrawerSort.propTypes = {
  data: React.PropTypes.array.isRequired,
  title: React.PropTypes.string,
  show: React.PropTypes.bool,
  onChange: React.PropTypes.func,
  defaultValue: React.PropTypes.any,
};

DrawerSort.defaultProps = {
  data: [],
  title: '',
  show: false,
  onChange: () => {},
  defaultValue: null
};

DrawerSort.contextTypes = {
  showDrawer: React.PropTypes.func,
  hideDrawer: React.PropTypes.func
};

export default CSSModules(DrawerSort, styles);
