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
    // const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
    // const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];
    //
    // const dataSource = new ListView.DataSource({
    //   getRowData,
    //   getSectionHeaderData: getSectionData,
    //   rowHasChanged: (row1, row2) => row1 !== row2,
    //   sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    // });

    this.getData = this.getData.bind(this);
    // this.createDataSource = this.createDataSource.bind(this);
    this.state = {
      dataSource: this.getData(this.props.data)
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.getData(nextProps.data)
    });
  }

  // onSearch(val) {
  //   const pd = Object.assign({}, []);
  //   Object.keys(pd).forEach((item) => {
  //     pd[item] = pd[item].filter(jj => jj.spell.toLocaleLowerCase().indexOf(val) > -1);
  //   });
  //   this.setState({
  //     inputValue: val,
  //     dataSource: this.createDataSource(this.state.dataSource, pd)
  //   });
  // }

  getData(data = this.props.data) {
    const index = this.props.index;
    const indexList = [];
    console.log('=========1', this.props.data);

    // 或者拼音首字母
    const newData = data.map((item) => {
      const name = item[index];
      return Object.assign({}, item, {
        spell: item.label || Pinyin.getFirstLetter(name)
      });
    });
    console.log('=========2', newData);

    // 排序
    // newData.sort((a, b) => a.spell.localeCompare(b.spell));
    // console.log('=========3', newData);

    //
    newData.forEach((item) => {
      const spell = item.spell;
      const label = item.label;

      if (spell) {
        const firstLetter = label || spell[0];

        if (!indexList[firstLetter]) indexList[firstLetter] = [];
        indexList[firstLetter].push(item);
      } else {
        console.log('拼音转换失败');
      }
    });
    console.log('=========4', newData);

    // return newData;
    // console.log('========', data, newData, indexList);

    return indexList;
  }

  // createDataSource(ds, data) {
  //   const dataBlob = {};
  //   const sectionIDs = [];
  //   const rowIDs = [];
  //
  //   Object.keys(data).forEach((item, index) => {
  //     sectionIDs.push(item);
  //     dataBlob[item] = item;
  //     rowIDs[index] = [];
  //
  //     data[item].forEach((jj) => {
  //       rowIDs[index].push(jj.id);
  //       dataBlob[jj.id] = jj;
  //     });
  //   });
  //
  //   return ds.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs);
  // }

  render() {
    const listIndex = this.props.index;
    const dataSource = this.state.dataSource;
    const indexed = Object.keys(dataSource);
    console.log(dataSource, indexed);
    // 列表项
    const row = (item, index) => {
      let render = <ListItem key={index}>{item[index]}</ListItem>;
      if (this.props.renderRow) {
        render = cloneElement(this.props.renderRow(item, index), {
          key: index
        });
      }
      return render;
    };

    return (
      <div styleName="indexed-list">
        {
          indexed.map((item, index) => (
            <div key={index}>
              <div styleName="indexed-title">{item}</div>
              <div className="am-list-body">
                {
                  dataSource[item].map((indexedItem, indexedIndex) => (
                    row(indexedItem, indexedIndex)
                  ))
                }
              </div>
            </div>
          ))
        }
        <ul className="am-indexed-list-quick-search-bar">
          {
            indexed.map((item, index) => (
              <li key={index} />
            ))
          }
        </ul>
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
