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
    this.handleSelectItem = this.handleSelectItem.bind(this);
    this.state = {
      selected: this.props.defaultValue,
      selectedTitle: ''
    };
  }

  handleSelectItem(item) {
    this.setState({
      selected: item.value,
      selectedTitle: item.name
    }, () => {
      this.context.hideDrawer(item.value, item.name);
      this.props.onChange(item.value);
    });
  }

  render() {
    const data = this.props.data;
    const selected = this.state.selected;

    return (
      <div className="drawer-group-item">
        <div className="drawer-sort">
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
}

DrawerSort.propTypes = {
  data: React.PropTypes.array.isRequired,
  onChange: React.PropTypes.func,
  defaultValue: React.PropTypes.any,
};

DrawerSort.defaultProps = {
  data: [],
  onChange: () => {},
  defaultValue: null
};

DrawerSort.contextTypes = {
  showDrawer: React.PropTypes.func,
  hideDrawer: React.PropTypes.func
};

export default CSSModules(DrawerSort, styles);
