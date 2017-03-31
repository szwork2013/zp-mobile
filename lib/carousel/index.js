import React from 'react';
import { Carousel as AntdCarousel } from 'antd-mobile';
import Image from '../image';
import Video from '../video';
import CSSModules from 'react-css-modules';
import styles from './index.less';

/**
 * @description Carousel
 * 表单提交按钮
 **/

class Carousel extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.vidoe = {};
  }

  handleChange(index) {
    const id = index;
    const keys = Object.keys(this.vidoe);

    keys.forEach((name) => {
      if (id !== name) this.vidoe[name].pause();
    });
  }
  // constructor(props) {
  //   super(props);
  //   this.echarts = null;
  // }

  // componentDidMount() {
  //   // console.log(this.props.options);
  //   console.log('图表加载成功', Macarons);
  //   // 基于准备好的dom，初始化echarts实例
  //   // Echarts.registerTheme('macarons', Macarons);
  //   this.echarts = Echarts.init(this.charts, 'macarons');
  // }
  //
  // setOption(options) {
  //   this.echarts.setOption(options);
  // }

  render() {
    const data = this.props.data;
    const defaultSrc = this.props.defaultSrc;

    return (
      <div className="zp-carousel">
        <AntdCarousel
          autoplay={false}
          infinite
          afterChange={this.handleChange}
        >
          {
            data.length ? data.map((item, index) => (
              <div className="carousel-item" key={index}>
                {
                  item.type === 'image' && <Image background={item.src} />
                }
                {
                  item.type === 'video' && <Video src={item.src} className="carousel-item" ref={(ref) => { this.vidoe[index.toString()] = ref; }} />
                }
              </div>
            )) : <div className="carousel-item"><Image background={defaultSrc} /></div>
          }
        </AntdCarousel>
      </div>
    );
  }
}

Carousel.propTypes = {
  data: React.PropTypes.array,
  defaultSrc: React.PropTypes.string
};

Carousel.defaultProps = {
  data: [],
  defaultSrc: ''
};

export default CSSModules(Carousel, styles, {
  allowMultiple: true
});
