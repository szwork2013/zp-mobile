import React from 'react';
import { ListView, List } from 'antd-mobile';
import CSSModules from 'react-css-modules';
import styles from './index.less';
import Pinyin from '../common/pinyin';

const ListItem = List.Item;
const cloneElement = React.cloneElement;

/**
 * @description indexedList
 * 通讯录列表
 **/

class indexedList extends React.Component {
  constructor(props) {
    super(props);
    const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
    const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

    const dataSource = new ListView.DataSource({
      getRowData,
      getSectionHeaderData: getSectionData,
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });

    this.getData = this.getData.bind(this);
    this.createDataSource = this.createDataSource.bind(this);
    this.state = {
      inputValue: '',
      dataSource: this.getData(dataSource, this.props.data),
      count: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.getData(this.state.dataSource, nextProps.data)
    });
  }

  onSearch(val) {
    const pd = Object.assign({}, []);
    Object.keys(pd).forEach((item) => {
      pd[item] = pd[item].filter(jj => jj.spell.toLocaleLowerCase().indexOf(val) > -1);
    });
    this.setState({
      inputValue: val,
      dataSource: this.createDataSource(this.state.dataSource, pd)
    });
  }

  getData(dataSource, data = this.props.data) {
    const index = this.props.index;
    const indexList = [];

    // 或者拼音首字母
    const newData = data.map((item) => {
      const name = item[index];
      return Object.assign({}, item, {
        spell: Pinyin.getFirstLetter(name)
      });
    });

    // 排序
    newData.sort((a, b) => a.spell.localeCompare(b.spell));

    //
    newData.forEach((item) => {
      const spell = item.spell;

      if (spell) {
        const firstLetter = spell[0];

        if (!indexList[firstLetter]) indexList[firstLetter] = [];
        indexList[firstLetter].push(item);
      } else {
        console.log('拼音转换失败');
      }
    });

    return this.createDataSource(dataSource, indexList);
  }

  createDataSource(ds, data) {
    const dataBlob = {};
    const sectionIDs = [];
    const rowIDs = [];

    Object.keys(data).forEach((item, index) => {
      sectionIDs.push(item);
      dataBlob[item] = item;
      rowIDs[index] = [];

      data[item].forEach((jj) => {
        rowIDs[index].push(jj.id);
        dataBlob[jj.id] = jj;
      });
    });

    return ds.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs);
  }

  render() {
    const listIndex = this.props.index;
    // 列表项
    const row = (rowData, sectionID, rowID) => {
      let render = <ListItem key={rowID}>{rowData[listIndex]}</ListItem>;
      if (this.props.renderRow) {
        render = cloneElement(this.props.renderRow(rowData, sectionID, rowID), {
          key: rowID
        });
      }
      return render;
    };

    return (
      <div styleName="indexed-list">
        <ListView.IndexedList
          dataSource={this.state.dataSource}
          renderSectionHeader={sectionData => (<div className="ih">{sectionData}</div>)}
          renderRow={row}
          className="am-list"
          stickyHeader
          stickyProps={{
            stickyStyle: { zIndex: -1 },
          }}
        />
      </div>
    );
  }
}

indexedList.propTypes = {
  data: React.PropTypes.array.isRequired,
  index: React.PropTypes.string.isRequired,
  renderRow: React.PropTypes.func
};

indexedList.defaultProps = {
  data: [],
  index: ''
};

export default CSSModules(indexedList, styles);
