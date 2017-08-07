import React from 'react';
import CSSModules from 'react-css-modules';
import { Toast } from 'antd-mobile';
import { Connect, Utils } from 'zp-core';
import styles from './index.less';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.BMap = null;
    this.MapContent = null;
    this.BLocal = null;
    this.BPoint = null;
    this.BGeocoder = null;
    this.BAddress = null;
    this.BNearby = null;
    this.BCircle = null;
    this.BLabel = {};
    this.nearbyData = null;
    this.initMap = this.initMap.bind(this);
    this.searchAddress = this.searchAddress.bind(this);
    this.searchNearby = this.searchNearby.bind(this);
    this.searchPosition = this.searchPosition.bind(this);
    this.getPosition = this.getPosition.bind(this);
    this.addMarker = this.addMarker.bind(this);
    this.addLabel = this.addLabel.bind(this);
    this.translatePoints = this.translatePoints.bind(this);
  }

  componentDidMount() {
    const init = () => {
      this.BMap = window.BMap;
      // 搜索城市
      this.MapContent = new this.BMap.Map(this.map, {enableHighResolution: true});
      this.MapContent.centerAndZoom(this.props.city);
      // 搜索地址
      this.initMap();
    };
    // 百度地图是否初始化
    if (window.BMap) {
      init();
      this.props.onLoad();
    } else {
      Connect.getScript('baiDuMap', () => {
        init();
        this.props.onLoad();
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.BMap) {
      if (nextProps.city !== this.props.city) this.initMap(nextProps.city, nextProps.address, nextProps.nearby);
      if (nextProps.address !== this.props.address) this.initMap(nextProps.city, nextProps.address, nextProps.nearby);
      if (nextProps.nearby !== this.props.nearby) this.searchNearby(nextProps.nearby);
    }
  }

  // 地图初始化
  initMap(city = this.props.city, address = this.props.address, nearby = this.props.nearby) {
    if (!this.BMap) return;
    // 搜索取消显示地址
    if (this.BAddress) this.BAddress.clearResults();
    // 清楚已有的配套
    if (this.BNearby) this.BNearby.clearResults();
    // 删除覆盖物
    if (this.BCircle) this.MapContent.removeOverlay(this.BCircle);
    if (address) this.searchAddress(address, nearby);
  }

  // 搜索地址
  searchAddress(address, nearby) {
    if (!this.BMap) return;
    // 清除地图上的定位覆盖物
    this.MapContent.removeOverlay(this.BLabel['position']);
    // console.log('搜索地址', address, nearby);
    this.BAddress = new this.BMap.LocalSearch(this.MapContent, {
      onSearchComplete: (localResult) => {
        const result = localResult || {};
        const resutlVr = result.vr || [];

        // 有搜索到结果
        if (resutlVr.length) {
          // 需要显示配套显示配套
          // 否则显示地址标注
          if (nearby) {
            this.searchNearby(nearby);
          } else {
            this.addMarker(resutlVr[0].point, {
              text: address,
              className: 'position',
              name: 'address'
            });
          }
        }
      }
    });

    // 搜索地址
    this.BAddress.search(address);
  }

  // 搜索周边配套
  searchNearby(nearby) {
    if (!this.BMap) return;
    if (!this.BAddress) return;
    const localResult = this.BAddress.getResults();
    const poi = localResult.getPoi(0);
    if (!poi) return;
    if (this.nearbyData === nearby) return;
    this.nearbyData = nearby;
    // console.log('搜索配套', nearby, BAddress);
    // 搜索取消显示地址
    // if (BAddress) BAddress.clearResults();
    // 清除已有的配套
    if (this.BNearby) this.BNearby.clearResults();
    // 删除覆盖物
    if (this.BCircle) this.MapContent.removeOverlay(this.BCircle);
    // 创建地图覆盖物
    // if (BAddress) BAddress.clearResults();
    this.BCircle = new this.BMap.Circle(poi.point, 500, {
      fillColor: '#2491ee',
      fillOpacity: 0.2,
      strokeWeight: 1,
      strokeOpacity: 0.3
    });
    this.MapContent.addOverlay(this.BCircle);
    // 搜索附近配套
    this.BNearby = new this.BMap.LocalSearch(this.MapContent, {
      renderOptions: {
        map: this.MapContent,
        selectFirstResult: false
      }
    });
    this.BNearby.searchNearby(nearby, poi, 500);
  }

  // 地图定位
  searchPosition(cb) {
    if (!this.BMap) return;
    const geolocation = new this.BMap.Geolocation();
    Toast.info('正在定位中', 0);
    cb({} , '');
    // 清除地图上的所有覆盖物
    // this.MapContent.clearOverlays();
    // 开始获取浏览器位置
    geolocation.getCurrentPosition((result) => {
      const address = result.address || {};
      // 返回完整地址
      const addressResult = address.province + address.city + address.district + address.street;
      // 显示当前定位位置
      // this.addMarker(result.point, {
      //   text: '当前位置',
      //   className: 'position',
      //   name: 'position'
      // });
      Toast.hide();
      cb && cb(address, addressResult);
    });
  }

  // 获取位置
  getPosition() {
    return this.MapContent.getCenter();
  }

  // 添加位置坐标
  addMarker(points, options) {
    if (!this.BMap) return;
    // const marker = new BMap.Marker(points);
    this.MapContent.centerAndZoom(points, 13);
    // MapContent.addOverlay(marker); //添加GPS marker
    this.addLabel(points, options);
  }

  // 添加位置标签
  addLabel(points, options = {}) {
    if (!this.BMap) return;
    const content = `
      <div class="map-label ${options.className ? options.className : ''}">
        <div class="label-name">
          <div class="label-text">${options.text || ''}</div>
          <div class="label-extra">${options.extra || ''}</div>
        </div>
        <div class="label-marker"></div>
      </div>
    `;
    const name = options.name || Utils.getUUID(8);
    const label = new this.BMap.Label(content, {
      position: points,    // 指定文本标注所在的地理位置
    });
    // 创建文本标注对象
    label.setStyle({
      color: '#2491ee',
      fontSize: '12px',
      border: '1px solid #fff',
    });
    // 假如以存在就删除
    if (this.BLabel[name]) {
      this.MapContent.removeOverlay(this.BLabel[name]);
      this.BLabel[name] = null;
    }
    // 添加到地图
    this.MapContent.addOverlay(label);
    this.BLabel[name] = label;

  }

  // 翻译坐标列表
  translatePoints(points, cb) {
    if (!this.BMap) return;
    // 格式化坐标点列表
    const pointList = points.map(item => new this.BMap.Point(item.lng, item.lat));
    // 开始转化
    const convertor = new this.BMap.Convertor();
    convertor.translate(pointList, 1, 5, (data) => {
      if (data.status === 0) {
        cb && cb(data.points);
      }
    });
  }

  render() {
    return (
      <div style={{height: '100%'}} ref={(ref) => { this.map = ref; }} className="zp-map" />
    );
  }
}

Map.propTypes = {
  city: React.PropTypes.string,
  address: React.PropTypes.string,
  nearby: React.PropTypes.string,
  onLoad: React.PropTypes.func
};

Map.defaultProps = {
  city: '杭州市', // 城市
  address: '', // 地址
  nearby: '', // 附近配套
  onLoad: () => {}
};

export default CSSModules(Map, styles);
