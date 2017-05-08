import React from 'react';
import { ListView as AmListView, Toast, RefreshControl } from 'antd-mobile';
import Connect from 'zp-core/lib/connect';
import History from 'zp-core/lib/history';
import Utils from 'zp-core/lib/utils';
import CSSModules from 'react-css-modules';
import styles from './index.less';
import Empty from '../empty';
import IndexedList from './IndexedList';

const cloneElement = React.cloneElement;

/**
 * @description ListView
 * 长列表
 **/
const ListView = React.createClass({
  listViewName: '',
  propTypes: {
    api: React.PropTypes.number.isRequired,
    dataName: React.PropTypes.string,
    listViewName: React.PropTypes.string,
    pageSize: React.PropTypes.number,
    renderRow: React.PropTypes.func,
    renderSeparator: React.PropTypes.func,
    renderFooter: React.PropTypes.func,
    query: React.PropTypes.object,
    noMoreInfo: React.PropTypes.any,
    empty: React.PropTypes.node
  },
  statics: {
    IndexedList
  },
  getDefaultProps() {
    return {
      renderRow: null,
      renderSeparator: null,
      pageSize: 20,
      dataName: 'list',
      listViewName: 'data',
      query: {},
      noMoreInfo: '没有更多数据了',
      empty: <Empty />
    };
  },
  getInitialState() {
    this.listViewName = `${this.props.listViewName}_listView`;
    const dataSource = new AmListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    const cache = History.getCurrent()[this.listViewName];

    this.listData = cache ? cache.listData : [];
    this.listGenData = cache ? this.genData(cache.listData) : [];
    this.end = cache ? cache.end : false;
    this.historyCurrent = null;
    this.listView = null;
    return {
      dataSource: dataSource.cloneWithRows(this.listGenData),
      isLoading: cache ? cache.isLoading : false,
      refreshing: cache ? cache.refreshing : false,
      pageIndex: cache ? cache.pageIndex : 0,
      initialListSize: cache ? cache.listData.length : this.props.pageSize
    };
  },
  componentWillMount() {
    const cache = History.getCurrent()[this.listViewName];
    // 没有缓存数据才从服务端获取
    if (!cache) {
      this.initData();
    } else {
      // 有缓存但是参数发生变化
      if (!Utils.isSame(this.props.query, cache.query)){
        // console.log('ListView从缓存里获取数据, 有缓存但是参数发生变化');
        this.initData();
      } else{
        console.log('ListView从缓存里获取数据', this.props.listViewName);
      }
    }

    this.historyCurrent = History.getCurrent();
  },
  componentDidMount() {
    // 没有缓存数据才从服务端获取
    if (History.getCurrent()[this.listViewName] && this.listView) {
      this.listView.refs.listview.scrollTo(2, History.getCurrent()[this.listViewName].offset);
    }
  },
  componentWillReceiveProps(nextProps) {
    if (!Utils.isSame(this.props.query, nextProps.query)) {
      console.log('ListView接受到新的参数初始化');
      this.initData(nextProps.query);
    } else {
      // 刷新数据
      console.log('ListView刷新列表数据');
      const date = new Date().getTime();
      const list = this.listData.map(item => Object.assign({}, item, {
        dataUpdateTime: date
      }));
      this.listGenData = this.genData(list);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.listGenData)
      });
    }
  },
  componentWillUnmount() {
    if (this.listView) {
      // 缓存列表数据
      const current = this.historyCurrent;
      current[this.listViewName] = Object.assign({}, {
        listData: this.listData,
        pageIndex: this.state.pageIndex,
        isLoading: this.state.isLoading,
        refreshing: this.state.refreshing,
        end: this.end,
        offset: this.listView.refs.listview.scrollProperties.offset,
        query: this.props.query
      });
      History.setItem(current, this.listViewName);
    }
  },
  onEndReached() {
    this.getData();
  },
  onRefresh() {
    const refreshing = this.state.refreshing;

    if (!refreshing) {
      console.log('ListView下拉刷新');
      this.setState({
        refreshing: true
      });
      this.initData();
    }
  },
  getData(pageIndex = this.state.pageIndex, query = this.props.query) {
    const api = this.props.api;
    const isLoading = this.state.isLoading;
    const pageSize = this.props.pageSize;
    const dataName = this.props.dataName;
    const nowIndex = pageIndex + 1;
    const noMoreInfo = this.props.noMoreInfo;

    // 没有更多数据了
    if (this.end) return;
    // 正在加载数据
    if (isLoading) return;
    console.log('ListView开始加载数据');

    this.setState({
      isLoading: true
    });

    Connect.getApi(api, Object.assign({}, query, {
      pageIndex: nowIndex,
      pageSize
    }), null, (data) => {
      if (data[dataName].length < this.props.pageSize) {
        // 当页数大于1且允许提示时才弹出
        if (noMoreInfo && nowIndex > 1) Toast.info(noMoreInfo);
        this.end = true;
      }

      const dataList = dataName ? data[dataName] : data;
      this.listData = [...this.listData, ...dataList];
      this.listGenData = this.genData(this.listData);
      console.log('ListView加载数据完成');
      this.setState({
        isLoading: false,
        refreshing: false,
        dataSource: this.state.dataSource.cloneWithRows(this.listGenData),
        pageIndex: nowIndex
      });
    }, () => {
      this.setState({
        isLoading: false,
        refreshing: false
      });
    });
  },
  genData(list) {
    const dataBlob = {};

    for (let i = 0; i < list.length; i++) {
      dataBlob[`${i}`] = list[i];
    }
    return dataBlob;
  },
  initData(query = this.props.query) {
    this.listData = [];
    this.listGenData = [];
    this.end = false;
    this.getData(0, query);
  },
  render() {
    // 列项之间的空隙
    const separator = (sectionID, rowID) => {
      let render = null;
      if (this.props.renderSeparator) {
        render = cloneElement(this.props.renderSeparator(sectionID, rowID), {
          key: rowID
        });
      }
      return render;
    };

    // 列表项
    const row = (rowData, sectionID, rowID) => {
      let render = <div key={rowID} />;
      if (this.props.renderRow) {
        render = cloneElement(this.props.renderRow(rowData, sectionID, rowID), {
          key: rowID
        });
      }
      return render;
    };

    const footer = () => {
      let render = (
        <div style={{ padding: 30, textAlign: 'center' }}>
          {this.state.isLoading ? '加载中...' : '加载完毕'}
        </div>
      );
      if (this.props.renderFooter) {
        render = this.props.renderFooter();
      }
      if (this.end) {
        render = (
          <div style={{ textAlign: 'center' }}>没有更多数据了</div>
        );
      }
      return render;
    };

    let node = (
      <AmListView
        initialListSize={this.state.initialListSize}
        dataSource={this.state.dataSource}
        renderRow={row}
        renderSeparator={separator}
        renderFooter={footer}
        pageSize={this.props.pageSize}
        scrollRenderAheadDistance={200}
        scrollEventThrottle={20}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
        onScroll={() => {}}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />
        }
        ref={(ref) => { this.listView = ref; }}
      />
    );

    if (!this.listData.length && !this.state.refreshing) {
      node = this.props.empty;
      if (this.state.isLoading) node = <Empty type="loading" />;
    }

    return <div className="zp-listView">{node}</div>;
  }
});

export default CSSModules(ListView, styles);

