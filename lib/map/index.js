import React from 'react';
// import Device from '../../common/device';
// import MapJump from '../../common/mapJump';

let BMap = null;
let MapContent = null;
let BLocal = null;
let BPoint = null;
let BGeocoder = null;
let BAddress = null;
let BNearby = null;
let BCircle = null;
let nearbyData = null;
let loaded = false;

class Map extends React.Component {
  componentDidMount() {
    const init = () => {
      BLocal = null;
      BPoint = null;
      BGeocoder = null;
      BAddress = null;
      BNearby = null;
      BCircle = null;
      nearbyData = null;

      BMap = window.BMap;
      MapContent = new BMap.Map(this.map, {enableHighResolution: true});
      MapContent.centerAndZoom(this.props.city, 11);

      // 搜索地址
      this.initMap();
      loaded = true;
    }
    if (loaded) {
      init();
    } else {
      $.getScript('http://api.map.baidu.com/getscript?v=2.0&ak=SYS0IRwCcN9z68FfGtDKchKWtLlUDjl8&services=&t=20170309210149', () => {
        init();
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (BMap) {
      if(nextProps.city != this.props.city) this.initMap(nextProps.city, nextProps.address, nextProps.nearby);
      if(nextProps.address != this.props.address) this.initMap(nextProps.city, nextProps.address, nextProps.nearby);
      if(nextProps.nearby != this.props.nearby) this.searchNearby(nextProps.nearby);
    }
  }

  // 地图初始化
  initMap(city = this.props.city, address = this.props.address, nearby = this.props.nearby) {
    // console.log('初始化地图');
    // 搜索取消显示地址
    if (BAddress) BAddress.clearResults();
    // 清楚已有的配套
    if (BNearby) BNearby.clearResults();
    // 删除覆盖物
    if (BCircle) MapContent.removeOverlay(BCircle);
    if (address) this.searchAddress(address, nearby);
  }

  // 搜索地址
  searchAddress(address, nearby) {
    // console.log('搜索地址', address, nearby);
    BAddress = new BMap.LocalSearch(MapContent, {
      renderOptions: {
        map: MapContent,
        selectFirstResult: false
      },
      onSearchComplete: (localResult) => {
        setTimeout(() => {
          if(nearby) this.searchNearby(nearby);
        }, 400);
      }
    });
    BAddress.search(address);
  }

  // 切换周边配套
  searchNearby(nearby) {
    if (!BAddress) return;
    const localResult = BAddress.getResults();
    const poi = localResult.getPoi(0);
    if (!poi) return;
    // console.log(this.props.nearby, nearby);
    if (nearbyData === nearby) return;
    nearbyData = nearby;
    // console.log('搜索配套', nearby, BAddress);
    // 搜索取消显示地址
    // if (BAddress) BAddress.clearResults();
    // 清除已有的配套
    if (BNearby) BNearby.clearResults();
    // 删除覆盖物
    if (BCircle) MapContent.removeOverlay(BCircle);
    // 创建地图覆盖物
    BCircle = new BMap.Circle(poi.point, 500, {
      fillColor: 'blue',
      strokeWeight: 1,
      fillOpacity: 0.3,
      strokeOpacity: 0.3
    });
    MapContent.addOverlay(BCircle);

    // 搜索附近配套
    BNearby = new BMap.LocalSearch(MapContent, {
      renderOptions: {
        map: MapContent,
        selectFirstResult: false
      }
    });
    BNearby.searchNearby(nearby, poi, 500);
  }

  render() {
    return (
      <div style={{height: '100%'}} ref={(ref) => { this.map = ref; }} />
    );
  }
}

Map.propTypes = {
  city: React.PropTypes.string,
  address: React.PropTypes.string,
  nearby: React.PropTypes.string
};

Map.defaultProps = {
  city: '杭州市', // 城市
  address: '', // 地址
  nearby: '' // 附近配套
};

export default Map;
